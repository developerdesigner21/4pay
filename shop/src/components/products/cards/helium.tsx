// import { Image } from '@/components/ui/image';
// import cn from 'classnames';
// import usePrice from '@/lib/use-price';
// import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
// import { useTranslation } from 'next-i18next';
// import { useModalAction } from '@/components/ui/modal/modal.context';
// import { productPlaceholder } from '@/lib/placeholders';
// import CartIcon from '@/components/icons/cart';
// import { useRouter } from 'next/router';
// import { twMerge } from 'tailwind-merge';

// type HeliumProps = {
//   product: any;
//   className?: string;
// };

// const Helium: React.FC<HeliumProps> = ({ product, className }) => {
//   const { t } = useTranslation('common');
//   const { query } = useRouter();
//   const {
//     name,
//     image,
//     unit,
//     quantity,
//     min_price,
//     max_price,
//     product_type,
//     in_flash_sale,
//   } = product ?? {};

//   const { price, basePrice, discount } = usePrice({
//     amount: product.sale_price ? product.sale_price : product.price!,
//     baseAmount: product.price,
//   });
//   const { price: minPrice } = usePrice({
//     amount: min_price,
//   });
//   const { price: maxPrice } = usePrice({
//     amount: max_price,
//   });

//   const { openModal } = useModalAction();

//   function handleProductQuickView() {
//     return openModal('PRODUCT_DETAILS', product.slug);
//   }

//   return (
//     <article
//       className={twMerge(
//         cn(
//           'product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm',
//           className
//         )
//       )}
//     >
//       <div
//         onClick={handleProductQuickView}
//         className={cn(
//           'relative flex h-48 w-auto items-center justify-center sm:h-64',
//           query?.pages
//             ? query?.pages?.includes('medicine')
//               ? 'm-4 mb-0'
//               : ''
//             : ''
//         )}
//         // role="button"
//       >
//         <span className="sr-only">{t('text-product-image')}</span>
//         <Image
//           src={image?.original ?? productPlaceholder}
//           alt={name}
//           fill
//           sizes="(max-width: 768px) 100vw"
//           className="block object-contain product-image"
//         />
//         {discount && (
//           <div className="absolute top-3 rounded-full bg-yellow-500 px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
//             {discount}
//           </div>
//         )}
//       </div>
//       {/* End of product image */}

//       <header className="relative p-3 md:p-5 md:py-6">
//         <h3
//           onClick={handleProductQuickView}
//           role="button"
//           className="mb-2 text-sm font-semibold truncate text-heading"
//         >
//           {name}
//         </h3>
//         <p className="text-xs text-muted">{unit}</p>
//         {/* End of product info */}

//         <div className="relative flex items-center justify-between mt-7 min-h-6 md:mt-8">
//           {product_type.toLowerCase() === 'variable' ? (
//             <>
//               <div>
//                 <span className="text-sm font-semibold text-accent md:text-[15px]">
//                   {minPrice}
//                 </span>
//                 <span> - </span>
//                 <span className="text-sm font-semibold text-accent md:text-[15px]">
//                   {maxPrice}
//                 </span>
//               </div>

//               {Number(quantity) > 0 && (
//                 <button
//                   onClick={handleProductQuickView}
//                   className="flex items-center justify-center order-5 px-3 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4"
//                 >
//                   <CartIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
//                   <span>{t('text-cart')}</span>
//                 </button>
//               )}
//             </>
//           ) : (
//             <>
//               <div className="relative">
//                 {basePrice && (
//                   <del className="absolute text-xs italic text-opacity-75 -top-4 text-muted md:-top-5">
//                     {basePrice}
//                   </del>
//                 )}
//                 <span className="text-sm font-semibold text-accent md:text-base">
//                   {price}
//                 </span>
//               </div>

//               {Number(quantity) > 0 && (
//                 <AddToCart data={product} variant="single" />
//               )}
//             </>
//           )}

//           {Number(quantity) <= 0 && (
//             <div className="px-2 py-1 text-xs bg-red-500 rounded text-light">
//               {t('text-out-stock')}
//             </div>
//           )}
//           {/* End of product price */}
//         </div>
//       </header>
//     </article>
//   );
// };

// export default Helium;


import { Image } from '@/components/ui/image';
import cn from 'classnames';
import usePrice from '@/lib/use-price';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { productPlaceholder } from '@/lib/placeholders';
import CartIcon from '@/components/icons/cart';
// import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

import { EyeIcon } from '@/components/icons/category/eyes-icon';
import { Routes } from '@/config/routes';
import router, { useRouter } from 'next/router';
import Link from '@/components/ui/link';

import { useState } from 'react';


type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const [isDisplayViewButton, setIsDisplayViewButton] = useState(false);

  const { query } = useRouter();
  const {
    name,
    image,
    unit,
    quantity,
    min_price,
    max_price,
    product_type,
    in_flash_sale,
  } = product ?? {};


  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  });

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product.slug);
  }

  const navigate = (path: string) => {
    router.push(path);
    // closeModal();
  };


  const ManageViewButton = () => {
    console.log("dfbvdfh")
    setIsDisplayViewButton(true)
  }
  const RemoveViewButton = () => {
    setIsDisplayViewButton(false)
  }

  let productSlug = product.slug;
  function handleMoreInfoModal() {
    return openModal('VARIATION_POPUP', { productSlug });
  }

  // return (
  //   <article
  //     className={twMerge(
  //       cn(
  //         'product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm ',
  //         className
  //       )
  //     )}
  //     onMouseEnter={() => ManageViewButton()}
  //     onMouseLeave={() => RemoveViewButton()}
  //   >
  //     <div
  //       // onClick={handleProductQuickView}
  //       onClick={() => navigate(Routes.product(product.slug))}
  //       className={cn(
  //         'relative flex h-48 w-auto items-center justify-center sm:h-64',
  //         query?.pages
  //           ? query?.pages?.includes('medicine')
  //             ? 'm-4 mb-0'
  //             : ''
  //           : ''
  //       )}
  //       // role="button"
  //     >
  //       <span className="sr-only">{t('text-product-image')}</span>
  //       <Image
  //         src={image?.original ?? productPlaceholder}
  //         alt={name}
  //         fill
  //         sizes="(max-width: 768px) 100vw"
  //         className="block object-contain product-image cursor-pointer"
  //       />
  //       {discount && (
  //         <div className="absolute top-3 rounded-full bg-yellow-500 px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
  //           {discount}
  //         </div>
  //       )}
  //     </div>
  //     {/* End of product image */}

  //     <header className="relative p-3 md:p-3 md:py-6">
  //     {/* <div className='flex flex-row justify-between gap-5'> */}
  //       <h3
  //         // onClick={handleProductQuickView}
  //         onClick={() => navigate(Routes.product(product.slug))}
  //         role="button"
  //         className="mb-2 text-sm font-semibold truncate text-heading"
  //       >
  //         {name}
  //       </h3>
  //       {/* <button
  //           className="flex items-center justify-center order-5 gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4" onClick={handleProductQuickView} >
  //           <EyeIcon height={20} width={20} className='cursor-pointer' />
  //           <span>View</span>
  //       </button> */}
  //     {/* </div> */}
  //       <div className="flex justify-between">
  //         <p className="text-xs text-muted">{unit}</p>
  //         {/* End of product info */}
  //         {/* <div className='flex justify-end'>
  //           {isDisplayViewButton === true ?
  //             <button
  //               className="flex items-center justify-center order-5 gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4" onClick={handleProductQuickView} >
  //               <EyeIcon height={20} width={20} className='cursor-pointer' />
  //               <span>View</span>
  //             </button> :
  //             <button
  //               className=" invisible flex items-center justify-center order-5 gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4" onClick={handleProductQuickView} >
  //               <EyeIcon height={20} width={20} className='cursor-pointer' />
  //               <span>View</span>
  //             </button>
  //           }
  //         </div> */}
  //       </div>
  //       <div className="relative flex items-center justify-between mt-7 min-h-6 md:mt-8">
  //         {product_type.toLowerCase() === 'variable' ? (
  //           <>
  //             <div>
  //               <span className="text-sm font-semibold text-accent md:text-[15px]">
  //                 {minPrice}
  //               </span>
  //               <span> - </span>
  //               <span className="text-sm font-semibold text-accent md:text-[15px]">
  //                 {maxPrice}
  //               </span>
  //             </div>

  //             {/* {Number(quantity) > 0 && (
  //               <button
  //                 onClick={handleProductQuickView}
  //                 className="flex items-center justify-center order-5 px-3 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4"
  //               >
  //                 <CartIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
  //                 <span>{t('text-cart')}</span>
  //               </button>
  //             )} */}
  //           </>
  //         ) : (
  //           <>
  //             <div className="relative">
  //               {/* {basePrice && (
  //                 <del className="absolute text-xs italic text-opacity-75 -top-4 text-muted md:-top-5">
  //                   {basePrice}
  //                 </del>
  //               )} */}
  //               <span className="text-sm font-semibold text-accent md:text-base">
  //                 {price}
  //               </span>
  //             </div>

  //             {/* {Number(quantity) > 0 && (
  //               <AddToCart data={product} variant="single" />
  //             )} */}
  //           </>
  //         )}

  //         {Number(quantity) <= 0 && (
  //           <div className="px-2 py-1 text-xs bg-red-500 rounded text-light">
  //             {t('text-out-stock')}
  //           </div>
  //         )}
  //         {/* End of product price */}
  //       </div>
  //       <div className='flex justify-between mt-5'>
  //         <div>
  //           {isDisplayViewButton === true ?
  //             <button
  //               className="flex items-center justify-center order-5 gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4" onClick={handleProductQuickView} >
  //               <EyeIcon height={20} width={20} className='cursor-pointer' />
  //               <span>View</span>
  //             </button> :
  //             <button
  //               className="invisible flex items-center justify-center order-5 gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4" onClick={handleProductQuickView} >
  //               <EyeIcon height={20} width={20} className='cursor-pointer' />
  //               <span>View</span>
  //             </button>
  //           }
  //         </div>
  //         <div>
  //           <AddToCart data={product} variant="single" />
  //         </div>
  //       </div>
  //     </header>
  //   </article>
  // );

  return (
    <article
      className={twMerge(
        cn(
          'product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm',
          className
        )
      )}
      onMouseEnter={() => ManageViewButton()}
      onMouseLeave={() => RemoveViewButton()}
    >
      <Link
        href={Routes.product(product.slug)}
        // onClick={handleProductQuickView}
        className={cn(
          'relative flex h-48 w-auto items-center justify-center sm:h-64',
          query?.pages
            ? query?.pages?.includes('medicine')
              ? 'm-4 mb-0'
              : ''
            : ''
        )}
      // role="button" 
      >
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={image.original ?? productPlaceholder}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw"
          className="block object-fit product-image cursor-pointer"
        />
        {discount && (
          <div className="absolute top-3 rounded-full bg-yellow-500 px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
            {discount}
          </div>
        )}

      </Link>
      {/* End of product image */}

      <header className="relative ">
        {/* <div className='flex flex-row justify-between gap-5'> */}
        <Link href={Routes.product(product.slug)}>

          <h3
            // onClick={() => navigate(Routes.product(product.slug))}
            role="button"
            className=" text-sm font-semibold truncate text-heading px-3 md:px-3 pt-3"
          >{name}</h3>
          {/* 
          <div>
            <p className="text-xs text-muted px-3 md:px-3 ">{unit}</p>
          </div> */}

          <div className="min-h-6 px-3 md:px-3 mt-2">
            {product_type.toLowerCase() === 'variable' ? (
              <>
                <div>
                  <span className="text-sm font-semibold text-accent md:text-[15px] items-center">
                    {minPrice}
                  </span>
                  <span> - </span>
                  <span className="text-sm font-semibold text-accent md:text-[15px] items-center">
                    {maxPrice}
                  </span>
                </div>

                {/* {Number(quantity) > 0 && (
                <button
                  // onClick={handleProductQuickView}
                  className="flex items-center justify-center order-5 px-3 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4"
                >
                  <CartIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                  <span>{t('text-cart')}</span>
                </button>
              )} */}
              </>
            ) : (
              <>
                <div className="flex ">
                  <div>
                    <span className="text-sm font-semibold text-accent md:text-base">
                      {price}
                    </span>
                  </div>
                  <div className='ml-2 text-sm mt-0.5'>
                    {basePrice && (
                      <del className=" text-muted ">
                        {basePrice}
                      </del>
                    )}
                  </div>
                </div>

                {/* {Number(quantity) > 0 && (
                <AddToCart data={product} variant="single" />
              )} */}
              </>
            )}

            {Number(quantity) <= 0 && (
              <div className="px-2 py-1 text-xs bg-red-500 rounded text-light">
                {t('text-out-stock')}
              </div>
            )}
          </div>
        </Link>

        {/* <div className='flex  mb-4 justify-between px-1 md:px-1 xl:px-3 '>
        <div>
          {isDisplayViewButton === true ?
            <button
              className="flex items-center justify-center order-5 gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start px-3 " onClick={handleProductQuickView} >
              <EyeIcon height={20} width={20} className='cursor-pointer' />
              <span>View</span>
            </button> :
            <button
              className="invisible  flex items-center justify-center order-5 gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start px-3 " onClick={handleProductQuickView} >
              <EyeIcon height={20} width={20} className='cursor-pointer' />
              <span>View</span>
            </button>
          }
        </div>
       
         <div>
          {product?.product_type === "VARIABLE" ?
            <button
              onClick={handleMoreInfoModal}
              className="flex items-center justify-center order-5 px-3 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4"
            >
              <CartIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              <span>cart</span>
            </button> :
            <AddToCart data={product} variant="single" />
          }
        </div>
      </div> */}

        <div className='grid grid-cols-2 px-3 mb-5'>
          <div className='grid justify-items-start'>
            {isDisplayViewButton === true ?
              window.innerWidth < 400 ?
                <button
                  className="flex items-center justify-center  gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start px-3 " onClick={handleProductQuickView} >
                  <EyeIcon height={20} width={20} className='cursor-pointer' />
                </button> :
                <button
                  className="flex items-center justify-center  gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start px-3 " onClick={handleProductQuickView} >
                  <EyeIcon height={20} width={20} className='cursor-pointer' />
                  <span>View</span>
                </button>
              : <button
                className=" invisible flex items-center justify-center  gap-x-2 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start px-3 " onClick={handleProductQuickView} >
                <EyeIcon height={20} width={20} className='cursor-pointer' />
              </button>}
          </div>
          <div className='grid justify-items-end'>
            {product?.product_type === "variable" ?
              <button
                onClick={handleMoreInfoModal}
                className="flex items-center justify-center order-5 px-3 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full border-border-100 bg-light text-accent hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4"
              >
                <CartIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                <span>cart</span>
              </button> :
              <AddToCart data={product} variant="single" />
            }
          </div>
        </div>

      </header>
    </article>
  )

};

export default Helium;
