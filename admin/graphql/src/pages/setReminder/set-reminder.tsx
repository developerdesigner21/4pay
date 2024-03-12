import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import { useCustomersQuery } from '@/graphql/customers.graphql';
import { LIMIT } from '@/utils/constants';
import { useState, useRef } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { QueryUsersOrderByColumn, SortOrder } from '__generated__/__types__';
import PageHeading from '@/components/common/page-heading';
import { Table } from '@/components/ui/table';
import { NoDataFound } from '@/components/icons/no-data-found';
import { useIsRTL } from '@/utils/locals';
import TitleWithSort from '@/components/ui/title-with-sort';
import Badge from '@/components/ui/badge/badge';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Dialog, Transition } from '@headlessui/react'
import Pagination from '@/components/ui/pagination';
import CustomerBanView from './reminderView';
import { PushNotificationIcon } from '@/components/icons/category/notification-icon';
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function SetReminderPage() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const { alignLeft } = useIsRTL();
    const { openModal } = useModalAction();
    const { query } = useRouter()


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
    function handlePushNotification(id: any) {
        openModal('REMINDER', id);
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
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            align: alignLeft,
            width: 150,
            render: function Render(id: string) {

                return (
                    <>
                        <div className='flex flex-row gap-5'>
                            <Link href={`/setReminder/set-reminder?id=${id}`} onClick={() => handlePushNotification(id)}>
                                <PushNotificationIcon className='cursor-pointer' />
                            </Link>
                        </div>
                    </>
                )
            },
        },
    ];

    return (
        <>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <PageHeading title={'Set Reminder'} />
                </div>

                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
                    <Search
                        onSearch={handleSearch}
                        placeholderText={t('form:input-placeholder-search-name')}
                    />

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
SetReminderPage.authenticate = {
    permissions: adminOnly,
};
SetReminderPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
});
