import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { productPlaceholder } from '@/lib/placeholders';
import { Image } from '@/components/ui/image';
// import Link from './link';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import Button from '@/components/ui/button';
import { Grid } from 'swiper/modules';


interface CategoryItemProps {
  item: any;
}
const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  return (
    <div className="cursor-pointer text-center">
      <Link className='flex items-center justify-center' href={Routes.category(item?.type?.slug, item.slug)}>
        <div className='flex-col justify-center items-center w-full'>
          <div className='w-full'>
            <Image
              src={item?.image?.original! ?? productPlaceholder}
              alt={item?.name!}
              width={200}
              height={240}
              className="rounded-md w-full"
            />
            {/* <span className="mt-2 block font-semibold transition-colors group-hover:text-orange-500 ltr:text-center rtl:text-right text-xs md:text-heading">
              {item.name}
            </span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

function SolidCardCategory({ items }: any) {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [view, setView] = useState<Boolean | null>(null);

  const breakpoints = {
    320: {
      slidesPerView: 3,
      spaceBetween: 8,
      centeredSlides:true,
      centeredSlidesBounds:true
    },

    540: {
      slidesPerView: 3,
      spaceBetween: 8,
      centeredSlides:true,
      centeredSlidesBounds:true,
    },

    820: {
      slidesPerView: 5,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },

    1280: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1800: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    2600: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  };
  
  return (
    <div className="relative">
      <Swiper
        breakpoints={breakpoints}
        grid={{
          rows: 2,
          fill:"row"
        }}
        freeMode={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid]}
        defaultValue={3}
        // className="mySwiper"
      >
      {/* <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-6 gap-y-5 justify-center items-start'> */}
        {items?.map((category: any, idx: number) => (
          <SwiperSlide key={idx}>
          {/* <div className={!view &&idx==9?'hidden md:block lg:block xl:block 2xl:block':''}> */}
          {/* <div> */}
            <CategoryItem item={category} />
          {/* </div> */}
          </SwiperSlide>
        ))}
      {/* </div> */}
      {/* {!view && (
        <div className="flex justify-center mt-8 mb-4 sm:mb-6 lg:mb-2 lg:mt-12 md:hidden lg:hidden xl:hidden 2xl:hidden">
          <Button
            onClick={()=>setView(true)}
            className="text-sm font-semibold h-11 md:text-base"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )} */}
      </Swiper>
      {/* <div
        ref={(node) => setPrevEl(node)}
        className="banner-slider-prev absolute top-1/2 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light text-heading shadow-300 outline-none transition-colors hover:text-orange-500 focus:outline-none ltr:-left-4 rtl:-right-4"
      >
        <span className="sr-only">{t('text-previous')}</span>
        {isRTL ? <ArrowNextIcon /> : <ArrowPrevIcon />}
      </div>
      <div
        ref={(node) => setNextEl(node)}
        className="banner-slider-next absolute top-1/2 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light text-heading shadow-300 outline-none transition-colors hover:text-orange-500 focus:outline-none ltr:-right-4 rtl:-left-4"
      >
        <span className="sr-only">{t('text-next')}</span>
        {isRTL ? <ArrowPrevIcon /> : <ArrowNextIcon />}
      </div> */}
    </div>
  );
}

export default SolidCardCategory;
