import Layout from '@/components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import Button from '@/components/ui/button';
import { DownloadIcon } from '@/components/icons/download-icon';
import Group1 from '@/assets/Group1.png';
import Group2 from '@/assets/Group2.png';
import Group3 from '@/assets/Group3.png';
import Image from 'next/image';
import { DatePicker } from '@/components/ui/date-picker';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AllOrders from '@/components/orders/all-orders';
import AllOrdersWithDateFilter from '@/components/orders/all-orders-with-date-filter';
import OrdersWithStatus from '@/components/orders/orders-with-status';
import OrdersWithStatusAndDateFilter from '@/components/orders/orders-with-date-filter';
import { ORDER_STATUS } from '@/utils/order-status';

export default function ShopOrderInfoPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startdate, setStartdate] = useState<string | null>();
  const [enddate, setEnddate] = useState<string | null>();
  const [isOrders, setOrders] = useState<boolean>(true);
  const [isOrdersWithFilter, setOrdersWithFilter] = useState<boolean>(false);
  const [isOrdersWithStatus, setOrdersWithStatus] = useState<boolean>(false);
  const [isOrdersWithStatusAndFilter, setOrdersWithStatusAndFilter] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('all');
  const [orderStatus, setOrderStaus] = useState<string>('all');
  const [isActualizar, setIsActualizar] = useState(false);
  const [isDateRangeValid, setDateRangeValid] = useState(true);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setOrderStaus(value);
  };

  useEffect(() => {
    if (isActualizar && isDateRangeValid) {
      if (orderStatus === 'all') {
        setOrders(false);
        setOrdersWithFilter(true);
        setOrdersWithStatus(false);
        setOrdersWithStatusAndFilter(false);
      } else {
        setOrders(false);
        setOrdersWithFilter(false);
        setOrdersWithStatus(false);
        setOrdersWithStatusAndFilter(true);
      }
    } else {
      if (!isDateRangeValid) return;
      if (orderStatus === 'all') {
        setOrders(true);
        setOrdersWithFilter(false);
        setOrdersWithStatus(false);
        setOrdersWithStatusAndFilter(false);
      } else {
        setOrders(false);
        setOrdersWithFilter(false);
        setOrdersWithStatus(true);
        setOrdersWithStatusAndFilter(false);
      }
    }
  }, [orderStatus, isActualizar, isDateRangeValid]);

  const handleStartDate = (e: Date | null) => {
    setDateRangeValid(false);
    if (e === null) {
      setStartdate(null);
    } else {
      setStartdate(
        dayjs(new Date(e.toISOString())).format('YYYY-MM-DD').toString()
      );
    }
  };

  const handleEndDate = (e: Date | null) => {
    setDateRangeValid(false);
    if (e === null) {
      setEnddate(null);
    } else {
      setEnddate(dayjs(new Date(e.toISOString())).format('YYYY-MM-DD'));
    }
  };

  const handleDateFilter = () => {
    if (startDate !== null && endDate !== null) {
      setDateRangeValid(true);
      setIsActualizar(true);
    } else if (startDate === null && endDate === null) {
      setDateRangeValid(true);
      setIsActualizar(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
        <div className="relative max-w-lg">
          <DatePicker
            //@ts-ignore
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(e) => {
              setStartDate(e), handleStartDate(e);
            }}
            selectsStart
            className="border border-border-base w-48"
            placeholderText="Select Start Date"
          />
        </div>
        <div className="relative max-w-lg">
          <DatePicker
            //@ts-ignore
            selected={endDate}
            dateFormat="dd/MM/yyyy"
            onChange={(e) => {
              setEndDate(e), handleEndDate(e);
            }}
            selectsStart
            placeholderText="Select End Date"
          />
        </div>

        <div className="flex flex-col md:flex-row lg:flex-row gap-5">
          <div className="relative w-auto m-auto lg:m-0">
            <Button className="bg-blue-500" onClick={() => handleDateFilter()}>
              <p>Actualizar</p>
            </Button>
          </div>

          <div className="relative w-auto m-auto  lg:m-0">
            <Button className="bg-blue-500">
              <DownloadIcon className="h-4 w-4 me-3" />
              <p>Download CSV</p>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 xl:grid-cols-6 2xl:grid-cols-9 -mx-2 pt-5">
        <button
          key="all-orders"
          className={`mx-2 px-4 py-2 my-1 rounded ${
            activeTab === 'all' ? 'bg-accent text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('all')}
        >
          All
        </button>
        {ORDER_STATUS.map((tab) => (
          <button
            key={tab.status}
            className={`mx-2 px-4 py-2 my-1 rounded ${
              activeTab === tab.status ? 'bg-accent text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleTabChange(tab.status)}
          >
            {tab.name.replace(/^Order\s/, '')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 py-5">
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row ">
            <div>
              <Image className=" max-w-xs mt-2 m-auto" src={Group1} alt={''} />
            </div>
            <div className="xl:pl-10 space-y-2">
              <div className="flex flex-row justify-between">
                <p className="text-sm">Order Rappi Cargo Ecommerce</p>
                <p className="text-black font-semibold">$3,668.00</p>
              </div>
              <div className="flex flex-row space-x-5">
                <p className="text-sm">Order Uber Daas Ecommerce</p>
                <p className="text-black font-semibold">$6,521.00</p>
              </div>
              <div className="flex flex-row space-x-5">
                <p className="text-sm">POS Store Sales</p>
                <p className="text-black font-semibold">$3,601.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row">
            <div>
              <Image
                className=" h-auto max-w-xs mt-2 m-auto "
                src={Group2}
                alt={''}
                width={67}
                height={3}
              />
            </div>
            <div className="xl:pl-10 space-y-2">
              <div className="flex flex-row justify-between">
                <p className="text-sm">Cash Rappi Cargo Ecommerce</p>
                <p className="text-black font-semibold">$3,668.00</p>
              </div>
              <div className="flex flex-row space-x-5">
                <p className="text-sm">Cash Uber Daas Ecommerce </p>
                <p className="text-black font-semibold">$6,521.00</p>
              </div>
              <div className="flex flex-row space-x-5">
                <p className="text-sm">POS Card payments</p>
                <p className="text-black font-semibold">$3,601.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row  ">
            <div>
              <Image
                className=" max-w-xs mt-2 m-auto "
                src={Group3}
                alt={''}
                // width={100}
                // height={3}
              />
            </div>
            <div className="xl:pl-10 space-y-2">
              <div className="flex flex-row justify-between">
                <p className="text-sm">CARD Rappi Cargo Ecommerce</p>
                <p className="text-black font-semibold">$3,668.00</p>
              </div>
              <div className="flex flex-row space-x-5">
                <p className="text-sm">CARD Uber Daas Ecommerce </p>
                <p className="text-black font-semibold">$6,561.00</p>
              </div>
              <div className="flex flex-row space-x-5">
                <p className="text-sm">Total Sales</p>
                <p className="text-black font-semibold">$65,561.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Orders */}
      {isOrders && <AllOrders />}
      {isOrdersWithFilter && (
        <AllOrdersWithDateFilter
          isDateValid={isDateRangeValid}
          startDate={startdate}
          endDate={enddate}
        />
      )}

      {/* Orders with status */}
      {isOrdersWithStatus && <OrdersWithStatus orderStatus={orderStatus} />}
      {isOrdersWithStatusAndFilter && (
        <OrdersWithStatusAndDateFilter
          orderStatus={orderStatus}
          startDate={startdate}
          endDate={enddate}
          isDateValid={isDateRangeValid}
        />
      )}
    </>
  );
}

ShopOrderInfoPage.authenticate = {
  permissions: adminOnly,
};
ShopOrderInfoPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
