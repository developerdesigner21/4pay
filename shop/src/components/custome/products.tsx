import ProductCard from '@/components/products/cards/card';
import SectionBlock from '@/components/ui/section-block';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { useState } from 'react';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { ArrowNext, ArrowPrev } from '@/components/icons';
import { Product } from '@/types';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import { productPlaceholder } from '@/lib/placeholders';

import { useRef } from 'react';
import { useIsRTL } from '@/lib/locals';
import { ArrowNextIcon } from '../icons/arrow-next';
import { ArrowPrevIcon } from '../icons/arrow-prev';

interface Props {
    className?: string;
    limit?: number;
    variables: any;
    title?: string;
}

export default function CustomeProductGrid({
    className,
    limit = 10,
    variables,
    title,
}: Props) {
    const { t } = useTranslation('common');
    const [productlist, setProductList] = useState(variables)
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const { isRTL } = useIsRTL();
    const offerSliderBreakpoints = {
        320: {
            slidesPerView: 2,
            spaceBetween: 16,
        },
        580: {
            slidesPerView: 2,
            spaceBetween: 16,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 16,
        },
        1280:{
            slidesPerView: 6,
            spaceBetween: 24,
        },
        1920: {
            slidesPerView: 5,
            spaceBetween: 24,
        },
    };
    return (
        <div className="relative px-10">
            <div className='my-7 flex items-center justify-between '>
                <h3 className="text-2xl font-semibold lg:text-[27px] 3xl:text-3xl">{title}</h3>
            </div>
            <Swiper
                // id="handPicked_products"
                breakpoints={offerSliderBreakpoints}
                modules={[Navigation]}
                spaceBetween={30}

                navigation={{
                    // nextEl: '.next',
                    // prevEl: '.prev',
                    prevEl: prevRef.current!,
                    nextEl: nextRef.current!,
                }}
            >
                {productlist.map((productitem: any) => (
                    <SwiperSlide key={productitem?.id}>
                        <ProductCard product={productitem} />
                    </SwiperSlide>
                ))}

            </Swiper>
            <div
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
            </div>
        </div>

    );
}