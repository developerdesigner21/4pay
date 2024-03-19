import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import SectionBlock from '@/components/ui/section-block';
import { siteSettings } from '@/config/site';
import AppStoreImg from '@/assets/app-store-btn.png';
import PlayStoreImg from '@/assets/play-store-btn.png';
// import PatternImg from '@/assets/pattern.png';
import PatternImg from '@/assets/GRAPE.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { useRef } from 'react';
import { useIsRTL } from '@/lib/locals';
import { ArrowNextIcon } from '../icons/arrow-next';
import { ArrowPrevIcon } from '../icons/arrow-prev';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const CallToAction = (props:any) => {
  const { t } = useTranslation('common');
  const SliderData = props.bottomSliderData;
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useIsRTL();

  return (
    <SectionBlock className="last:pb-0">
     <div className="relative">
        <Swiper
          id="banner"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}

          slidesPerView={1}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          className="mySwiper"
        >
          {SliderData?.map((item: any) => {
            return (
              <SwiperSlide>
                <div className="relative flex w-full overflow-hidden rounded-xl  px-5">
                  <Image
                    className="h-96 w-full rounded-lg "
                    src={item.original}
                    alt={''}
                    width={1000}
                    height={1000}
                  />
                </div>
              </SwiperSlide>
            )
          })}

        </Swiper>
        <div
          ref={prevRef}
          className="absolute z-10 flex items-center  justify-center w-8 h-8 mt-10 rounded-full outline-none cursor-pointer category-slider-prev top-1/2 bg-light text-heading shadow-300 focus:outline-none ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ml-10"
        >
          {isRTL ? <ArrowNextIcon /> : <ArrowPrevIcon />}
        </div>
        <div
          ref={nextRef}
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 rounded-full outline-none cursor-pointer category-slider-next  top-1/2 bg-light text-heading shadow-300 focus:outline-none  ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 mr-10"
        >
          {isRTL ? <ArrowPrevIcon /> : <ArrowNextIcon />}
        </div>
      </div>
    </SectionBlock>
  );


  // return (
  //   <SectionBlock className="last:pb-0">
  //     <div className="relative flex w-full overflow-hidden rounded-xl bg-gray-100 px-6 py-12 md:px-10 xl:px-32 xl:py-32">
  //       <Image
  //         src={PatternImg}
  //         fill
  //         alt="background pattern"
  //         sizes="(max-width: 768px) 100vw"
  //       />
  //       {/* <div className="z-0 flex w-full justify-center lg:justify-between">
  //         <div className="flex max-w-[500px] flex-col items-center lg:items-start">
  //           <span className="mb-4 text-lg font-semibold uppercase sm:text-xl lg:font-bold">
  //             {t('text-cta-header')}
  //           </span>
  //           <span
  //             className="text-center text-2xl sm:text-4xl sm:!leading-[3rem] lg:text-left rtl:lg:text-right"
  //             dangerouslySetInnerHTML={{ __html: t('text-cta-description') }}
  //           />

  //           <div className="mt-8 flex items-center space-x-6 rtl:space-x-reverse lg:mt-14">
  //             <Link
  //               href={siteSettings.cta.app_store_link}
  //               className="w-32 md:w-48"
  //             >
  //               <Image
  //                 src={AppStoreImg}
  //                 width={338}
  //                 height={100}
  //                 alt="app store button"
  //               />
  //             </Link>
  //             <Link
  //               href={siteSettings.cta.app_store_link}
  //               className="w-32 md:w-48"
  //             >
  //               <Image
  //                 src={PlayStoreImg}
  //                 width={334}
  //                 height={100}
  //                 alt="play store button"
  //               />
  //             </Link>
  //           </div>
  //         </div>

  //         <div className="absolute bottom-0 right-10 hidden rtl:left-10 lg:block lg:w-[360px] xl:right-28 xl:w-[400px] rtl:xl:left-28 2xl:right-64 rtl:2xl:left-64 3xl:w-[480px]">
  //           <Image
  //             src={siteSettings.cta.mockup_img_src}
  //             width={400}
  //             height={386}
  //             alt="mockup"
  //           />
  //         </div>
  //       </div> */}
  //     </div>
  //   </SectionBlock>
  // );
};

export default CallToAction;
