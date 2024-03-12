import { AlignType, Table } from '@/components/ui/table';
import { NoDataFound } from '@/components/icons/no-data-found';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import Card from '@/components/common/card';
import Search from '@/components/common/search';
import { Attachment, Product, ProductAddtocartMutation, } from '__generated__/__types__';
import Image from 'next/image';
import { siteSettings } from '@/settings/site.settings';
import { useEffect, useState } from 'react';
import { useShopQuery } from '@/graphql/shops.graphql';
import shop from '@/components/layouts/shop';
import { useGenerateOrderExportUrlMutation, useOrdersQuery, useProductAddtocartMutation } from '@/graphql/orders.graphql';
import { LIMIT } from '@/utils/constants';
import router, { useRouter } from 'next/router';
import StatusColor from '@/components/order/status-color';
import Badge from '@/components/ui/badge/badge';
import Pagination from 'rc-pagination';
import { adminOnly } from '@/utils/auth-utils';
import Layout from '@/components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next';
import PageHeading from '@/components/common/page-heading';
import Loader from '@/components/ui/loader/loader';
import ActionButtons from '@/components/common/action-buttons';
import { Routes } from '@/config/routes';
import { AdminIcon } from '@/components/icons/admin-icon';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { toast } from 'react-toastify';
import { EyeIcon } from '@/components/icons/category/eyes-icon';
import { PushNotificationIcon } from '@/components/icons/category/notification-icon';
import Link from 'next/link';

export default function UserProfileDetail() {
    const { t } = useTranslation();
    const { alignLeft } = useIsRTL();
    const [generateOrderExportUrlMutation] = useGenerateOrderExportUrlMutation();
    const { openModal } = useModalAction();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: shopData } = useShopQuery({
        skip: !Boolean(shop),
        variables: {
            slug: shop as unknown as string,
        },
    });
    const { query } = useRouter();
    const router = useRouter();
    console.log("router", query)
    const shopId = shopData?.shop?.id!;
    const [productAddtocart, { data, loading }] = useProductAddtocartMutation({});
    useEffect(() => {
        productAddtocart({
            variables: {
                id: query.userSlug
            },
        });
    }, [])

    // function handlePagination(current: any) {
    //     refetch({
    //         tracking_number: `%${searchTerm}%`,
    //         page: current,
    //     });
    // }
    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
        // refetch({
        //     tracking_number: `%${searchText}%`,
        //     page: 1,
        // });
    }
    if (loading) return <Loader text={t('common:text-loading')} />;

    function handlePushNotification(id: any) {
        openModal('PUSH_NOTIFICATION', id);
    }
    const orderscolumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,

        },
        {
            title: 'Code',
            dataIndex: 'tracking_number',
            key: 'tracking_number',
            align: alignLeft,
            width: 200,

        },
        {
            title: 'Date',
            className: 'cursor-pointer',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
        },
        {
            title: 'Amount',
            className: 'cursor-pointer',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
            width: 120
        },
        {
            title: 'Delivery Status',
            dataIndex: 'order_status',
            key: 'order_status',
            align: 'center',
            render: (order_status: string) => (
                <Badge text={t(order_status)} color={StatusColor(order_status)} />
            ),
        },
        {
            title: 'Payment Status',
            dataIndex: 'payment_status',
            key: 'payment_status',
            align: 'center',
            render: (order_status: string) => (
                <Badge text={t(order_status)} color={StatusColor(order_status)} />
            ),
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,
            render: function Render(id: string,product:any) {
                let slugName = product.products[0].slug
                return (
                    <>
                        <div className='flex flex-row gap-5  '>
                            <ActionButtons
                                id={id}
                                detailsUrl={`${Routes.order.details(id)}`}
                            />
                            {/* <PushNotificationIcon onClick={() => handlePushNotification(id)} className='cursor-pointer' /> */}
                            <Link href={`/users/${query.userSlug}?slug=${slugName}`} onClick={() => handlePushNotification(id)}>
                                <PushNotificationIcon className='cursor-pointer' />
                            </Link>
                        </div>

                    </>
                )
            },
        },
    ];
    const wishlistcolumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: alignLeft,
            width: 150,
            render: (image: any) => {
                var imageFormatt = JSON.parse(image)
                return (
                    <Image
                        src={imageFormatt?.original ?? siteSettings.product.placeholder}
                        alt="alt text"
                        width={50}
                        height={50}
                    />
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: alignLeft,
            width: 150,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: alignLeft,
            width: 150,
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'date',
            align: alignLeft,
            width: 150,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,
            render: function Render(id: number, slug: any,) {
                const preview = `${process.env.NEXT_PUBLIC_SHOP_URL}/products/preview/${slug}`;
                let slugName = slug.slug
                return (
                    <>
                        <div className='flex flex-row gap-5  '>
                            {/* <ActionButtons
                                id={id}
                                detailsUrl={preview}
                                enablePreviewMode={true}
                            /> */}
                            {/* <PushNotificationIcon onClick={() => handlePushNotification(id)} className='cursor-pointer' /> */}
                            <Link href={`/users/${query.userSlug}/?slug=${slugName}`} onClick={() => handlePushNotification(id)}>
                                <PushNotificationIcon className='cursor-pointer' />
                            </Link>
                        </div>
                    </>
                )
            },
        },
    ]
    const addtocartcolumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: alignLeft,
            width: 150,
            render: (image: any) => {
                var imageFormatt = JSON.parse(image)
                return (
                    <Image
                        src={imageFormatt?.original ?? siteSettings.product.placeholder}
                        alt="alt text"
                        width={50}
                        height={50}
                    />
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: alignLeft,
            width: 150,

        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: alignLeft,
            width: 150,

        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            align: alignLeft,
            width: 150,

        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,
            render: function Render(id: any, slug: any,) {
                let slugName = slug.slug
                const preview = `${process.env.NEXT_PUBLIC_SHOP_URL}/products/preview/${slugName}`;
                return (
                    <>
                        <div className='flex flex-row gap-5  '>
                            <ActionButtons
                                id={id}
                                detailsUrl={preview}
                                enablePreviewMode={true}
                            />
                            {/* <PushNotificationIcon onClick={() => handlePushNotification(id)} className='cursor-pointer' /> */}
                            <Link href={`/users/${query.userSlug}/?slug=${slugName}`} onClick={() => handlePushNotification(id)}>
                                <PushNotificationIcon className='cursor-pointer' />
                            </Link>
                        </div>
                    </>
                )
            },
        },

    ]

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow-lg pb-5">
                <Card className="mb-8 flex flex-col">
                    <div className="flex w-full flex-col items-center md:flex-row">
                        <div className="mb-4 md:mb-0 md:w-1/4">
                            <PageHeading title='Your Order' />
                        </div>

                        <div className="flex w-full flex-col items-center md:w-3/4 md:flex-row">
                            <div className="flex w-full items-center">
                                <Search
                                    onSearch={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
                <Table
                    // @ts-ignore
                    columns={orderscolumns}
                    emptyText={() => (
                        <div className="flex flex-col items-center py-7">
                            <NoDataFound className="w-52" />
                            <div className="mb-1 pt-6 text-base font-semibold text-heading">
                                {t('table:empty-table-data')}
                            </div>
                            <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
                        </div>
                    )}
                    data={data?.productAddtocart?.order as any}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                />
                {/* {!!data?.orders?.paginatorInfo?.total && (
                    <div className="flex items-center justify-end">
                        <Pagination
                            total={data?.orders?.paginatorInfo?.total}
                            current={data?.orders?.paginatorInfo?.currentPage}
                            pageSize={data?.orders?.paginatorInfo?.perPage}
                            onChange={handlePagination}
                        />
                    </div>
                )} */}
            </div>

            <div className="mb-6 overflow-hidden rounded shadow-lg pb-5">
                <Card className="mb-8 flex flex-col">
                    <div className="flex w-full flex-col items-center md:flex-row">
                        <div className="mb-4 md:mb-0 md:w-1/4">
                            <PageHeading title='Your WishList' />
                        </div>

                        <div className="flex w-full flex-col items-center md:w-3/4 md:flex-row">
                            <div className="flex w-full items-center">
                                <Search
                                    onSearch={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
                <Table
                    // @ts-ignore
                    columns={wishlistcolumns}
                    emptyText={() => (
                        <div className="flex flex-col items-center py-7">
                            <NoDataFound className="w-52" />
                            <div className="mb-1 pt-6 text-base font-semibold text-heading">
                                {t('table:empty-table-data')}
                            </div>
                            <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
                        </div>
                    )}
                    data={data?.productAddtocart?.wishlist as any}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                />
                {/* {!!data?.productAddtocart?.wishlist && (
                    <div className="flex items-center justify-end">
                        <Pagination
                            total={data?.orders?.paginatorInfo?.total}
                            current={data?.orders?.paginatorInfo?.currentPage}
                            pageSize={data?.orders?.paginatorInfo?.perPage}
                            onChange={handlePagination}
                        />
                    </div>
                )} */}
            </div>

            <div className="mb-6 overflow-hidden rounded shadow-lg pb-5">
                <Card className="mb-8 flex flex-col">
                    <div className="flex w-full flex-col items-center md:flex-row">
                        <div className="mb-4 md:mb-0 md:w-1/4">
                            <PageHeading title='Your Cart' />
                        </div>

                        <div className="flex w-full flex-col items-center md:w-3/4 md:flex-row">
                            <div className="flex w-full items-center">
                                <Search
                                    onSearch={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
                <Table
                    // @ts-ignore
                    columns={addtocartcolumns}
                    emptyText={() => (
                        <div className="flex flex-col items-center py-7">
                            <NoDataFound className="w-52" />
                            <div className="mb-1 pt-6 text-base font-semibold text-heading">
                                {t('table:empty-table-data')}
                            </div>
                            <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
                        </div>
                    )}
                    data={data?.productAddtocart?.addtocart as any}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                />
                {/* {!!data?.productAddtocart?.wishlist && (
                    <div className="flex items-center justify-end">
                        <Pagination
                            total={data?.orders?.paginatorInfo?.total}
                            current={data?.orders?.paginatorInfo?.currentPage}
                            pageSize={data?.orders?.paginatorInfo?.perPage}
                            onChange={handlePagination}
                        />
                    </div>
                )} */}
            </div>
        </>
    )
}

UserProfileDetail.authenticate = {
    permissions: adminOnly,
};
UserProfileDetail.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
    },
});
export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: 'blocking' };
};




