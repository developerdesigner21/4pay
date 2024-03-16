// import { BasketIcon } from '@/components/icons/summary/basket';
// import { ChecklistIcon } from '@/components/icons/summary/checklist';
// import { EaringIcon } from '@/components/icons/summary/earning';
// import { ShoppingIcon } from '@/components/icons/summary/shopping';
// import RecentOrders from '@/components/order/recent-orders';
// import PopularProductList from '@/components/product/popular-product-list';
// import Button from '@/components/ui/button';
// import ErrorMessage from '@/components/ui/error-message';
// import Loader from '@/components/ui/loader/loader';
// import ColumnChart from '@/components/widgets/column-chart';
// import StickerCard from '@/components/widgets/sticker-card';
// import WithdrawTable from '@/components/withdraw/withdraw-table';
// import cn from 'classnames';
// import { useAdminDashboardQuery } from '@/graphql/admin-dashboard-query.graphql';
// import usePrice from '@/utils/use-price';
// import { motion } from 'framer-motion';
// import { useTranslation } from 'next-i18next';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import Search from '@/components/common/search';
// import { useWithdrawsQuery } from '@/graphql/withdraws.graphql';
// import LowStockProduct from '@/components/product/product-stock';
// import { PaginatorInfo, WithdrawPaginator } from '__generated__/__types__';
// import PageHeading from '@/components/common/page-heading';

// const OrderStatusWidget = dynamic(
//   () => import('@/components/dashboard/widgets/box/widget-order-by-status')
// );
// const ProductCountByCategory = dynamic(
//   () =>
//     import(
//       '@/components/dashboard/widgets/table/widget-product-count-by-category'
//     )
// );

// const TopRatedProducts = dynamic(
//   () => import('@/components/dashboard/widgets/box/widget-top-rate-product')
// );
// export default function Dashboard() {
//   const { t } = useTranslation();
//   const { locale } = useRouter();
//           //@ts-ignore
//   const [searchTerm, setSearchTerm] = useState('');
//           //@ts-ignore
//   const [page, setPage] = useState(1);
//   const [activeTimeFrame, setActiveTimeFrame] = useState(1);

//   const { data, loading, error } = useAdminDashboardQuery({
//     variables: {
//       limit: 10,
//       language: locale,
//     },
//   });

//   const [orderDataRange, setOrderDataRange] = useState(
//     data?.analytics?.todayTotalOrderByStatus
//   );

//   const { data: withdraws, loading: withdrawLoading } = useWithdrawsQuery({
//     variables: {
//       first: 10,
//     },
//   });

//   const { price: total_revenue } = usePrice(
//     data && {
//       amount: data?.analytics?.totalRevenue!,
//     }
//   );
//       //@ts-ignore
//   const { price: todays_revenue } = usePrice(
//     data && {
//       amount: data?.analytics?.todaysRevenue!,
//     }
//   );

//   function handleSearch({ searchText }: { searchText: string }) {
//     setSearchTerm(searchText);
//     setPage(1);
//   }

//   function handlePagination(current: any) {
//     setPage(current);
//   }

//   const timeFrame = [
//     { name: t('text-today'), day: 1 },
//     { name: t('text-weekly'), day: 7 },
//     { name: t('text-monthly'), day: 30 },
//     { name: t('text-yearly'), day: 365 },
//   ];

//   useEffect(() => {
//     switch (activeTimeFrame) {
//       case 1:
//         setOrderDataRange(data?.analytics?.todayTotalOrderByStatus);
//         break;
//       case 7:
//         setOrderDataRange(data?.analytics?.weeklyTotalOrderByStatus);
//         break;
//       case 30:
//         setOrderDataRange(data?.analytics?.monthlyTotalOrderByStatus);
//         break;
//       case 365:
//         setOrderDataRange(data?.analytics?.yearlyTotalOrderByStatus);
//         break;

//       default:
//         setOrderDataRange(orderDataRange);
//         break;
//     }
//   });

//   if (loading || withdrawLoading) {
//     return <Loader text={t('common:text-loading')} />;
//   }

//   if (error) {
//     return <ErrorMessage message={error?.message} />;
//   }

//   let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);
//   if (!!data?.analytics?.totalYearSaleByMonth?.length) {
//     salesByYear = data.analytics.totalYearSaleByMonth.map((item: any) =>
//       item.total.toFixed(2)
//     );
//   }

//   return (
//     <div className="grid gap-7 md:gap-8 lg:grid-cols-2 2xl:grid-cols-12">
//       <div className="col-span-full rounded-lg bg-light p-6 md:p-8">
//         <div className="mb-5 flex items-center justify-between md:mb-7">
//           <PageHeading title={t('text-summary')} />
//         </div>

//         <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
//           <StickerCard
//             titleTransKey="sticker-card-title-rev"
//             subtitleTransKey="sticker-card-subtitle-rev"
//             icon={<EaringIcon className="h-8 w-8" />}
//             color="#1EAE98"
//             price={total_revenue}
//           />
//           <StickerCard
//             titleTransKey="sticker-card-title-order"
//             subtitleTransKey="sticker-card-subtitle-order"
//             icon={<ShoppingIcon className="h-8 w-8" />}
//             color="#865DFF"
//             price={data?.analytics?.totalOrders}
//           />
//           <StickerCard
//             titleTransKey="sticker-card-title-vendor"
//             icon={<ChecklistIcon className="h-8 w-8" />}
//             color="#D74EFF"
//             price={data?.analytics?.totalVendors}
//           />
//           <StickerCard
//             titleTransKey="sticker-card-title-total-shops"
//             icon={<BasketIcon className="h-8 w-8" />}
//             color="#E157A0"
//             price={data?.analytics?.totalShops}
//           />
//         </div>
//       </div>
//       <div className="col-span-full rounded-lg bg-light p-6 md:p-8">
//         <div className="mb-5 items-center justify-between sm:flex md:mb-7">
//           <PageHeading title={t('text-order-status')} />
//           <div className="mt-3.5 inline-flex rounded-full bg-gray-100/80 p-1.5 sm:mt-0">
//             {timeFrame
//               ? timeFrame.map((time) => (
//                   <div key={time.day} className="relative">
//                     <Button
//                       className={cn(
//                         '!focus:ring-0  relative z-10 !h-7 rounded-full !px-2.5 text-sm font-medium text-gray-500',
//                         time.day === activeTimeFrame ? 'text-accent' : ''
//                       )}
//                       type="button"
//                       onClick={() => setActiveTimeFrame(time.day)}
//                       variant="custom"
//                     >
//                       {time.name}
//                     </Button>
//                     {time.day === activeTimeFrame ? (
//                       <motion.div className="absolute bottom-0 left-0 right-0 z-0 h-full rounded-3xl bg-accent/10" />
//                     ) : null}
//                   </div>
//                 ))
//               : null}
//           </div>
//         </div>

//         <OrderStatusWidget
//           order={orderDataRange}
//           timeFrame={activeTimeFrame}
//           allowedStatus={[
//             'pending',
//             'processing',
//             'complete',
//             'cancel',
//             // 'out-for-delivery',
//           ]}
//         />
//       </div>

//       <RecentOrders
//         className="col-span-full"
//         //@ts-ignore
//         orders={data?.orders?.data!}
//         paginatorInfo={data?.orders?.paginatorInfo!}
//         title={t('table:recent-order-table-title')}
//         onPagination={handlePagination}
//         searchElement={
//           <Search
//             onSearch={handleSearch}
//             placeholderText={t('form:input-placeholder-search-name')}
//             className="hidden max-w-sm sm:inline-block [&button]:top-0.5"
//             inputClassName="!h-10"
//           />
//         }
//       />
//       <div className="lg:col-span-full 2xl:col-span-8">
//         <ColumnChart
//           widgetTitle={t('common:sale-history')}
//           colors={['#6073D4']}
//           series={salesByYear}
//           categories={[
//             t('common:january'),
//             t('common:february'),
//             t('common:march'),
//             t('common:april'),
//             t('common:may'),
//             t('common:june'),
//             t('common:july'),
//             t('common:august'),
//             t('common:september'),
//             t('common:october'),
//             t('common:november'),
//             t('common:december'),
//           ]}
//         />
//       </div>

//       <PopularProductList
//         //@ts-ignore
//         products={data?.popularProducts!}
//         title={t('table:popular-products-table-title')}
//         className="lg:col-span-1 lg:col-start-2 lg:row-start-5 2xl:col-span-4 2xl:col-start-auto 2xl:row-start-auto"
//       />

//       <LowStockProduct
//         // @ts-ignore
//         products={data?.lowStockProducts!}
//         title={'text-low-stock-products'}
//         paginatorInfo={withdraws?.withdraws?.paginatorInfo}
//         onPagination={handlePagination}
//         className="col-span-full"
//         searchElement={
//           <Search
//             onSearch={handleSearch}
//             placeholderText={t('form:input-placeholder-search-name')}
//             className="hidden max-w-sm sm:inline-block"
//             inputClassName="!h-10"
//           />
//         }
//       />

//       <TopRatedProducts
//         products={data?.topRatedProducts!}
//         title={'text-most-rated-products'}
//         className="lg:col-span-1 lg:col-start-1 lg:row-start-5 2xl:col-span-5 2xl:col-start-auto 2xl:row-start-auto 2xl:me-20"
//       />
//       <ProductCountByCategory
//         products={data?.categoryWiseProduct!}
//         title={'text-most-category-products'}
//         className="col-span-full 2xl:col-span-7 2xl:ltr:-ml-20 2xl:rtl:-mr-20"
//       />

//       <WithdrawTable
//         withdraws={withdraws?.withdraws as WithdrawPaginator}
//         paginatorInfo={withdraws?.withdraws?.paginatorInfo as PaginatorInfo}
//         onPagination={handlePagination}
//         title={t('table:withdraw-table-title')}
//         className="col-span-full"
//       />
//     </div>
//   );
// }


import { BasketIcon } from '@/components/icons/summary/basket';
import { ChecklistIcon } from '@/components/icons/summary/checklist';
import { EaringIcon } from '@/components/icons/summary/earning';
import { ShoppingIcon } from '@/components/icons/summary/shopping';
import RecentOrders from '@/components/order/recent-orders';
import PopularProductList from '@/components/product/popular-product-list';
import Button from '@/components/ui/button';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import ColumnChart from '@/components/widgets/column-chart';
import StickerCard from '@/components/widgets/sticker-card';
import WithdrawTable from '@/components/withdraw/withdraw-table';
import cn from 'classnames';
import { useAdminDashboardQuery, useDashboardDateSelectionViewMutation } from '@/graphql/admin-dashboard-query.graphql';
import usePrice from '@/utils/use-price';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Search from '@/components/common/search';
import { useWithdrawsQuery } from '@/graphql/withdraws.graphql';
import LowStockProduct from '@/components/product/product-stock';
import { PaginatorInfo, WithdrawPaginator } from '__generated__/__types__';
import PageHeading from '@/components/common/page-heading';
import Card from '../common/card';
import Chart from '@/components/ui/chart';
import { Table } from '@/components/ui/table';
import { NoDataFound } from '../icons/no-data-found';
import DonutChart from '../widgets/donut-chart';
import { DatePickerIcon } from '../icons/dashboard-header/datepicker-icon';
import { TimerIcon } from '../icons/dashboard-header/timer-icon';
import { DatePicker } from '../ui/date-picker';
import { useShopsQuery } from '@/graphql/shops.graphql';
import { useIsRTL } from '@/utils/locals';
import Pagination from '@/components/ui/pagination';
import dayjs from 'dayjs';
import { useDashboardOrderQuery } from '@/graphql/orders.graphql';



const OrderStatusWidget = dynamic(
  () => import('@/components/dashboard/widgets/box/widget-order-by-status')
);
const ProductCountByCategory = dynamic(
  () =>
    import(
      '@/components/dashboard/widgets/table/widget-product-count-by-category'
    )
);
const TopRatedProducts = dynamic(
  () => import('@/components/dashboard/widgets/box/widget-top-rate-product')
);
export default function Dashboard() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  //@ts-ignore
  const [searchTerm, setSearchTerm] = useState('');
  //@ts-ignore
  const [page, setPage] = useState(1);
  const [activeTimeFrame, setActiveTimeFrame] = useState(1);
  const { alignLeft, alignRight } = useIsRTL();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isActualizar, setIsActualizar] = useState(false);


  const startDateValue = dayjs(startDate).format('YYYY-MM-DD hh:mm:ss')
  const endDateValue = dayjs(endDate).format('YYYY-MM-DD hh:mm:ss')

  const { data, loading, error } = useAdminDashboardQuery({
    variables: {
      limit: 10,
      language: locale,
    },
  });

  const { data: ShopData, refetch } = useShopsQuery({
    variables: {
      first: 10,
      page: 1,
      sortedBy: 'DESC',
      orderBy: 'products_count',
      is_active: true,
    },
    fetchPolicy: 'network-only',
  });
  const { data: ChartData } = useShopsQuery({
    variables: {
      orderBy: 'products_count',
    }
  })

  const ChartListSeries = ChartData?.shops?.data
  const ShopList = ShopData?.shops?.data;
  const WebsiteList = ShopData?.shops?.data;
  const PaginationInfo = ShopData?.shops?.paginatorInfo


  // const TotalBalance = options.series?.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);

  const [orderDataRange, setOrderDataRange] = useState(
    data?.analytics?.todayTotalOrderByStatus
  );
  const [dashboardDateSelectionView, { data: DashboardSelection, loading: DashboardSelectionLoader }] = useDashboardDateSelectionViewMutation({});
  console.log("DashboardSelection", DashboardSelection);

  const { data: withdraws, loading: withdrawLoading } = useWithdrawsQuery({
    variables: {
      first: 10,
    },
  });
  const totalRevenueCount = DashboardSelection?.dashboardDateSelectionView?.totalRevenueCount;
  const totalOrdersCount = DashboardSelection?.dashboardDateSelectionView?.totalOrdersCount;
  const totalVendorsCount = DashboardSelection?.dashboardDateSelectionView?.totalVendorsCount;
  const totalShopCount = DashboardSelection?.dashboardDateSelectionView?.totalShopCount;
  const recentOrder = DashboardSelection?.dashboardDateSelectionView?.recentOrder;
  const shopList = DashboardSelection?.dashboardDateSelectionView?.shopList;
  const withdrawList = DashboardSelection?.dashboardDateSelectionView?.withdrawList;
  console.log("shopList", shopList);


  const options = {
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              },
            }
          }
        }
      }
    },
    series:
      // shopList?.map((item: any) => {
      //   return (
      //     item.balance.current_balance
      //   )
      // }),
      isActualizar === true ?
        shopList?.map((item: any) => {
          return (
            item?.balance?.current_balance
          )
        }) : ShopList?.map((item: any) => {
          return (
            item?.balance?.current_balance
          )
        })

  }

  const websiteOptions = {
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              },
            }
          }
        }
      }
    },

    series:
      isActualizar === true ?
        shopList?.map((item: any) => {
          return (
            item?.balance?.current_balance
          )
        }) : ShopList?.map((item: any) => {
          return (
            item?.balance?.current_balance
          )
        })
    // ChartListSeries?.map((item: any) => {
    //   return (
    //     item?.balance?.current_balance
    //   )
    // })
  }


  const { data: RecentOrder } = useDashboardOrderQuery({
    variables: {
      start_date: startDate,
      end_date: endDate
    },
  });

  const { price: total_revenue } = usePrice(
    data && {
      amount: data?.analytics?.totalRevenue!,
    }
  );
  //@ts-ignore
  const { price: todays_revenue } = usePrice(
    data && {
      amount: data?.analytics?.todaysRevenue!,
    }
  );

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  function onPagination(current: any) {
    refetch({
      text: `%${searchTerm}%`,
      page: current,
    });
  }

  const timeFrame = [
    { name: t('text-today'), day: 1 },
    { name: t('text-weekly'), day: 7 },
    { name: t('text-monthly'), day: 30 },
    { name: t('text-yearly'), day: 365 },
  ];

  useEffect(() => {
    switch (activeTimeFrame) {
      case 1:
        setOrderDataRange(data?.analytics?.todayTotalOrderByStatus);
        break;
      case 7:
        setOrderDataRange(data?.analytics?.weeklyTotalOrderByStatus);
        break;
      case 30:
        setOrderDataRange(data?.analytics?.monthlyTotalOrderByStatus);
        break;
      case 365:
        setOrderDataRange(data?.analytics?.yearlyTotalOrderByStatus);
        break;
      default:
        setOrderDataRange(orderDataRange);
        break;
    }
  });

  if (loading || withdrawLoading) {
    return <Loader text={t('common:text-loading')} />;
  }

  if (error) {
    return <ErrorMessage message={error?.message} />;
  }

  if (DashboardSelectionLoader) {
    return (
      <Loader text={t('common:text-loading')} />
    )
  }
  let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);
  if (!!data?.analytics?.totalYearSaleByMonth?.length) {
    salesByYear = data.analytics.totalYearSaleByMonth.map((item: any) =>
      item.total.toFixed(2)
    );
  }
  let columns = [
    {
      title: 'Stores',
      dataIndex: 'name',
      key: 'name',
      width: 130,
      align: alignLeft,
    },
    {
      title: 'Products',
      dataIndex: 'products_count',
      key: 'products_count',
      width: 130,
      align: 'center',


    },
    {
      title: 'All Orders',
      dataIndex: 'orders_count',
      key: 'orders_count',
      width: 130,
      align: 'center',


    },
    {
      title: 'Grows Sales',
      dataIndex: 'balance',
      key: 'total_earnings',
      width: 130,
      align: 'center',
      render: (balance: any) => (
        <div className="flex items-center">
          <div className="flex flex-col whitespace-nowrap font-medium ms-2">
            <span className="text-[13px] font-normal text-gray-500/80">
              {balance?.total_earnings}
            </span>
          </div>
        </div>
      ),

    },
    {
      title: 'CASH',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: () => {
        return (
          <p>$0</p>
        )
      }
    },
    {
      title: 'CARD',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: () => {
        return (
          <p>$0</p>
        )
      }
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'current_balance',
      width: 130,
      align: alignLeft,
      render: (balance: any) => (
        <div className="flex items-center">
          <div className="flex flex-col whitespace-nowrap font-medium ms-2">
            <span className="text-[13px] font-normal text-gray-500/80">
              {balance?.current_balance}
            </span>
          </div>
        </div>
      ),

    },

  ];

  let websitescolumns = [
    {
      title: 'Stores',
      dataIndex: 'name',
      key: 'name',
      width: 130,
      align: alignLeft,


    },
    {
      title: 'Products',
      dataIndex: 'products_count',
      key: 'products_count',
      width: 130,
      align: 'center',


    },
    {
      title: 'All Orders',
      dataIndex: 'orders_count',
      key: 'orders_count',
      width: 130,
      align: 'center',


    },
    {
      title: 'Grows Sales',
      dataIndex: 'balance',
      key: 'total_earnings',
      width: 130,
      align: 'center',
      render: (balance: any) => (
        <div className="flex items-center">
          <div className="flex flex-col whitespace-nowrap font-medium ms-2">
            <span className="text-[13px] font-normal text-gray-500/80">
              {balance?.total_earnings}
            </span>
          </div>
        </div>
      ),

    },
    {
      title: 'CASH',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: () => {
        return (
          <p>$0</p>
        )
      }
    },
    {
      title: 'CARD',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: () => {
        return (
          <p>$0</p>
        )
      }
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'current_balance',
      width: 130,
      align: alignLeft,
      render: (balance: any) => (
        <div className="flex items-center">
          <div className="flex flex-col whitespace-nowrap font-medium ms-2">
            <span className="text-[13px] font-normal text-gray-500/80">
              {balance?.current_balance}
            </span>
          </div>
        </div>
      ),

    },

  ];



  const handleStartDate = (e: any) => {
    setStartDate(e)
  }

  const handleEndDate = (e: any) => {
    setEndDate(e)
  }
  const handleSetData = () => {
    dashboardDateSelectionView({
      variables: {
        input: {
          startdate: startDateValue,
          enddate: endDateValue,
        }
      },
    });

    setIsActualizar(true);
  }

  return (
    <div className="grid gap-y-7 md:gap-x-0  lg:grid-cols-2 2xl:grid-cols-12">
      {/* <div className='flex flex-col lg:col-span-12  lg:flex-row justify-end lg:space-x-3 lg:space-y-0 space-y-3 '>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <DatePickerIcon />
          </div>
          <input type="date" onChange={(e) => handleStartDate(e)} className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
        </div>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <DatePickerIcon />
          </div>
          <input type="date" onChange={(e) => handleEndDate(e)} className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
        </div>
        <div className='relative max-w-sm bg-[#06B7A2] px-10 rounded-lg item-center cursor-pointer' onClick={() => handleSetData()}
        >
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <TimerIcon />
          </div>
          <p className='text-white p-2'>Actualizar</p>
        </div>
      </div> */}
      <div className='flex flex-col lg:col-span-12  lg:flex-row justify-end lg:space-x-3 lg:space-y-0 space-y-3'>
        <div className="relative w-48 ">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            onChange={handleStartDate}
            //@ts-ignore
            selected={startDate}
            selectsStart
            startDate={new Date()}
            className="border border-border-base w-48"
            placeholderText='Select Start Date'
          />
        </div>
        <div className="relative w-48 ">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            onChange={handleEndDate}
            //@ts-ignore
            selected={endDate}
            selectsStart
            startDate={new Date()}
            // className="border border-border-base"
            placeholderText='Select End Date'
          />
        </div>
        <div className='relative w-auto m-auto lg:m-0'>
          <Button
            onClick={() => handleSetData()}
            className="bg-blue-500 " >
            <p>Actualizar</p>
          </Button>
        </div>
      </div>
      <div className="col-span-full rounded-lg bg-light p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between md:mb-7">
          <PageHeading title={t('text-summary')} />
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StickerCard
            titleTransKey="sticker-card-title-rev"
            subtitleTransKey="sticker-card-subtitle-rev"
            icon={<EaringIcon className="h-8 w-8" />}
            color="#1EAE98"
            price={isActualizar === true ? totalRevenueCount : total_revenue}

          />
          < StickerCard
            titleTransKey="sticker-card-title-order"
            subtitleTransKey="sticker-card-subtitle-order"
            icon={<ShoppingIcon className="h-8 w-8" />}
            color="#865DFF"
            price={isActualizar === true ? totalOrdersCount : data?.analytics?.totalOrders}
          />
          <StickerCard
            titleTransKey="sticker-card-title-vendor"
            icon={<ChecklistIcon className="h-8 w-8" />}
            color="#D74EFF"
            price={isActualizar === true ? totalVendorsCount : data?.analytics?.totalVendors}
          />
          <StickerCard
            titleTransKey="sticker-card-title-total-shops"
            icon={<BasketIcon className="h-8 w-8" />}
            color="#E157A0"
            price={isActualizar === true ? totalShopCount : data?.analytics?.totalShops}
          />
        </div>
      </div>
      <div className="col-span-full rounded-lg bg-light p-6 md:p-8">
        <div className="mb-5 items-center justify-between sm:flex md:mb-7">
          <PageHeading title={t('text-order-status')} />
          <div className="mt-3.5 inline-flex rounded-full bg-gray-100/80 p-1.5 sm:mt-0">
            {timeFrame
              ? timeFrame.map((time) => (
                <div key={time.day} className="relative">
                  <Button
                    className={cn(
                      '!focus:ring-0  relative z-10 !h-7 rounded-full !px-2.5 text-sm font-medium text-gray-500',
                      time.day === activeTimeFrame ? 'text-accent' : ''
                    )}
                    type="button"
                    onClick={() => setActiveTimeFrame(time.day)}
                    variant="custom"
                  >
                    {time.name}
                  </Button>
                  {time.day === activeTimeFrame ? (
                    <motion.div className="absolute bottom-0 left-0 right-0 z-0 h-full rounded-3xl bg-accent/10" />
                  ) : null}
                </div>
              ))
              : null}
          </div>
        </div>

        <OrderStatusWidget
          order={orderDataRange}
          timeFrame={activeTimeFrame}
          allowedStatus={[
            'pending',
            'processing',
            'complete',
            'cancel',
            // 'out-for-delivery',
          ]}
        />
      </div>

      <RecentOrders
        className="col-span-full"
        //@ts-ignore
        orders={isActualizar === true ? RecentOrder?.dashboardOrder?.data : data?.orders?.data!}
        // RecentOrder?.dashboardOrder?.paginatorInfo

        paginatorInfo={isActualizar === true ? RecentOrder?.dashboardOrder?.paginatorInfo! : data?.orders?.paginatorInfo!}
        title={t('table:recent-order-table-title')}
        onPagination={handlePagination}
        searchElement={
          <Search
            onSearch={handleSearch}
            placeholderText={t('form:input-placeholder-search-name')}
            className="hidden max-w-sm sm:inline-block [&button]:top-0.5"
            inputClassName="!h-10"
          />
        }
      />
      <div className="lg:col-span-full 2xl:col-span-12">
        <ColumnChart
          widgetTitle={t('common:sale-history')}
          colors={['#6073D4']}
          series={salesByYear}
          categories={[
            t('common:january'),
            t('common:february'),
            t('common:march'),
            t('common:april'),
            t('common:may'),
            t('common:june'),
            t('common:july'),
            t('common:august'),
            t('common:september'),
            t('common:october'),
            t('common:november'),
            t('common:december'),
          ]}
        />
      </div>

      <div className='lg:col-span-full 2xl:col-span-12'>
        <div>
          <Card>
            <PageHeading title={'Store & Delivery Sales Summary'} className='text-center pb-5' />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-14'>
              <div >
                <Chart
                  options={options.options}
                  series={options.series}
                  width="90%"
                  type="donut"
                />
              </div>
              <div className='col-span-2 mb-6 overflow-hidden rounded pb-5'>
                <Table
                  // @ts-ignore   
                  columns={columns}
                  data={isActualizar === true ? shopList : ShopList}
                  rowKey="id"
                  scroll={{ x: 500 }}
                />
                {!!PaginationInfo?.total && (
                  <div className="flex items-center justify-end">
                    <Pagination
                      total={PaginationInfo.total}
                      current={PaginationInfo.currentPage}
                      pageSize={PaginationInfo.perPage}
                      onChange={onPagination}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className='lg:col-span-full 2xl:col-span-12'>
        <div>
          <Card>
            <PageHeading title={'Website Sales Summary'} className='text-center pb-5' />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-14'>
              <div className=''>
                <Chart
                  options={websiteOptions.options}
                  series={websiteOptions.series}
                  width="90%"
                  type="donut"
                />
              </div>
              <div className='col-span-2 mb-6 overflow-hidden rounded pb-5'>
                <Table
                  // @ts-ignore   
                  columns={websitescolumns}
                  data={WebsiteList}
                  rowKey="id"
                  scroll={{ x: 500 }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className='lg:col-span-full 2xl:col-span-12'>
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-14'>
            <div className=''>
              <TopRatedProducts
                products={data?.topRatedProducts!}
                title={'text-most-rated-products'}
              />
            </div>
            <div className=' mb-6 overflow-hidden rounded pb-5 h-full'>
              <PopularProductList
                //@ts-ignore
                products={data?.popularProducts!}
                title={t('table:popular-products-table-title')}
              />
            </div>
          </div>
        </div>
      </div>


      <LowStockProduct
        // @ts-ignore
        products={data?.lowStockProducts!}
        title={'text-low-stock-products'}
        paginatorInfo={withdraws?.withdraws?.paginatorInfo}
        onPagination={handlePagination}
        className="col-span-full"
        searchElement={
          <Search
            onSearch={handleSearch}
            placeholderText={t('form:input-placeholder-search-name')}
            className="hidden max-w-sm sm:inline-block"
            inputClassName="!h-10"
          />
        }
      />

      <ProductCountByCategory
        products={data?.categoryWiseProduct!}
        title={'text-most-category-products'}
        className="col-span-full 2xl:col-span-12 2xl:rtl:-mr-20"
      />

      <WithdrawTable
        withdraws={isActualizar === true ? withdrawList : withdraws?.withdraws as WithdrawPaginator}
        paginatorInfo={withdraws?.withdraws?.paginatorInfo as PaginatorInfo}
        onPagination={handlePagination}
        title={t('table:withdraw-table-title')}
        className="col-span-full"
      />
    </div>
  );
}
