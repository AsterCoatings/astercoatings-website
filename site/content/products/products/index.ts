import type { Product } from '@/lib/content/schema';
import { coatings } from './coatings';

/** Order here is the default display order within a family. */
export const products: Product[] = coatings;
