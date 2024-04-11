// import SectionBlock from '@/components/ui/section-block';
// import FilterBar from './filter-bar';
// import Categories from '@/components/categories/categories';
// import CallToAction from '@/components/cta/call-to-action';
// import GroupProducts from '@/components/products/group-products';
// import PopularProductsGrid from '@/components/products/popular-products';
// import TopAuthorsGrid from '@/components/author/top-authors-grid';
// import Banner from '@/components/banners/banner';
// import TopManufacturersGrid from '@/components/manufacturer/top-manufacturers-grid';
// import { useTranslation } from 'next-i18next';
// import type { HomePageProps } from '@/types';
// import ProductGridHome from '@/components/products/grids/home';
// import BestSellingProductsGrid from '@/components/products/best-selling-products';
// import { Locationwiseshop } from "@/components/custome/notification";
// import { useEffect, useState } from 'react';
// import CustomeProductGrid from "@/components/custome/products";

// import {useFlashSale} from '@/framework/flash-sales';
// import Countdown from 'react-countdown';

// import rangeMap from '@/lib/range-map';
// import { useCoupons } from '@/framework/coupon';
// import CouponLoader from '@/components/ui/loaders/coupon-loader';
// import CouponCard from '@/components/ui/cards/coupon';
// import NotFound from '@/components/ui/not-found';
// import Button from '@/components/ui/button';
// import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
// import cn from 'classnames';
// import { ArrowNext, ArrowPrev } from '../icons';

// export default function CompactLayout({ variables }: HomePageProps) {
//   const { t } = useTranslation('common');
//   const limit = 20;

//   const [customeProductView, setCustomeProductView] = useState(variables.layoutSettings.customeproduct)

//   const { flashSale, loading, error } = useFlashSale({
//     slug: 'we-have-sale',
//     language: 'en',
//   });

//   const flashSaleStartDate = flashSale?.start_date;
//   const flashSaleLastDate = flashSale?.end_date;

//   const { isLoading, isLoadingMore, hasMore, coupons, loadMore } = useCoupons();
//   const isValidCoupon = coupons.filter(
//     (item: any) => Boolean(item?.is_approve) && Boolean(item?.is_valid),
//   );

//   if (!isLoading && !coupons.length) {
//     return (
//       <div className="max-w-lg px-4 pt-6 pb-8 mx-auto bg-gray-100 lg:p-8">
//         <NotFound text="text-no-coupon" />
//       </div>
//     );
//   }

//   const breakpoints = {
//     320: {
//       slidesPerView: 2,
//     },

//     440: {
//       slidesPerView: 2,
//     },

//     620: {
//       slidesPerView: 3,
//     },

//     820: {
//       slidesPerView: 4,
//     },

//     1100: {
//       slidesPerView: 4,
//     },

//     1280: {
//       slidesPerView: 6,
//     },
//   };

//   return (
//     <div className="flex flex-col flex-1 bg-white">
//       <FilterBar
//         className="top-16 lg:hidden"
//         variables={variables.categories}
//       />
//       <main className="block w-full mt-20 sm:mt-24 lg:mt-6 xl:overflow-hidden">
//         <SectionBlock>
//           <Banner layout="compact" variables={variables.types} />
//         </SectionBlock>

//         <Locationwiseshop />

//         {variables?.layoutSettings?.category?.enable ? (
//           <Categories
//             title={variables?.layoutSettings?.category?.title}
//             layout="compact"
//             variables={variables.categories}
//           />
//         ) : (
//           ''
//         )}

//         {variables?.layoutSettings?.bestSelling?.enable ? (
//           <BestSellingProductsGrid
//             variables={variables?.bestSellingProducts}
//             title={variables?.layoutSettings?.bestSelling?.title}
//           />
//         ) : (
//           ''
//         )}

//         {variables?.layoutSettings?.popularProducts?.enable ? (
//           <PopularProductsGrid
//             variables={variables.popularProducts}
//             title={variables?.layoutSettings?.popularProducts?.title}
//           />
//         ) : (
//           ''
//         )}

//         <div className='bg-[#009F7F] p-10 space-y-5 mb-5'>
//           <p className='text-center text-white text-3xl font-semibold font-sans'>Best Offer 2024</p>
//           <p className='text-center text-white text-4xl font-semibold font-sans'>Get Upto 10% OFF On All Products</p>
//           <div className='flex justify-center	'>
//             <div className='bg-white p-5 rounded-lg  flex flex-row ' >
//               <p className='pr-5 text-black font-semibold'>USE Coupon Code:</p>
//               <p className='text-[#009F7F] font-semibold'>FLAT10</p>
//             </div>
//           </div>

//           <CountdownTimerScreen
//             date={
//               new Date(flashSale?.sale_status ? flashSaleLastDate : flashSaleStartDate)
//             }
//           />
//         </div >

//         {variables?.layoutSettings?.handpickedProducts?.enable ? (
//           <GroupProducts
//             products={variables?.layoutSettings?.handpickedProducts?.products}
//             title={variables?.layoutSettings?.handpickedProducts?.title}
//             isSlider={
//               variables?.layoutSettings?.handpickedProducts?.enableSlider
//             }
//           />
//         ) : (
//           ''
//         )}
//         {variables?.layoutSettings?.newArrival?.enable ? (
//           <SectionBlock title={variables?.layoutSettings?.newArrival?.title}>
//             <ProductGridHome
//               column="five"
//               variables={{
//                 ...variables.products,
//                 sortedBy: 'DESC',
//                 orderBy: 'created_at',
//               }}
//             />
//           </SectionBlock>
//         ) : (
//           ''
//         )}

//         <div>
//           <div className='mt-10 flex items-center justify-between px-10'>
//             <h3 className="text-2xl font-semibold lg:text-[27px] 3xl:text-3xl">Offers</h3>
//           </div>
//           <div className={cn('w-full relative p-10')}>
//             {isLoading && !isValidCoupon.length ? (
//               rangeMap(limit, (i) => (
//                 <CouponLoader key={i} uniqueKey={`coupon-${i}`} />
//               ))
//             ) : isValidCoupon.length ? (
//               <>
//                 <Swiper
//                   id="category-card-menu"
//                   modules={[Navigation]}
//                   navigation={{
//                     nextEl: '.next',
//                     prevEl: '.prev',
//                   }}
//                   breakpoints={breakpoints}
//                   spaceBetween={70}
//                   pagination={{
//                     clickable: true,
//                   }}
//                   grid={{
//                     rows: 2,
//                   }}
//                 >
//                   {isValidCoupon?.map((item) => (
//                     <SwiperSlide key={item.id} className='shadow-xl'>
//                       <CouponCard coupon={item} />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 <div
//                   className="prev absolute top-2/4 z-10  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ml-10"
//                   role="button"
//                 >
//                   <span className="sr-only">{t('common:text-previous')}</span>
//                   <ArrowPrev width={18} height={18} />
//                 </div>
//                 <div
//                   className="next absolute top-2/4 z-10  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 mr-10"
//                   role="button"
//                 >
//                   <span className="sr-only">{t('common:text-next')}</span>
//                   <ArrowNext width={18} height={18} />
//                 </div>
//               </>
//             ) : (
//               <div className="max-w-lg mx-auto bg-gray-100 col-span-full">
//                 <NotFound text="text-no-coupon" />
//               </div>
//             )}
//             {
//               hasMore && (
//                 <div className="flex items-center justify-center mt-8 lg:mt-12">
//                   <Button onClick={loadMore} loading={isLoadingMore}>
//                     {t('text-load-more')}
//                   </Button>
//                 </div>
//               )
//             }
//           </div>
//         </div>

//         {customeProductView?.map((productItem: any) => {
//           return (
//             <CustomeProductGrid
//               variables={productItem.products}
//               title={productItem.title}
//             />
//           )
//         })}

//         {variables?.layoutSettings?.authors?.enable ? (
//           <TopAuthorsGrid title={variables?.layoutSettings?.authors?.title} />
//         ) : (
//           ''
//         )}
//         {variables?.layoutSettings?.manufactures?.enable ? (
//           <TopManufacturersGrid
//             title={variables?.layoutSettings?.manufactures?.title}
//           />
//         ) : (
//           ''
//         )}

//         <CallToAction bottomSliderData={variables.layoutSettings.bottomslider} />
//       </main>
//     </div>
//   );
// }

// type CountdownTimerProps = {
//   date: Date;
//   title?: string;
//   className?: string;
// };

// const renderer = (
//   {
//     days,
//     hours,
//     minutes,
//     seconds,
//     completed,
//   }: {
//     days: number;
//     hours: number;
//     minutes: number;
//     seconds: number;
//     completed: boolean;
//   },
//   // @ts-ignore
//   props
// ) => {
//   if (completed) {
//     // Render a completed state
//     return '';
//   } else {
//     // Render a countdown
//     return (
//       <div className='flex justify-center	'>
//         <div className='flex'>
//           <div className='flex rounded-l-lg bg-amber-400 p-3 border-2 border-white flex-col w-20'>
//             <p className='text-white font-semibold text-3xl text-center'>{days}</p>
//             <p className='text-white font-semibold text-lg text-center'>Days</p>
//           </div>
//           <div className='flex  bg-amber-400 p-3 border-2 border-white flex-col max-w-40	'>
//             <p className='text-white font-semibold text-3xl text-center'>{hours}</p>
//             <p className='text-white font-semibold text-lg text-center'>Hours</p>
//           </div>
//           <div className='flex  bg-amber-400 p-3 border-2 border-white flex-col  max-w-40	'>
//             <p className='text-white font-semibold text-3xl text-center '>{minutes}</p>
//             <p className='text-white font-semibold text-lg text-center'>Minutes</p>
//           </div>
//           <div className='flex rounded-r-lg bg-amber-400 p-3 border-2 border-white flex-col  max-w-40	' >
//             <p className='text-white font-semibold text-3xl text-center'>{seconds}</p>
//             <p className='text-white font-semibold text-lg text-center'>Seconds</p>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// const CountdownTimerScreen: React.FC<CountdownTimerProps> = ({
//   date,
//   title,
//   className,
// }) => {
//   return (
//     <>
//       <Countdown
//         date={date}
//         renderer={(props) => renderer(props, { className })}
//       />
//     </>
//   );
// };

import SectionBlock from '@/components/ui/section-block';
import FilterBar from './filter-bar';
import Categories from '@/components/categories/categories';
import CallToAction from '@/components/cta/call-to-action';
import GroupProducts from '@/components/products/group-products';
import PopularProductsGrid from '@/components/products/popular-products';
import TopAuthorsGrid from '@/components/author/top-authors-grid';
import Banner from '@/components/banners/banner';
import TopManufacturersGrid from '@/components/manufacturer/top-manufacturers-grid';
import { useTranslation } from 'next-i18next';
import type { HomePageProps } from '@/types';
import ProductGridHome from '@/components/products/grids/home';
import BestSellingProductsGrid from '@/components/products/best-selling-products';
import { Locationwiseshop } from '@/components/custome/notification';
import { useEffect, useState, useRef } from 'react';
import CustomeProductGrid from '@/components/custome/products';

// import { useSingleFlashSale } from '@/framework/flash-sales';
import Countdown from 'react-countdown';

import rangeMap from '@/lib/range-map';
import { useCoupons } from '@/framework/coupon';
import CouponLoader from '@/components/ui/loaders/coupon-loader';
import CouponCard from '@/components/ui/cards/coupon';
import NotFound from '@/components/ui/not-found';
import Button from '@/components/ui/button';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import cn from 'classnames';
import { ArrowNext, ArrowPrev } from '../icons';
import Image from 'next/image';

import DeliveryIcon from '@/assets/express-delivery 1.png';
import DiscountIcon from '@/assets/promotion 1.png';
import RewardIcon from '@/assets/presenter 1.png';
import HoursIcon from '@/assets/24-hours-support 1.png';

import { useCategories } from '@/framework/category';
import StaticMenu from './menu/static-menu';

import { ArrowNextIcon } from '../icons/arrow-next';
import { ArrowPrevIcon } from '../icons/arrow-prev';
import { useIsRTL } from '@/lib/locals';

export default function CompactLayout({ variables }: HomePageProps) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useIsRTL();

  const { t } = useTranslation('common');
  const limit = 20;

  let pageViewSlug = variables.layoutSettings.pageViews;

  const { categories } = useCategories(variables.categories);

  const [isList, setIsList] = useState<any>([]);
  useEffect(() => {
    if (pageViewSlug) {
      setIsList(pageViewSlug?.split(','));
    }
  }, []);
  const [isFlashSaleList, setIsFlashSaleList] = useState<any>();
  const [flashLength, setFlashLength] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://knockknock.mx/backend/all/flashSale',
      );
      const repo = await response.json();
      setFlashLength(repo.length);

      // if (!repo.length) {
      repo?.map((item: any) => {
        setIsFlashSaleList(item);
      });
      // }
    }
    fetchData();
  }, []);

  const [customeProductView, setCustomeProductView] = useState(
    variables.layoutSettings.customeproduct,
  );

  // const flashSaleStartDate = flashSale?.start_date;
  // const flashSaleLastDate = flashSale?.end_date;

  const { isLoading, isLoadingMore, hasMore, coupons, loadMore } = useCoupons();
  const isValidCoupon = coupons.filter(
    (item: any) => Boolean(item?.is_approve) && Boolean(item?.is_valid),
  );

  // if (!isLoading && !coupons.length) {
  //   return (
  //     <div className="max-w-lg px-4 pt-6 pb-8 mx-auto bg-gray-100 lg:p-8">
  //       <NotFound text="text-no-coupon" />
  //     </div>
  //   );
  // }

  const PromotinalSliderBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    580: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  const breakpoints = {
    320: {
      slidesPerView: 2,
    },

    440: {
      slidesPerView: 2,
    },

    620: {
      slidesPerView: 3,
    },

    820: {
      slidesPerView: 4,
    },

    1100: {
      slidesPerView: 4,
    },

    1280: {
      slidesPerView: 6,
    },
  };

  // const offersecation = ()=> {
  //   if (flashSale) {
  //     return (
  //       <div className='bg-[#009F7F] p-10 space-y-5 mb-5'>
  //         <p className='text-center text-white text-3xl font-semibold font-sans'>Best Offer 2024</p>
  //         <p className='text-center text-white text-4xl font-semibold font-sans'>Get Upto 10% OFF On All Products</p>
  //         <div className='flex justify-center	'>
  //           <div className='bg-white p-5 rounded-lg  flex flex-row ' >
  //             <p className='pr-5 text-black font-semibold'>USE Coupon Code:</p>
  //             <p className='text-[#009F7F] font-semibold'>FLAT10</p>
  //           </div>
  //         </div>
  //         <CountdownTimerScreen
  //           date={
  //             // new Date(flashShaleDetail.sale_status ? flashShaleDetail.end_date : flashShaleDetail.start_date)
  //             new Date(flashSale.sale_status ? flashSale.end_date : flashSale.start_date)
  //           }
  //         />
  //       </div>
  //     )
  //   }else{
  //     return;
  //   }
  // }

  const CategoriesPage = (item: any) => {
    return variables?.layoutSettings?.category?.enable ? (
      <Categories
        title={variables?.layoutSettings?.category?.title}
        layout="compact"
        variables={variables.categories}
      />
    ) : (
      ''
    );
  };

  const PromotinalSlider = (item: any) => {
    return (
      <div className="p-6 relative" key={item}>
        <Swiper
          breakpoints={PromotinalSliderBreakpoints}
          modules={[Navigation]}
          spaceBetween={30}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
        >
          <SwiperSlide>
            <div className="bg-[#E0EEF6] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-2 rounded-md">
              <div className="col-span-2 space-y-3">
                <p className="text-2xl font-semibold">Entrega urgente</p>
                <p className="text-gray-600	">
                  Consulte su tienda cercana para recibir su pedido en 45
                  minutos
                </p>
              </div>
              <div>
                <Image
                  className="h-auto max-w-lg lg:ms-auto m-auto"
                  src={DeliveryIcon}
                  alt={''}
                  width={75}
                  height={20}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#BAE6D3]  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-2 rounded-md">
              <div className="col-span-2 space-y-3">
                <p className="text-2xl font-semibold">Mejores descuentos</p>
                <p className="text-gray-600	">
                  Hasta 10 a 20% de descuento sobre la tarifa del mercado
                </p>
                {/* <button className='bg-white p-2 shadow-xl ' >
                  <p className='text-[#009F7F] font-semibold'>Order Now</p>
                </button > */}
              </div>
              <div>
                <Image
                  className="h-auto max-w-lg lg:ms-auto m-auto"
                  src={DiscountIcon}
                  alt={''}
                  width={75}
                  height={20}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#CDF1FF]  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-2 rounded-md">
              <div className="col-span-2 space-y-3">
                <p className="text-2xl font-semibold">Recompensas</p>
                <p className="text-gray-600	">
                  ¡Ofrecemos la mejor oferta para los clientes existentes!
                </p>
                {/* <button className='bg-white p-2 shadow-xl ' >
                  <p className='text-[#009F7F] font-semibold'>Order Now</p>
                </button> */}
              </div>
              <div>
                <Image
                  className="h-auto max-w-lg lg:ms-auto m-auto"
                  src={RewardIcon}
                  alt={''}
                  width={75}
                  height={20}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#B4C0FE]   grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-2 rounded-md">
              <div className=" col-span-2 space-y-3">
                <p className="text-2xl font-semibold">100% mejor calidad</p>
                <p className="text-gray-600	">
                  Proporcionamos reembolso del 100% si el artículo está dañado.
                </p>
                {/* <button className='bg-white p-2 shadow-xl ' >
                  <p className='text-[#009F7F] font-semibold'>Order Now</p>
                </button > */}
              </div>
              <div>
                <Image
                  className="h-auto max-w-lg lg:ms-auto m-auto "
                  src={HoursIcon}
                  alt={''}
                  width={75}
                  height={20}
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          ref={prevRef}
          className="absolute z-10 flex items-center  justify-center w-8 h-8 -mt-2 rounded-full outline-none cursor-pointer category-slider-prev top-1/2 bg-light text-heading shadow-300 focus:outline-none ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ml-10"
        >
          <span className="sr-only">{t('text-previous')}</span>
          {isRTL ? <ArrowNextIcon /> : <ArrowPrevIcon />}
        </div>
        <div
          ref={nextRef}
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-2  rounded-full outline-none cursor-pointer category-slider-next  top-1/2 bg-light text-heading shadow-300 focus:outline-none  ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 mr-10"
        >
          <span className="sr-only">{t('text-next')}</span>
          {isRTL ? <ArrowPrevIcon /> : <ArrowNextIcon />}
        </div>
      </div>
    );
  };

  const BestSellingPage = (item: any) => {
    return variables?.layoutSettings?.bestSelling?.enable ? (
      <BestSellingProductsGrid
        key={item}
        variables={variables?.bestSellingProducts}
        title={variables?.layoutSettings?.bestSelling?.title}
      />
    ) : (
      ''
    );
  };

  const PopularPage = (item: any) => {
    return variables?.layoutSettings?.popularProducts?.enable ? (
      <PopularProductsGrid
        key={item}
        variables={variables.popularProducts}
        title={variables?.layoutSettings?.popularProducts?.title}
      />
    ) : (
      ''
    );
  };

  const OfferCountDown = (item: any) => {
    return flashLength === 0 ? (
      <div></div>
    ) : (
      <div key={item} className="bg-[#009F7F] p-3 space-y-5 mb-5">
        <p className="text-center text-white text-3xl font-semibold font-sans">
          Best Offer 2024
        </p>
        <p className="text-center text-white text-2xl font-semibold font-sans">
          Get Upto 10% OFF On All Products
        </p>
        <div className="flex justify-center	">
          <div className="bg-white p-5 rounded-lg  flex flex-row ">
            <p className="pr-5 text-black font-semibold">USE Coupon Code:</p>
            {/* <p className='text-[#009F7F] font-semibold'>{isFlashSaleList.title}</p> */}
          </div>
        </div>

        <CountdownTimerScreen
          date={
            // new Date(flashShaleDetail.sale_status ? flashShaleDetail.end_date : flashShaleDetail.start_date)
            new Date(
              isFlashSaleList?.sale_status
                ? isFlashSaleList.end_date
                : isFlashSaleList?.start_date,
            )
          }
        />
      </div>
    );
  };

  const handpickProduct = (item: any) => {
    return variables?.layoutSettings?.handpickedProducts?.enable ? (
      <GroupProducts
        key={item}
        products={variables?.layoutSettings?.handpickedProducts?.products}
        title={variables?.layoutSettings?.handpickedProducts?.title}
        isSlider={variables?.layoutSettings?.handpickedProducts?.enableSlider}
      />
    ) : (
      ''
    );
  };

  const NewProductPage = (item: any) => {
    return variables?.layoutSettings?.newArrival?.enable ? (
      <SectionBlock
        key={item}
        title={variables?.layoutSettings?.newArrival?.title}
      >
        <ProductGridHome
          column="five"
          variables={{
            ...variables.products,
            sortedBy: 'DESC',
            orderBy: 'created_at',
          }}
        />
      </SectionBlock>
    ) : (
      ''
    );
  };

  const OfferPage = (item: any) => {
    return (
      <div key={item}>
        <div className=" flex items-center justify-between px-10">
          <h3 className="text-2xl font-semibold lg:text-[27px] 3xl:text-3xl">
            Offers
          </h3>
        </div>
        <div className={cn('w-full relative p-10')}>
          {isLoading && !isValidCoupon.length ? (
            rangeMap(limit, (i) => (
              <CouponLoader key={i} uniqueKey={`coupon-${i}`} />
            ))
          ) : isValidCoupon.length ? (
            <>
              <Swiper
                id="category-card-menu"
                modules={[Navigation]}
                navigation={{
                  nextEl: '.next',
                  prevEl: '.prev',
                }}
                breakpoints={breakpoints}
                spaceBetween={70}
                pagination={{
                  clickable: true,
                }}
                grid={{
                  rows: 2,
                }}
              >
                {isValidCoupon?.map((item) => (
                  <SwiperSlide key={item.id} className="shadow-xl">
                    <CouponCard coupon={item} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                className="prev absolute top-2/4 z-10  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ml-10"
                role="button"
              >
                <span className="sr-only">{t('common:text-previous')}</span>
                <ArrowPrev width={18} height={18} />
              </div>
              <div
                className="next absolute top-2/4 z-10  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 mr-10"
                role="button"
              >
                <span className="sr-only">{t('common:text-next')}</span>
                <ArrowNext width={18} height={18} />
              </div>
            </>
          ) : (
            <div className="max-w-lg mx-auto bg-gray-100 col-span-full">
              <NotFound text="text-no-coupon" />
            </div>
          )}
          {hasMore && (
            <div className="flex items-center justify-center mt-8 lg:mt-12">
              <Button onClick={loadMore} loading={isLoadingMore}>
                {t('text-load-more')}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CustomeProductPage = (item: any) => {
    return customeProductView.map((productItem: any, index: number) => {
      return (
        <CustomeProductGrid
          key={index}
          variables={productItem?.products}
          title={productItem?.title}
        />
      );
    });
  };

  const BottomPage = (item: any) => {
    return (
      <CallToAction
        key={item}
        bottomSliderData={variables.layoutSettings.bottomslider}
      />
    );
  };

  const NearShopPage = (item: any) => {
    return <Locationwiseshop key={item} />;
  };

  // console.log('variables.categories',variables.categories);

  return (
    <div className="flex flex-col flex-1 bg-white">
      <FilterBar
        className="top-16 lg:hidden"
        variables={variables.categories}
      />
      <main className="block w-full">
        <div className="justify-center bg-light w-full lg:mt-20 mb-0 ">
          <ul className="hidden block justify-center items-center rtl:space-x-reverse xl:flex 2xl:space-x-10 ">
            <StaticMenu categories={categories} />
          </ul>
        </div>
        <SectionBlock>
          <Banner layout="compact" variables={variables.types} />
        </SectionBlock>

        {isList.map((item: any) => {
          switch (item) {
            case 'near-shop':
              return NearShopPage(item);
              break;
            case 'best-selling':
              return BestSellingPage(item);
              break;
            case 'popular-product':
              return PopularPage(item);
              break;
            case 'our-categories':
              return CategoriesPage(item);
              break;
            case 'people-also-buy':
              return handpickProduct(item);
              break;
            case 'new-product':
              return NewProductPage(item);
              break;
            case 'offers':
              return OfferPage(item);
              break;
            case 'custome-product':
              return CustomeProductPage(item);
              break;
            case 'bottom-banner':
              return BottomPage(item);
              break;
            case 'offer-countdown':
              return OfferCountDown(item);
              break;
            case 'promotinal-slider':
              return PromotinalSlider(item);
              break;
            default:
              break;
          }
        })}
      </main>
    </div>
  );
}

type CountdownTimerProps = {
  date: Date;
  title?: string;
  className?: string;
};

const renderer = (
  {
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  },
  // @ts-ignore
  props,
) => {
  if (completed) {
    // Render a completed state
    return '';
  } else {
    // Render a countdown
    return (
      <div className="flex justify-center	">
        <div className="flex">
          <div className="flex rounded-l-lg bg-amber-400 p-3 border-2 border-white flex-col w-20">
            <p className="text-white font-semibold text-3xl text-center">
              {Number.isNaN(days) ? 0 : days}
            </p>
            <p className="text-white font-semibold text-lg text-center">Days</p>
          </div>
          <div className="flex  bg-amber-400 p-3 border-2 border-white flex-col max-w-40	">
            <p className="text-white font-semibold text-3xl text-center">
              {Number.isNaN(hours) ? 0 : hours}
            </p>
            <p className="text-white font-semibold text-lg text-center">
              Hours
            </p>
          </div>
          <div className="flex  bg-amber-400 p-3 border-2 border-white flex-col  max-w-40	">
            <p className="text-white font-semibold text-3xl text-center ">
              {Number.isNaN(minutes) ? 0 : minutes}
            </p>
            <p className="text-white font-semibold text-lg text-center">
              Minutes
            </p>
          </div>
          <div className="flex rounded-r-lg bg-amber-400 p-3 border-2 border-white flex-col  max-w-40	">
            <p className="text-white font-semibold text-3xl text-center">
              {Number.isNaN(seconds) ? 0 : seconds}
            </p>
            <p className="text-white font-semibold text-lg text-center">
              Seconds
            </p>
          </div>
        </div>
      </div>
    );
  }
};

const CountdownTimerScreen: React.FC<CountdownTimerProps> = ({
  date,
  title,
  className,
}) => {
  return (
    <>
      <Countdown
        date={date}
        renderer={(props) => renderer(props, { className })}
      />
    </>
  );
};
