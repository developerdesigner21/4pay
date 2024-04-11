import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import type { Banner } from '@/types';
import { useReverse } from '@/lib/reverse';
import { useRef } from 'react';
import { useIsRTL } from '@/lib/locals';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { Autoplay } from 'swiper/modules';

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
  slug?: string;
}

const BannerWithPagination: React.FC<BannerProps> = ({ banners, slug }) => {
  const reverseBanners = useReverse({ items: banners as Banner[] });
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useIsRTL();
  return (
    <div className="compact relative -mt-10">
      <div className="-z-1 overflow-hidden">
        {/* <div className="relative">
          <Swiper
            id="banner"
            loop={true}
            modules={[Pagination]}
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
            // pagination={true}
            pagination={{
              bulletClass:
                'swiper-pagination-bullet !w-2.5 !h-2.5 !p-1 !rounded-full bg-gray-400 !border-0 !opacity-70',
              clickableClass: 'cursor-pointer',
              bulletActiveClass: '!bg-accent',
              clickable: true,
            }}
          >
            {reverseBanners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <Link href={`/${slug}${Routes.search}`}>
                  <div className="relative h-full max-h-[240px] w-full md:max-h-[610px]">
                    <Image
                      className="h-full w-full"
                      src={banner?.image?.original ?? productPlaceholder}
                      alt={banner?.title ?? ''}
                      width={1800}
                      height={610}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
        <div className="relative">
          <Swiper
            id="banner"
            // loop={true}
            // modules={[Pagination]}
            // resizeObserver={true}
            // allowTouchMove={false}
            // // pagination={true}
            // pagination={{
            //   bulletClass:
            //     'swiper-pagination-bullet !w-2.5 !h-2.5 !p-1 !rounded-full bg-gray-400 !border-0 !opacity-70',
            //   clickableClass: 'cursor-pointer',
            //   bulletActiveClass: '!bg-accent',
            //   clickable: true,
            slidesPerView={1}
            spaceBetween={30}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              // nextEl: '.next',
              // prevEl: '.prev',
              prevEl: prevRef.current!,
              nextEl: nextRef.current!,
            }}
            className="mySwiper"
          >
            {reverseBanners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <Link href={`/${slug}${Routes.search}`}>
                  <div className="relative h-full lg:h-[610px] w-full md:max-h-[610px]  ">
                    {/* <div className="relative h-full max-h-[240px] w-full md:max-h-[610px]  "> */}
                    <Image
                      className="h-full w-full"
                      src={banner?.image?.original ?? productPlaceholder}
                      alt={banner?.title ?? ''}
                      width={1800}
                      height={610}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            ref={prevRef}
            className="absolute z-10 flex items-center  justify-center w-8 h-8 -mt-4 rounded-full outline-none cursor-pointer category-slider-prev top-1/2 bg-light text-heading shadow-300 focus:outline-none ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ml-5"
          >
            {isRTL ? <ArrowNextIcon /> : <ArrowPrevIcon />}
          </div>
          <div
            ref={nextRef}
            className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 rounded-full outline-none cursor-pointer category-slider-next  top-1/2 bg-light text-heading shadow-300 focus:outline-none  ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 mr-5"
          >
            {isRTL ? <ArrowPrevIcon /> : <ArrowNextIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerWithPagination;
