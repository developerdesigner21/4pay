import type { Product } from '@/types';
import dynamic from 'next/dynamic';
const Helium = dynamic(() => import('@/components/products/cards/helium'));
const Neon = dynamic(() => import('@/components/products/cards/neon')); // grocery-two
const Argon = dynamic(() => import('@/components/products/cards/argon')); // bakery
const Krypton = dynamic(
  () => import('@/components/products/cards/krypton'), // furniture extra price
);
const Xenon = dynamic(() => import('@/components/products/cards/xenon')); // furniture-two
const Radon = dynamic(() => import('@/components/products/cards/radon')); // Book

const MAP_PRODUCT_TO_CARD: Record<string, any> = {
  neon: Neon,
  helium: Helium,
  argon: Argon,
  krypton: Krypton,
  xenon: Xenon,
  radon: Radon,
};
interface ProductCardProps {
  product: Product;
  className?: string;
  cardView?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  cardView,
  ...props
}) => {
  const Component = cardView ? MAP_PRODUCT_TO_CARD[cardView] : Helium;
  return <Component product={product} {...props} className={className} />;
};
export default ProductCard;
