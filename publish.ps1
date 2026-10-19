# Aster Industrial Coatings — first publish: GitHub repository + Vercel hosting.
#
# One-time use. Run from PowerShell in this folder:
#   powershell -ExecutionPolicy Bypass -File .\publish.ps1 -GitHubUser YOUR_GITHUB_USERNAME
#
# Before running: create an EMPTY private repository on GitHub named astercoatings-website
# (https://github.com/new — no README, no .gitignore, no licence).
# During the run two sign-in windows open in your browser: GitHub (for the push) and Vercel. Sign in
# there; nothing is typed into this script.

param(
  [Parameter(Mandatory = $true)][string]$GitHubUser,
  [string]$Repo = "astercoatings-website"
)

$ErrorActionPreference = "Continue"
Set-Location -LiteralPath $PSScriptRoot

function Need($cmd, $hint) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { Write-Host "$cmd is not installed. $hint" -ForegroundColor Red; exit 1 }
}
function Check($what) {
  if ($LASTEXITCODE -ne 0) { Write-Host "`n$what failed (exit $LASTEXITCODE). Stopping here; nothing else was changed." -ForegroundColor Red; exit 1 }
}

Need git  "Install Git for Windows from https://git-scm.com/download/win and run this again."
Need node "Install Node.js LTS from https://nodejs.org and run this again."

Write-Host "`n== 1/4  Git repository" -ForegroundColor Cyan
if (-not (Test-Path .git)) { git init -b main | Out-Null }
git config user.name "Aster Industrial Coatings"
git config user.email "sales@astercoatings.net"
git add -A
if (git status --porcelain) { git commit -q -m "Aster Industrial Coatings website"; Check "git commit" }
$remote = "https://github.com/$GitHubUser/$Repo.git"
$hasOrigin = (git remote) -contains "origin"
if ($hasOrigin) { git remote set-url origin $remote } else { git remote add origin $remote }
Write-Host "Pushing to $remote  (a GitHub sign-in window may open: sign in there)"
git push -u origin main
Check "git push"

Write-Host "`n== 2/4  Vercel sign-in" -ForegroundColor Cyan
Set-Location -LiteralPath (Join-Path $PSScriptRoot "site")
$who = npx --yes vercel@latest whoami 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "A browser window opens for Vercel: sign in with the account you created."
  npx --yes vercel@latest login
  Check "vercel login"
}

Write-Host "`n== 3/4  Vercel project and settings" -ForegroundColor Cyan
npx --yes vercel@latest link --yes --project $Repo
Check "vercel link"
$envs = [ordered]@{
  "NEXT_PUBLIC_SITE_URL"      = "https://astercoatings.net"
  "ALLOW_INDEXING"            = "false"
  "CRM_PROVIDER"              = "none"
  "LEAD_STORE"                = "none"
  "EMAIL_PROVIDER"            = "console"
  "SALES_NOTIFICATION_EMAIL"  = "sales@astercoatings.net"
}
foreach ($k in $envs.Keys) {
  foreach ($target in @("production", "preview")) {
    npx --yes vercel@latest env rm $k $target --yes 2>$null | Out-Null
    $envs[$k] | npx --yes vercel@latest env add $k $target | Out-Null
  }
}

Write-Host "`n== 4/4  Deploy" -ForegroundColor Cyan
npx --yes vercel@latest deploy --prod --yes
Check "vercel deploy"

Write-Host "`nDone. The site is live at the URL printed above (search engines are told not to index it yet)." -ForegroundColor Green
Write-Host "Next, in the Vercel dashboard: Project > Settings > Git > connect $GitHubUser/$Repo, Root Directory = site." -ForegroundColor Green
Set-Location -LiteralPath $PSScriptRoot
