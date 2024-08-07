// import { Table } from '@/components/ui/table';
// import ActionButtons from '@/components/common/action-buttons';
// import { useTranslation } from 'next-i18next';
// import { useIsRTL } from '@/utils/locals';
// import Pagination from '@/components/ui/pagination';
// import { UserPaginator, SortOrder } from '__generated__/__types__';
// import { useMemo, useState } from 'react';
// import debounce from 'lodash/debounce';
// import TitleWithSort from '@/components/ui/title-with-sort';
// import { NoDataFound } from '@/components/icons/no-data-found';
// import Badge from '@/components/ui/badge/badge';

// type IProps = {
//   staffs: UserPaginator | null | undefined;
//   onPagination: (current: number) => void;
//   refetch: Function;
// };

// const StaffList = ({ staffs, onPagination, refetch }: IProps) => {
//   const { t } = useTranslation();
//   const { alignLeft, alignRight } = useIsRTL();
//   const { data, paginatorInfo } = staffs!;

//   const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
//   const [column, setColumn] = useState<string>();

//   const debouncedHeaderClick = useMemo(
//     () =>
//       debounce((value) => {
//         setColumn(value);
//         setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
//         refetch({
//           sortedBy: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
//           orderBy: value,
//         });
//       }, 500),
//     [order]
//   );

//   const onHeaderClick = (value: string | undefined) => ({
//     onClick: () => {
//       debouncedHeaderClick(value);
//     },
//   });

//   const columns = [
//     {
//       title: (
//         <TitleWithSort
//           title={t('table:table-item-title')}
//           ascending={order === SortOrder.Asc && column === 'name'}
//           isActive={column === 'name'}
//         />
//       ),
//       className: 'cursor-pointer',
//       dataIndex: 'name',
//       key: 'name',
//       align: alignLeft,
//       onHeaderCell: () => onHeaderClick('name'),
//     },
//     {
//       title: t('table:table-item-email'),
//       dataIndex: 'email',
//       key: 'email',
//       align: alignLeft,
//     },
//     {
//       title: t('table:table-item-status'),
//       dataIndex: 'is_active',
//       key: 'is_active',
//       align: 'center',
//       render: (is_active: boolean) => (
//         <Badge
//           textKey={
//             is_active ? t('common:text-active') : t('common:text-inactive')
//           }
//           color={
//             is_active
//               ? 'bg-accent/10 !text-accent'
//               : 'bg-status-failed/10 text-status-failed'
//           }
//         />
//       ),
//     },
//     {
//       title: t('table:table-item-actions'),
//       dataIndex: 'id',
//       key: 'actions',
//       align: alignRight,
//       render: (id: string) => {
//         return <ActionButtons id={id} deleteModalView="DELETE_STAFF" />;
//       },
//     },
//   ];

//   return (
//     <>
//       <div className="mb-6 overflow-hidden rounded shadow">
//         <Table
//           // @ts-ignore
//           columns={columns}
//           emptyText={() => (
//             <div className="flex flex-col items-center py-7">
//               <NoDataFound className="w-52" />
//               <div className="mb-1 pt-6 text-base font-semibold text-heading">
//                 {t('table:empty-table-data')}
//               </div>
//               <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
//             </div>
//           )}
//           data={data!}
//           rowKey="id"
//           scroll={{ x: 800 }}
//         />
//       </div>
//       {!!paginatorInfo?.total && (
//         <div className="flex items-center justify-end">
//           <Pagination
//             total={paginatorInfo?.total}
//             current={paginatorInfo?.currentPage}
//             pageSize={paginatorInfo?.perPage}
//             onChange={onPagination}
//             showLessItems
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default StaffList;

import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import Pagination from '@/components/ui/pagination';
import {
  UserPaginator,
  SortOrder,
  Type,
  Permission,
} from '__generated__/__types__';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import TitleWithSort from '@/components/ui/title-with-sort';
import { NoDataFound } from '@/components/icons/no-data-found';
import Badge from '@/components/ui/badge/badge';
import LanguageSwitcher from '../ui/lang-action/action';
import { Routes } from '@/config/routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EditIcon } from '@/components/icons/edit';
import dayjs from 'dayjs';
import { string } from 'yup';
import React from 'react';
type IProps = {
  staffs: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
  refetch: Function;
};

const StaffList = ({ staffs, onPagination, refetch }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { data, paginatorInfo } = staffs!;
  console.log({ staffs });

  const { query } = useRouter();
  const {
    query: { shop },
  } = useRouter();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        refetch({
          sortedBy: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
          orderBy: value,
        });
      }, 500),
    [order]
  );

  const onHeaderClick = (value: string | undefined) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });

  // const columns = [
  //   {
  //     title: (
  //       <TitleWithSort
  //         title={t('table:table-item-title')}
  //         ascending={order === SortOrder.Asc && column === 'name'}
  //         isActive={column === 'name'}
  //       />
  //     ),
  //     className: 'cursor-pointer',
  //     dataIndex: 'name',
  //     key: 'name',
  //     align: alignLeft,
  //     onHeaderCell: () => onHeaderClick('name'),
  //   },
  //   {
  //     title: t('table:table-item-email'),
  //     dataIndex: 'email',
  //     key: 'email',
  //     align: alignLeft,
  //   },
  //   {
  //     title: t('table:table-item-status'),
  //     dataIndex: 'is_active',
  //     key: 'is_active',
  //     align: 'center',
  //     render: (is_active: boolean) => (
  //       <Badge
  //         textKey={
  //           is_active ? t('common:text-active') : t('common:text-inactive')
  //         }
  //         color={
  //           is_active
  //             ? 'bg-accent/10 !text-accent'
  //             : 'bg-status-failed/10 text-status-failed'
  //         }
  //       />
  //     ),
  //   },
  //   {
  //     title: t('table:table-item-actions'),
  //     dataIndex: 'id',
  //     key: 'actions',
  //     align: alignRight,
  //     render: (id: string) => {
  //       return <ActionButtons id={id} deleteModalView="DELETE_STAFF" />;
  //     },
  //   },
  // ];

  const columns = [
    {
      title: 'First Name',
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: 'Last Name',
      className: 'cursor-pointer',
      dataIndex: 'details',
      key: 'details',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (details: any) => {
        let data: any = {};
        try {
          if (details) {
            data = JSON.parse(details);
          }
          // console.log("data", data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        return <p>{data?.lastname}</p>;
      },
    },
    {
      title: 'Email',
      className: 'cursor-pointer',
      dataIndex: 'email',
      key: 'email',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: 'Date Of Birth',
      className: 'cursor-pointer',
      dataIndex: 'details',
      key: 'details',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (details: any) => {
        let data: any = {};
        try {
          if (details) {
            data = JSON.parse(details);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        const date = data ? dayjs(data.dob).format('YYYY-MM-DD') : '';
        return <p>{date}</p>;
      },
    },
    {
      title: 'Phone',
      className: 'cursor-pointer',
      dataIndex: 'details',
      key: 'details',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (details: any) => {
        let data: any = {};
        try {
          if (details) {
            data = JSON.parse(details);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        return <p>{data?.phone}</p>;
      },
    },
    {
      title: 'Job Type',
      className: 'cursor-pointer',
      dataIndex: 'details',
      key: 'details',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (details: any) => {
        let data: any = {};
        try {
          if (details) {
            data = JSON.parse(details);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }

        return <p>{data?.jobtype}</p>;
      },
    },
    {
      title: 'Salary',
      className: 'cursor-pointer',
      dataIndex: 'details',
      key: 'details',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (details: any) => {
        let data: any = {};
        try {
          if (details) {
            data = JSON.parse(details);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }

        return <p>{data?.salary}</p>;
      },
    },
    {
      title: 'Join Date',
      className: 'cursor-pointer',
      dataIndex: 'details',
      key: 'details',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (details: any) => {
        let data: any = {};
        try {
          if (details) {
            data = JSON.parse(details);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        const date = data ? dayjs(data.joinDate).format('YYYY-MM-DD') : '';
        return <p>{date}</p>;
      },
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'id',
      align: alignRight,
      render: (id: string, record: Permission.Staff) => {
        return (
          <LanguageSwitcher
            slug={id}
            record={record}
            deleteModalView="DELETE_STAFF"
            routes={Routes.user}
          />
        );
      },
    },
  ];

  return (
    <>
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
          data={data!}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default StaffList;
