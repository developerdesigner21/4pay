// import { CloseIcon } from '@/components/icons/close-icon';
// import { SearchIcon } from '@/components/icons/search-icon';
// import Alert from '@/components/ui/alert';
// import Button from '@/components/ui/button';
// import CountdownTimer from '@/components/ui/countdown-timer';
// import LanguageSwitcher from '@/components/ui/language-switcher';
// import Link from '@/components/ui/link';
// import Logo from '@/components/ui/logo';
// import SearchWithSuggestion from '@/components/ui/search/search-with-suggestion';
// import { useSettings } from '@/framework/settings';
// import {
//   checkIsMaintenanceModeComing,
//   checkIsScrollingStart,
//   isMultiLangEnable,
//   RESPONSIVE_WIDTH,
// } from '@/lib/constants';
// import { useActiveScroll } from '@/lib/use-active-scroll';
// import { authorizationAtom } from '@/store/authorization-atom';
// import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
// import { drawerAtom } from '@/store/drawer-atom';
// import cn from 'classnames';
// import { motion } from 'framer-motion';
// import { useAtom } from 'jotai';
// import { useTranslation } from 'next-i18next';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
// import React from 'react';
// import GroupsDropdownMenu from './menu/groups-menu';
// import StaticMenu from './menu/static-menu';
// const CartCounterIconButton = dynamic(
//   () => import('@/components/cart/cart-counter-icon-button'),
//   { ssr: false }
// );
// const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
//   ssr: false,
// });
// const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });
// import { useWindowSize } from 'react-use';


// import { useIsHomePage } from '@/lib/use-is-homepage';
// import { useHeaderSearch } from '@/layouts/headers/header-search-atom';
// import { useMemo, useState } from 'react';
// import { MapPin } from '@/components/icons/map-pin';
// import LocationBasedShopForm from '@/components/form/location-based-shop-form';


// const HeaderMinimal = ({ layout }: { layout: string }) => {

//   const isHomePage = useIsHomePage();
//   const { show, hideHeaderSearch } = useHeaderSearch();
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const closeLocation = () => setOpenDropdown(false);

//   const isFlattenHeader = useMemo(
//     () => !show && isHomePage && layout !== 'modern',
//     [show, isHomePage, layout]
//   );

//   const router = useRouter();
//   const { t } = useTranslation('common');
//   const [_, setDrawerView] = useAtom(drawerAtom);
//   const [displayMobileHeaderSearch, setDisplayMobileHeaderSearch] = useAtom(
//     displayMobileHeaderSearchAtom
//   );
//   const [isAuthorize] = useAtom(authorizationAtom);

//   function handleSidebar(view: string) {
//     setDrawerView({ display: true, view });
//   }
//   const [underMaintenanceIsComing] = useAtom(checkIsMaintenanceModeComing);
//   const [isScrolling] = useAtom(checkIsScrollingStart);
//   const { settings } = useSettings();
//   const siteHeaderRef = React.useRef(null);
//   useActiveScroll(siteHeaderRef);
//   const { width } = useWindowSize();

//   // return (
//   //   <>
//   //     {width >= RESPONSIVE_WIDTH && underMaintenanceIsComing && !isScrolling ? (
//   //       <>
//   //         <Alert
//   //           message={t('text-maintenance-mode-title')}
//   //           variant="info"
//   //           className="sticky top-0 left-0 z-50"
//   //           childClassName="flex justify-center items-center w-full gap-4"
//   //         >
//   //           <CountdownTimer
//   //             date={new Date(settings?.maintenance?.start as string)}
//   //             className="text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600"
//   //           />
//   //         </Alert>
//   //       </>
//   //     ) : (
//   //       ''
//   //     )}
//   //     <header className={cn('site-header-with-search lg:h-22')}>
//   //       <div
//   //         ref={siteHeaderRef}
//   //         className={cn(
//   //           'fixed z-50 flex w-full items-center justify-between border-b border-border-200 bg-light px-5 py-3 shadow-sm transition-transform duration-300 lg:h-22 lg:py-5 lg:px-6 xl:px-8',
//   //           {
//   //             'px-5 lg:!px-7 xl:!px-10': layout === 'compact',
//   //           },
//   //         )}
//   //       >
//   //         <motion.button
//   //           onClick={() => handleSidebar('MAIN_MENU_VIEW')}
//   //           className="group hidden h-full w-6 shrink-0 items-center justify-center focus:text-accent focus:outline-0 ltr:mr-6 rtl:ml-6 lg:flex xl:hidden"
//   //         >
//   //           <span className="sr-only">{t('text-burger-menu')}</span>
//   //           <div className="flex w-full flex-col space-y-1.5">
//   //             <span className="h-0.5 w-1/2 rounded bg-gray-600 transition-all group-hover:w-full" />
//   //             <span className="h-0.5 w-full rounded bg-gray-600 transition-all group-hover:w-3/4" />
//   //             <span className="h-0.5 w-3/4 rounded bg-gray-600 transition-all group-hover:w-full" />
//   //           </div>
//   //         </motion.button>
//   //         <div className="flex w-full items-center ltr:mr-auto rtl:ml-auto lg:w-auto">
//   //           {/* <Logo className="mx-auto lg:mx-0" /> */}
//   //           <Logo
//   //             className={`${
//   //               !isMultiLangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'
//   //             }`}
//   //           />

//   //           {/* {isMultiLangEnable ? (
//   //           <div className="ltr:ml-auto rtl:mr-auto lg:hidden">
//   //             <LanguageSwitcher />
//   //           </div>
//   //         ) : (
//   //           ''
//   //         )} */}

//   //           <div className="hidden shrink-0 items-center space-x-7 ltr:ml-10 ltr:mr-auto rtl:mr-10 rtl:ml-auto rtl:space-x-reverse lg:flex 2xl:space-x-10">
//   //             <ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse xl:flex 2xl:space-x-10">
//   //               <StaticMenu />
//   //             </ul>
//   //           </div>
//   //         </div>

//   //         <div className='px-10 w-full '>
//   //           {layout === 'compact' ? (
//   //             <div className="relative w-full max-w-full rounded-full">
//   //               <SearchWithSuggestion
//   //                 label={'Search Product Name'}
//   //                 variant="minimal"
//   //                 inputClassName="block w-full rounded-full border border-slate-300 border-border-200 bg-gray-50 py-2 text-sm text-heading transition-[border] placeholder:text-gray-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-0 ltr:pl-12 rtl:pr-12 sm:text-sm sm:leading-6"
//   //                 seeMore={true}
//   //               />
//   //             </div>
//   //           ) : null}
//   //         </div>

//   //         {displayMobileHeaderSearch && (
//   //           <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center space-x-4 border-b-accent-300 bg-light px-5 py-1.5 backdrop-blur ltr:left-0 rtl:right-0 rtl:space-x-reverse lg:border lg:bg-opacity-30">
//   //             <SearchWithSuggestion
//   //               label={t('text-search-label')}
//   //               variant="minimal"
//   //               className="lg:max-w-3xl"
//   //               inputClassName="lg:border-accent-400"
//   //               seeMore={true}
//   //             />
//   //             <Button
//   //               variant="custom"
//   //               onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
//   //               className="hidden border border-accent-400 bg-gray-100 !px-4 text-accent lg:inline-flex"
//   //             >
//   //               <CloseIcon className="h-5 w-5" />
//   //             </Button>
//   //           </div>
//   //         )}

//   //         {/* {layout === 'compact' && (
//   //         <div className="hidden w-full px-8 mx-auto xl:flex xl:w-6/12 xl:px-10 xl:rtl:w-4/12 2xl:rtl:w-5/12">
//   //           <SearchWithSuggestion
//   //             label={t('text-search-label')}
//   //             variant="minimal"
//   //             seeMore={true}
//   //           />
//   //         </div>
//   //       )} */}

//   //         <div className="flex shrink-0 items-center space-x-4 rtl:space-x-reverse sm:space-x-6">
//   //           <div
//   //             className={cn(
//   //               'hidden',
//   //               layout === 'compact' ? 'lg:inline-flex' : 'sm:inline-flex',
//   //             )}
//   //           >
//   //             <GroupsDropdownMenu variant="minimal" />
//   //           </div>
            
//   //           {settings?.useGoogleMap && (
//   //             <div
//   //               className={cn(
//   //                 'relative flex justify-center lg:w-auto lg:border-none',
//   //                 isFlattenHeader || (isHomePage && 'flex'),
//   //               )}
//   //             >
//   //               <Button
//   //                 variant="custom"
//   //                 className="!flex h-[38px] w-[38px] max-w-full items-center gap-2 rounded-full border border-border-200 bg-light !p-1 text-sm !font-normal focus:!shadow-none focus:!ring-0 md:text-base"
//   //                 onClick={() => setOpenDropdown(!openDropdown)}
//   //               >
//   //                 <span className="flex shrink-0 grow-0 basis-auto items-center gap-1 text-base text-gray-700">
//   //                   <MapPin className="h-5 w-5 " />
//   //                 </span>
//   //               </Button>
//   //               <LocationBasedShopForm
//   //                 className={cn(
//   //                   'fixed inset-x-0 top-[60px] mx-auto bg-white lg:top-[82px]',
//   //                   openDropdown === true ? '' : 'hidden',
//   //                 )}
//   //                 closeLocation={closeLocation}
//   //               />
//   //             </div>
//   //           )}

//   //           {/* {layout === 'compact' ? (
//   //             <Button
//   //               variant="custom"
//   //               className="hidden h-[38px] w-[38px] items-center  gap-2 rounded-full border border-border-200 bg-light !p-1 text-sm !font-normal focus:!shadow-none focus:!ring-0 md:text-base lg:!flex"
//   //               onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
//   //             >
//   //               <SearchIcon className="h-4 w-4" />
//   //             </Button>
//   //           ) : null} */}

//   //           {isMultiLangEnable ? (
//   //             <div className="ms-auto lg:me-5 xl:me-8 2xl:me-10 flex-shrink-0">
//   //               <LanguageSwitcher />
//   //             </div>
//   //           ) : null}
//   //           <CartCounterIconButton />
//   //           <div className="flex items-center lg:space-x-4 rtl:lg:space-x-reverse">
//   //             <div className="hidden lg:inline-flex">
//   //               {isAuthorize ? <AuthorizedMenu /> : <JoinButton />}
//   //             </div>
//   //             {/* <Link
//   //               href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
//   //               variant="button"
//   //               target="_blank"
//   //             >
//   //               {t('text-become-seller')}
//   //             </Link> */}
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </header>
//   //   </>
//   // );

//   return (
//     <>
//       {width >= RESPONSIVE_WIDTH && underMaintenanceIsComing && !isScrolling ? (
//         <>
//           <Alert
//             message={t('text-maintenance-mode-title')}
//             variant="info"
//             className="sticky top-0 left-0 z-50"
//             childClassName="flex justify-center items-center w-full gap-4"
//           >
//             <CountdownTimer
//               date={new Date(settings?.maintenance?.start as string)}
//               className="text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600"
//             />
//           </Alert>
//         </>
//       ) : (
//         ''
//       )}
//       <header className={cn('site-header-with-search bg-white shadow-xl w-full z-20 fixed')}>
//         <motion.button
//           onClick={() => handleSidebar('MAIN_MENU_VIEW')}
//           className="group hidden h-full w-6 shrink-0 items-center justify-center focus:text-accent focus:outline-0 ltr:mr-6 rtl:ml-6 lg:flex xl:hidden"
//         >
//           <span className="sr-only">{t('text-burger-menu')}</span>
//           <div className="flex w-full flex-col space-y-1.5">
//             <span className="h-0.5 w-1/2 rounded bg-gray-600 transition-all group-hover:w-full" />
//             <span className="h-0.5 w-full rounded bg-gray-600 transition-all group-hover:w-3/4" />
//             <span className="h-0.5 w-3/4 rounded bg-gray-600 transition-all group-hover:w-full" />
//           </div>
//         </motion.button>
//         <div ref={siteHeaderRef}
//           className={cn(
//             'px-6 py-3 lg:py-5 lg:px-6 xl:px-8')}>

//           <div className="flex w-full items-center ltr:mr-auto rtl:ml-auto lg:w-auto">
//             <div>
//               <Logo
//                 className={`${
//                   !isMultiLangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'
//                 }`}
//               />
//             </div>

//             <div className="hidden z-50 shrink-0 items-center space-x-7 ltr:ml-10 ltr:mr-auto rtl:mr-10 rtl:ml-auto rtl:space-x-reverse lg:flex 2xl:space-x-10" >
//               <GroupsDropdownMenu variant="minimal" />
//             </div>

//             {/* <div className='hidden shrink-0 items-center space-x-3 ltr:ml-5 ltr:mr-auto rtl:mr-10 rtl:ml-auto lg:flex  p-3 px-6 order border border-slate-300 flex flex-row rounded-full cursor-pointer	'>
//               <MapPin className="w-[18px]" />
//               <p>Near Shop</p>
//             </div> */}
//             <Button
//                 variant="custom"
//                 className="pl-2 !flex h-[38px] w-[38px] max-w-full items-center gap-2 rounded-full border border-border-200 bg-light !p-1 text-sm !font-normal focus:!shadow-none focus:!ring-0 md:text-base"
//                 onClick={() => setOpenDropdown(!openDropdown)}
//               >
//                 <span className="flex shrink-0 grow-0 basis-auto items-center gap-1 text-base text-gray-700">
//                   <MapPin className="h-5 w-5 " />
//                 </span>
//               </Button>

//             {layout === 'compact' ? (
//               <div className='px-10 w-full bg-gray rounded-full ml-20 lg:ml-0'>
//                 <div className="relative w-full max-w-full rounded-full">
//                   <SearchWithSuggestion
//                     label={'Search Product Name'}
//                     variant="minimal"
//                     inputClassName="block w-full rounded-full border border-slate-300  bg-gray-50 py-2 text-sm text-heading transition-[border] placeholder:text-gray-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-0 ltr:pl-12 rtl:pr-12 sm:text-sm sm:leading-6"
//                     seeMore={true}
//                   />
//                 </div>
//               </div>
//             ) : null}

//             {displayMobileHeaderSearch && (
//               <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center space-x-4 border-b-accent-300 bg-light px-5 py-1.5 backdrop-blur ltr:left-0 rtl:right-0 rtl:space-x-reverse lg:border lg:bg-opacity-30">
//                 <SearchWithSuggestion
//                   label={t('text-search-label')}
//                   variant="minimal"
//                   className="lg:max-w-3xl"
//                   inputClassName="lg:border-accent-400"
//                   seeMore={true}
//                 />
//                 <Button
//                   variant="custom"
//                   onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
//                   className="hidden border border-accent-400 bg-gray-100 !px-4 text-accent lg:inline-flex"
//                 >
//                   <CloseIcon className="h-5 w-5" />
//                 </Button>
//               </div>
//             )}

//             <div
//               className="flex shrink-0 items-center space-x-4 rtl:space-x-reverse sm:space-x-6">
//               <CartCounterIconButton />
//               <div className="flex items-center lg:space-x-4 rtl:lg:space-x-reverse">
//                 <div className="hidden lg:inline-flex">
//                   {isAuthorize ? <AuthorizedMenu /> : <JoinButton />}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center bg-light w-full" >
//             <ul className="hidden shrink-0 items-center rtl:space-x-reverse xl:flex 2xl:space-x-10">
//               <StaticMenu />
//             </ul>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default HeaderMinimal;


import { CloseIcon } from '@/components/icons/close-icon';
import { SearchIcon } from '@/components/icons/search-icon';
import Alert from '@/components/ui/alert';
import Button from '@/components/ui/button';
import CountdownTimer from '@/components/ui/countdown-timer';
import LanguageSwitcher from '@/components/ui/language-switcher';
import Link from '@/components/ui/link';
import Logo from '@/components/ui/logo';
import SearchWithSuggestion from '@/components/ui/search/search-with-suggestion';
import { useSettings } from '@/framework/settings';
import {
  checkIsMaintenanceModeComing,
  checkIsScrollingStart,
  isMultiLangEnable,
  RESPONSIVE_WIDTH,
} from '@/lib/constants';
import { useActiveScroll } from '@/lib/use-active-scroll';
import { authorizationAtom } from '@/store/authorization-atom';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { drawerAtom } from '@/store/drawer-atom';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import GroupsDropdownMenu from './menu/groups-menu';
import StaticMenu from './menu/static-menu';
import HeaderLogo from '@/assets/headerlogo.png'
import Image from 'next/image';
import { HeartOutlineIcon } from '@/components/icons/heart-outline';

import React, { useMemo, useState } from 'react';
import { useHeaderSearch } from '@/layouts/headers/header-search-atom';
import { useIsHomePage } from '@/lib/use-is-homepage';


const CartCounterIconButton = dynamic(
  () => import('@/components/cart/cart-counter-icon-button'),
  { ssr: false }
);
const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });
import { useWindowSize } from 'react-use';
import { MapPin } from '../icons/map-pin';
// import { useCategories } from '@/framework/category';


const HeaderMinimal = ({ layout }: { layout: string }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [_, setDrawerView] = useAtom(drawerAtom);
  const [displayMobileHeaderSearch, setDisplayMobileHeaderSearch] = useAtom(
    displayMobileHeaderSearchAtom
  );
  const { show, hideHeaderSearch } = useHeaderSearch();
  const isHomePage = useIsHomePage();

  const [isAuthorize] = useAtom(authorizationAtom);
  function handleSidebar(view: string) {
    setDrawerView({ display: true, view });
  }
  const [underMaintenanceIsComing] = useAtom(checkIsMaintenanceModeComing);
  const [isScrolling] = useAtom(checkIsScrollingStart);
  const { settings } = useSettings();
  const siteHeaderRef = React.useRef(null);
  useActiveScroll(siteHeaderRef);
  const { width } = useWindowSize();
  const isFlattenHeader = useMemo(
    () => !show && isHomePage && layout !== 'modern',
    [show, isHomePage, layout]
  );
  const [openDropdown, setOpenDropdown] = useState(false);




  // return (
  //   <>
  //     {width >= RESPONSIVE_WIDTH && underMaintenanceIsComing && !isScrolling ? (
  //       <>
  //         <Alert
  //           message={t('text-maintenance-mode-title')}
  //           variant="info"
  //           className="sticky top-0 left-0 z-50"
  //           childClassName="flex justify-center items-center w-full gap-4"
  //         >
  //           <CountdownTimer
  //             date={new Date(settings?.maintenance?.start as string)}
  //             className="text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600"
  //           />
  //         </Alert>
  //       </>
  //     ) : (
  //       ''
  //     )}
  //     <header className={cn('site-header-with-search lg:h-22')}>
  //       <div
  //         ref={siteHeaderRef}
  //         className={cn(
  //           'fixed z-50 flex w-full items-center justify-between border-b border-border-200 bg-light px-5 py-3 shadow-sm transition-transform duration-300 lg:h-22 lg:py-5 lg:px-6 xl:px-8',
  //           {
  //             'px-5 lg:!px-7 xl:!px-10': layout === 'compact',
  //           },
  //         )}
  //       >
  //         <motion.button
  //           onClick={() => handleSidebar('MAIN_MENU_VIEW')}
  //           className="group hidden h-full w-6 shrink-0 items-center justify-center focus:text-accent focus:outline-0 ltr:mr-6 rtl:ml-6 lg:flex xl:hidden"
  //         >
  //           <span className="sr-only">{t('text-burger-menu')}</span>
  //           <div className="flex w-full flex-col space-y-1.5">
  //             <span className="h-0.5 w-1/2 rounded bg-gray-600 transition-all group-hover:w-full" />
  //             <span className="h-0.5 w-full rounded bg-gray-600 transition-all group-hover:w-3/4" />
  //             <span className="h-0.5 w-3/4 rounded bg-gray-600 transition-all group-hover:w-full" />
  //           </div>
  //         </motion.button>
  //         <div className="flex w-full items-center ltr:mr-auto rtl:ml-auto lg:w-auto">
  //           {/* <Logo className="mx-auto lg:mx-0" /> */}
  //           <Logo
  //             className={`${!isMultiLangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'
  //               }`}
  //           />
  //           {isMultiLangEnable ? (
  //             <div className="ltr:ml-auto rtl:mr-auto lg:hidden">
  //               <LanguageSwitcher />
  //             </div>
  //           ) : (
  //             ''
  //           )}

  //           <div className="hidden shrink-0 items-center space-x-7 ltr:ml-10 ltr:mr-auto rtl:mr-10 rtl:ml-auto rtl:space-x-reverse lg:flex 2xl:space-x-10" >
  //             <ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse xl:flex 2xl:space-x-10">
  //               <StaticMenu categories={undefined} />
  //             </ul>
  //           </div>
  //         </div>

  //         <div className='px-10 w-full '>
  //           {layout === 'compact' ? (
  //             <div className="relative w-full max-w-full rounded-full">
  //               <SearchWithSuggestion
  //                 label={'Search Product Name'}
  //                 variant="minimal"
  //                 inputClassName="block w-full rounded-full border border-slate-300 border-border-200 bg-gray-50 py-2 text-sm text-heading transition-[border] placeholder:text-gray-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-0 ltr:pl-12 rtl:pr-12 sm:text-sm sm:leading-6"
  //                 seeMore={true}
  //               />
  //             </div>
  //           ) : null}
  //         </div>

  //         {displayMobileHeaderSearch && (
  //           <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center space-x-4 border-b-accent-300 bg-light px-5 py-1.5 backdrop-blur ltr:left-0 rtl:right-0 rtl:space-x-reverse lg:border lg:bg-opacity-30">
  //             <SearchWithSuggestion
  //               label={t('text-search-label')}
  //               variant="minimal"
  //               className="lg:max-w-3xl"
  //               inputClassName="lg:border-accent-400"
  //               seeMore={true}
  //             />
  //             <Button
  //               variant="custom"
  //               onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
  //               className="hidden border border-accent-400 bg-gray-100 !px-4 text-accent lg:inline-flex"
  //             >
  //               <CloseIcon className="h-5 w-5" />
  //             </Button>
  //           </div>
  //         )}
  //         <div
  //           className="flex shrink-0 items-center space-x-4 rtl:space-x-reverse sm:space-x-6"  >
  //           <div
  //             className={cn(
  //               'hidden',
  //               layout === 'compact' ? 'lg:inline-flex' : 'sm:inline-flex',
  //             )} >
  //             <GroupsDropdownMenu variant="minimal" />
  //           </div>

  //           {/* {layout === 'compact' ? (
  //             <Button
  //               variant="custom"
  //               className="hidden h-[38px] w-[38px] items-center  gap-2 rounded-full border border-border-200 bg-light !p-1 text-sm !font-normal focus:!shadow-none focus:!ring-0 md:text-base lg:!flex"
  //               onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
  //             >
  //               <SearchIcon className="h-4 w-4" />
  //             </Button>
  //           ) : null} */}

  //           {isMultiLangEnable ? (
  //             <div className="ms-auto lg:me-5 xl:me-8 2xl:me-10 flex-shrink-0">
  //               <LanguageSwitcher />
  //             </div>
  //           ) : null}

  //           <CartCounterIconButton />

  //           <div className="flex items-center lg:space-x-4 rtl:lg:space-x-reverse">
  //             <div className="hidden lg:inline-flex">
  //               {isAuthorize ? <AuthorizedMenu /> : <JoinButton />}
  //             </div>
  //             {/* <Link
  //               href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
  //               variant="button"
  //               target="_blank"
  //             >
  //               {t('text-become-seller')}
  //             </Link> */}
  //           </div>
  //         </div>

  //       </div>
  //     </header>
  //   </>
  // );



  return (
    <>
      {width >= RESPONSIVE_WIDTH && underMaintenanceIsComing && !isScrolling ? (
        <>
          <Alert
            message={t('text-maintenance-mode-title')}
            variant="info"
            className="sticky top-0 left-0 z-50"
            childClassName="flex justify-center items-center w-full gap-4"
          >
            <CountdownTimer
              date={new Date(settings?.maintenance?.start as string)}
              className="text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600"
            />
          </Alert>
        </>
      ) : (
        ''
      )}
      <header
        id="site-header"
        ref={siteHeaderRef}
        className={cn(
          'site-header-with-search top-0 z-50 w-full transition-all shadow-lg',
          {
            '': isFlattenHeader,
            'sticky lg:fixed': isHomePage,
            'sticky border-b border-border-200 shadow-sm': !isHomePage,
            'lg:h-22': !underMaintenanceIsComing,
          },
        )}
      >
        {width >= RESPONSIVE_WIDTH &&
          underMaintenanceIsComing &&
          !isScrolling ? (
          <Alert
            message={t('text-maintenance-mode-title')}
            variant="info"
            className="sticky top-0 left-0 z-50"
            childClassName="flex justify-center items-center w-full gap-4"
          >
            <CountdownTimer
              date={new Date(settings?.maintenance?.start as string)}
              className="text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600"
            />
          </Alert>
        ) : (
          ''
        )}

        <div>
          <div
            className={cn(
              'flex w-full transform-gpu items-center justify-between bg-light px-5 transition-transform duration-300 lg:h-22 lg:px-6 2xl:px-8',
              {
                'lg:absolute lg:border-0 lg:bg-transparent lg:shadow-none':
                  isFlattenHeader,
                'lg:!bg-light': openDropdown,
              },
            )}
          >
            <motion.button
              onClick={() => handleSidebar('MAIN_MENU_VIEW')}
              className="group hidden h-full w-6 shrink-0 items-center justify-center focus:text-accent focus:outline-0 ltr:mr-6 rtl:ml-6 lg:flex xl:hidden"
            >
              <span className="sr-only">{t('text-burger-menu')}</span>
              <div className="flex w-full flex-col space-y-1.5">
                <span className="h-0.5 w-1/2 rounded bg-gray-600 transition-all group-hover:w-full" />
                <span className="h-0.5 w-full rounded bg-gray-600 transition-all group-hover:w-3/4" />
                <span className="h-0.5 w-3/4 rounded bg-gray-600 transition-all group-hover:w-full" />
              </div>
            </motion.button>
            {/* <div>
              <Image src={HeaderLogo} alt={''} height={20} width={100} sizes='(max-width: 768px) 100vw' />
            </div> */}
            <div>
               <Logo
                 className={`${
                   !isMultiLangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'
                 }`}
               />
             </div>
            {isMultiLangEnable ? (
              <div className="ltr:pr-4 rtl:pl-4 lg:hidden">
                <LanguageSwitcher />
              </div>
            ) : null}

            <div className="hidden ltr:ml-10 ltr:mr-auto rtl:mr-10 rtl:ml-auto xl:block">
              <GroupsDropdownMenu />
            </div>

            <div className='hidden shrink-0 items-center focus:text-[#009F7F] space-x-3 ltr:ml-5 ltr:mr-auto rtl:mr-10 rtl:ml-auto lg:flex  p-2 px-5 order border border-slate-300 flex flex-row rounded-full cursor-pointer' onClick={() => setOpenDropdown(!openDropdown)}>
              <MapPin className="w-[18px]" />
              <p className='hover:text-accent focus:text-accent'>Near Shop</p>
            </div>

            {width > 1000 &&
              <div className={`${width < 1500 ?
                "px-10 w-full bg-gray rounded-full" : 'px-44 w-full bg-gray rounded-full'}`}  >
                <div className="relative w-full  rounded-full">
                  <SearchWithSuggestion
                    label={'Search Product Name'}
                    variant="minimal"
                    inputClassName="block w-full rounded-full border-2 border-slate-400  bg-gray-50 py-2 text-sm text-heading transition-[border] placeholder:text-gray-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-0 ltr:pl-12 rtl:pr-12 sm:text-sm sm:leading-6"
                    seeMore={true}
                  />
                </div>
              </div>
            }
            {displayMobileHeaderSearch && (
              <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center space-x-4 border-b-accent-300 bg-light px-5 py-1.5 backdrop-blur ltr:left-0 rtl:right-0 rtl:space-x-reverse lg:border lg:bg-opacity-30">
                <SearchWithSuggestion
                  label={t('text-search-label')}
                  variant="minimal"
                  className="lg:max-w-3xl"
                  inputClassName="lg:border-accent-400"
                  seeMore={true}
                />
                <Button
                  variant="custom"
                  onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
                  className="hidden border border-accent-400 bg-gray-100 !px-4 text-accent lg:inline-flex"
                >
                  <CloseIcon className="h-5 w-5" />
                </Button>
              </div>
            )}

            <div
              className="flex shrink-0 items-center space-x-4 rtl:space-x-reverse sm:space-x-6">
              {width > 1000 ?
                <HeartOutlineIcon className="h-6 w-6 ltr:mr-1.5 rtl:ml-1.5 cursor-pointer" /> : null}

              <CartCounterIconButton />
              <div className="flex items-center lg:space-x-4 rtl:lg:space-x-reverse">
                <div className="hidden lg:inline-flex">
                  {isAuthorize ? <AuthorizedMenu /> : <JoinButton />}
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

    </>
  );
};

export default HeaderMinimal;
