# Aster Industrial Coatings — publish an update: commit, push to GitHub, deploy to Vercel.
#
# Run from PowerShell in this folder:
#   powershell -ExecutionPolicy Bypass -File .\deploy.ps1 "what changed"
# (First-time setup is publish.ps1; this script assumes it has already been run.)

param([string]$Message = "Site update")

$ErrorActionPreference = "Continue"
Set-Location -LiteralPath $PSScriptRoot

function Check($what) {
  if ($LASTEXITCODE -ne 0) { Write-Host "`n$what failed (exit $LASTEXITCODE). Stopping here." -ForegroundColor Red; exit 1 }
}

Write-Host "`n== 1/2  Commit and push" -ForegroundColor Cyan
git add -A
if (git status --porcelain) { git commit -q -m $Message; Check "git commit" } else { Write-Host "Nothing new to commit." }
git push origin main
Check "git push"

Write-Host "`n== 2/2  Deploy to Vercel (production)" -ForegroundColor Cyan
Set-Location -LiteralPath (Join-Path $PSScriptRoot "site")
npx --yes vercel@latest deploy --prod --yes
Check "vercel deploy"
Set-Location -LiteralPath $PSScriptRoot
Write-Host "`nDone. The new version is live on astercoatings.net." -ForegroundColor Green
