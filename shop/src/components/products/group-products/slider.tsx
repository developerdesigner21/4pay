import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { ArrowNext, ArrowPrev } from '@/components/icons';
import { useTranslation } from 'next-i18next';
import { Product } from '@/types';
import ProductCard from '@/components/products/cards/card';

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  580: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 24,
  },
  1536: {
    slidesPerView: 6,
    spaceBetween: 24,
  },
};

const ProductsSlider = ({
  products,
  cardView,
}: {
  products: Product[];
  cardView?: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <Swiper
        id="handPicked_products"
        breakpoints={offerSliderBreakpoints}
        modules={[Navigation]}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
      >
        {products?.map((product: Product) => (
          <SwiperSlide key={product?.id}>
            <ProductCard cardView={cardView} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="prev absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-left-5 rtl:md:-right-5"
        role="button"
      >
        <span className="sr-only">{t('common:text-previous')}</span>
        <ArrowPrev width={18} height={18} />
      </div>
      <div
        className="next absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-right-5"
        role="button"
      >
        <span className="sr-only">{t('common:text-next')}</span>
        <ArrowNext width={18} height={18} />
      </div>
    </div>
  );
};

export default ProductsSlider;
