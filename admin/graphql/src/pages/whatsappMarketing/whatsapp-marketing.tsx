import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import UsersList from '@/components/user/user-list';
import LinkButton from '@/components/ui/link-button';
import { useCustomersQuery } from '@/graphql/customers.graphql';
import { LIMIT } from '@/utils/constants';
import { useEffect, useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { QueryUsersOrderByColumn, SortOrder } from '__generated__/__types__';
import { Routes } from '@/config/routes';
import PageHeading from '@/components/common/page-heading';
import { Table } from '@/components/ui/table';
import { NoDataFound } from '@/components/icons/no-data-found';
import { useIsRTL } from '@/utils/locals';
import TitleWithSort from '@/components/ui/title-with-sort';
import Badge from '@/components/ui/badge/badge';
import { useMeQuery } from '@/graphql/me.graphql';
import ActionButtons from '@/components/common/action-buttons';
import { PushNotificationIcon } from '@/components/icons/category/notification-icon';
import Pagination from '@/components/ui/pagination';
import Link from 'next/link';
import { useModalAction } from '@/components/ui/modal/modal.context';

export default function WhatsappMarketingPage() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState<any>();
    console.log("userData", userData);
    const { alignLeft } = useIsRTL();
    const { openModal } = useModalAction();



    const { data, loading, error, refetch } = useCustomersQuery({
        variables: {
            first: LIMIT,
            page: 1,
            orderBy: [
                {
                    column: QueryUsersOrderByColumn.UpdatedAt,
                    order: SortOrder.Desc,
                },
            ],
        },
        fetchPolicy: 'network-only',
    });
    const UserList = data?.users?.data;
    const paginatorInfo = data?.users?.paginatorInfo
    console.log("data:-------------", UserList);
    // profile.contact
    // useEffect(() => {
    //     UserList?.map((item: any) => {
    //         setUserData(item);
    //     })
    // }, [UserList])

    if (loading) return <Loader text={t('common:text-loading')} />;
    if (error) return <ErrorMessage message={error.message} />;

    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
        refetch({
            text: `%${searchText}%`,
            page: 1,
        });
    }

    function handlePagination(current: any) {
        refetch({
            text: `%${searchTerm}%`,
            page: current,
        });
    }
    const handlePushNotification = (id: any) => {
        openModal('WHATSAPP_MARKETING', id);

        // WHATSAPP_MARKETING
        console.log("log", id)
    }

    const columns = [
        {
            title: t('table:table-item-id'),
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,
            render: (id: number) => `#${t('table:table-item-id')}: ${id}`,
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-title')} ascending={false} isActive={false}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'name',
            key: 'name',
            align: alignLeft,
            width: 250,
            ellipsis: true,
            render: (
                name: string,
                { profile, email }: { profile: any; email: string }
            ) => (
                <div className="flex items-center">
                    {/* <Avatar name={name} src={profile?.avatar?.thumbnail} /> */}
                    <div className="flex flex-col whitespace-nowrap font-medium ms-2">
                        {name}
                        <span className="text-[13px] font-normal text-gray-500/80">
                            {email}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: t('table:table-item-permissions'),
            dataIndex: 'permissions',
            key: 'permissions',
            align: alignLeft,
            width: 300,
            render: (permissions: any) => {
                return (
                    <div className="flex flex-wrap gap-1.5 whitespace-nowrap">
                        {permissions?.map(
                            ({ name, index }: { name: string; index: number }) => (
                                <span
                                    key={index}
                                    className="rounded bg-gray-200/50 px-2.5 py-1"
                                >
                                    {name}
                                </span>
                            )
                        )}
                    </div>
                );
            },
        },
        {
            title: t('table:table-item-available_wallet_points'),
            dataIndex: ['wallet', 'available_points'],
            key: 'available_wallet_points',
            align: 'center',
            width: 150,
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-status')} ascending={false} isActive={false}
                />
            ),
            width: 150,
            className: 'cursor-pointer',
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            render: (is_active: boolean) => (
                <Badge
                    textKey={
                        is_active ? t('common:text-active') : t('common:text-inactive')
                    }
                    color={
                        is_active
                            ? 'bg-accent/10 !text-accent'
                            : 'bg-status-failed/10 text-status-failed'
                    }
                />
            ),
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'left',
            width: 60,
            render: function Render(id: string, data: any, { is_active }: any) {
                const { data: currentUser } = useMeQuery();
                let contact: any = data?.profile?.contact;
                console.log("profile", contact);

                return (
                    <>
                        {currentUser?.me?.id !== id && (
                            // <ActionButtons
                            //     id={id}
                            //     userStatus={true}
                            //     isUserActive={is_active}
                            //     showAddWalletPoints={true}
                            //     showMakeAdminButton={true}
                            //     detailsUrl={`${Routes.user.details(id)}`}
                            // />
                            contact === null ? '' :
                                <Link onClick={() => handlePushNotification(id)} href={`/whatsappMarketing/whatsapp-marketing?phone=${contact}`}>
                                    <PushNotificationIcon className='cursor-pointer' />
                                </Link>
                        )
                        }
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <PageHeading title={'WhatsApp Marketing'} />
                </div>

                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
                    <Search
                        onSearch={handleSearch}
                        placeholderText={t('form:input-placeholder-search-name')}
                    />
                    {/* <LinkButton
                        href={`${Routes.user.create}`}
                        className="h-12 w-full md:w-auto md:ms-6"
                    >
                        <span>+ {t('form:button-label-add-user')}</span>
                    </LinkButton> */}
                </div>
            </Card>
            <div className="mb-6 overflow-hidden rounded shadow">
                <Table
                    // @ts-ignore
                    columns={columns}
                    emptyText={() => (
                        <div className="flex flex-col items-center py-7">
                            <NoDataFound className="w-52" />
                            <div className="mb-1 pt-6 text-base font-semibold text-heading">
                                {t('table:empty-table-data')}
                            </div>
                            <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
                        </div>
                    )}
                    data={UserList}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                />
            </div>

            {!!paginatorInfo?.total && (
                <div className="flex items-center justify-end">
                    <Pagination
                        total={paginatorInfo.total}
                        current={paginatorInfo.currentPage}
                        pageSize={paginatorInfo.perPage}
                        onChange={handlePagination}
                    />
                </div>
            )}

        </>
    );
}
WhatsappMarketingPage.authenticate = {
    permissions: adminOnly,
};
WhatsappMarketingPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
});
