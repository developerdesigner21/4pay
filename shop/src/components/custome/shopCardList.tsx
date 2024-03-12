import { Image } from '@/components/ui/image';
import { MapPin } from '@/components/icons/map-pin';
import { useTranslation } from 'next-i18next';
import { formatAddress } from '@/lib/format-address';
import { Routes } from '@/config/routes';
import Link from '@/components/ui/link';
import isEmpty from 'lodash/isEmpty';
import { productPlaceholder } from '@/lib/placeholders';

type ShopCardProps = {
    shop: any;
};

const ShopCardList: React.FC<ShopCardProps> = ({ shop }) => {
    const { t } = useTranslation();
    const isNew = false;
    console.log("shop", shop)
    console.log("Routes", Routes)

    return (
        <Link href={Routes.shop(shop.slug)}>
            <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),_0_1px_2px_rgba(0,0,0,0.06)]">
                <div className="relative z-10">
                    {isNew && (
                        <span className="absolute px-2 py-1 text-xs bg-blue-500 rounded top-2 text-light ltr:right-2 rtl:left-2">
                            {t('common:text-new')}
                        </span>
                    )}
                    <div className="relative flex h-[170px] w-full max-w-full shrink-0 items-center justify-center overflow-hidden bg-gray-300">
                        <Image
                            alt={t('common:text-logo')}
                            src={shop?.cover_image?.original}
                            fill
                            sizes="(max-width: 768px) 100vw"
                            className="transition-transform transform-gpu group-hover:scale-110"
                        />
                    </div>
                    <div className="absolute inset-0 bg-overlay"></div>
                    {shop?.distance && (
                        <div className="absolute top-2.5 right-2.5 rounded-md bg-black/50 py-2 px-2.5 text-white backdrop-blur">
                            {shop?.distance?.toFixed(2)}km Away
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 px-4 pt-3 pb-5">
                    <div className="z-10 flex gap-4 bottom-5 left-5">
                        <div className="relative z-20 -mt-10 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-solid border-white shadow-md">
                            <Image
                                alt={t('common:text-logo')}
                                src={shop?.logo?.thumbnail ?? productPlaceholder}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg -mt-2 font-bold text-heading group-hover:text-accent">
                                {shop?.name}
                            </h4>
                        </div>
                    </div>
                    <div>
                        <span className="flex text-xs text-body">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-500 ltr:mr-1 rtl:ml-1" />
                            {!isEmpty(formatAddress(shop?.address))
                                ? formatAddress(shop?.address)
                                : t('common:text-no-address')}
                        </span>
                    </div>
                </div>

                {/* <div className="flex items-center gap-3 px-4 pt-3 pb-5">
                <div className="z-10 flex gap-4 bottom-5 left-5">
                    <div className="relative z-20 -mt-14 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-solid border-white shadow-md">
                        <Image
                            alt={t('common:text-logo')}
                            src={shop?.logo?.thumbnail ?? productPlaceholder}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-heading group-hover:text-accent">
                            {shop?.name}
                        </h4>

                        <span className="flex text-xs text-body">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-500 ltr:mr-1 rtl:ml-1" />
                            {!isEmpty(formatAddress(shop?.address))
                                ? formatAddress(shop?.address)
                                : t('common:text-no-address')}
                        </span>
                    </div>
                </div>
            </div> */}
            </div>
        </Link>
    )

}
export default ShopCardList;


