import ProductCard from '@/components/products/cards/card';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';

import { useRef } from 'react';
import { useIsRTL } from '@/lib/locals';
import { ArrowNextIcon } from '../icons/arrow-next';
import { ArrowPrevIcon } from '../icons/arrow-prev';

interface Props {
  className?: string;
  limit?: number;
  variables: any;
  title?: string;
  cardView?: string;
}

export default function CustomeProductGrid({
  className,
  limit = 10,
  variables,
  title,
  cardView,
}: Props) {
  const { t } = useTranslation('common');
  const [productlist, setProductList] = useState(variables);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useIsRTL();
  const offerSliderBreakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 16,
      slidesPerGroup:2,
      centeredSlides:true,
      centeredSlidesBounds:true,
    },
    580: {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup:2,
      centeredSlides:true,
      centeredSlidesBounds:true,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 16,
      slidesPerGroup:4,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 24,
      slidesPerGroup:5
    },
    1536: {
      slidesPerView: 6,
      spaceBetween: 24,
      slidesPerGroup:6
    },
  };
  return (
    <>
      {productlist?.length > 0 && (
        <div className="relative px-2 lg:px-7 xl:px-10">
          {title && (
            <div className="my-3 flex items-center justify-between ">
              <h3 className="text-2xl font-semibold lg:text-[27px] 3xl:text-3xl">
                {title}
              </h3>
            </div>
          )}
          {/* <Swiper
            breakpoints={offerSliderBreakpoints}
            modules={[Navigation]}
            spaceBetween={30}
            navigation={{
              prevEl: prevRef.current!,
              nextEl: nextRef.current!,
            }}
            slidesPerView={'auto'}
            direction={'horizontal'}
            freeMode={{
              enabled:true
            }}
            // scrollbar={{
            //   el: '.swiper-scrollbar',
            // }}
            mousewheel={true}
          > */}
          <div className='flex overflow-x-auto overflow-y-visible no-scrollbar'>
            {productlist?.map((productitem: any) => (
              // <SwiperSlide key={productitem?.id}>
              <div className='w-96 h-full'>
                <ProductCard cardView={cardView} product={productitem} className="w-60 m-2 h-full" />
              </div>
              // </SwiperSlide>
            ))}
          </div>
          {/* </Swiper> */}
          {/* <div
            ref={prevRef}
            className="absolute z-10 flex items-center  justify-center w-8 h-8 mt-10 rounded-full outline-none cursor-pointer category-slider-prev top-1/2 bg-light text-heading shadow-300 focus:outline-none ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ml-10"
          >
            <span className="sr-only">{t('text-previous')}</span>
            {isRTL ? <ArrowNextIcon /> : <ArrowPrevIcon />}
          </div>
          <div
            ref={nextRef}
            className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 rounded-full outline-none cursor-pointer category-slider-next  top-1/2 bg-light text-heading shadow-300 focus:outline-none  ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 mr-10"
          >
            <span className="sr-only">{t('text-next')}</span>
            {isRTL ? <ArrowPrevIcon /> : <ArrowNextIcon />}
          </div> */}
        </div>
      )}
    </>
  );
}
