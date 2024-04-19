import { useDateSelectionAllOrdersMutation } from '@/graphql/orders.graphql';
import React, { memo, useEffect } from 'react';
import Loader from '../ui/loader/loader';
import Image from 'next/image';
import icon from '@/assets/Frame (1).png';
import icon2 from '@/assets/Vector.png';

const status: Record<string, string> = {
  'order-pending': 'Pending',
  'order-processing': 'Processing',
  'order-completed': 'Completed',
  'order-cancelled': 'Cancelled',
  'order-refunded': 'Refunded',
  'order-failed': 'Failed',
  'order-out-for-delivery': 'Out For Delivery',
  'order-at-local-facility': 'Local Facility',
};

const AllOrdersWithDateFilter = ({
  startDate,
  endDate,
  isDateValid,
}: {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  isDateValid: boolean;
}) => {
  const [dateSelectionAllFn, { data, loading }] =
    useDateSelectionAllOrdersMutation({ fetchPolicy: 'network-only' });

  useEffect(() => {
    if (isDateValid)
      dateSelectionAllFn({
        variables: {
          input: {
            startdate: startDate != null ? startDate!.toString() : '',
            enddate: endDate != null ? endDate!.toString() : '',
          },
        },
      });
  }, [startDate, endDate, isDateValid]);

  return (
    <>
      {loading ? (
        <Loader showText={false} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data?.dateSelectionAllOrders?.map((order) => (
            <div
              key={order?.id + '' + order?.created_at}
              className="bg-[#009F7F1A] p-5 rounded-lg"
            >
              <div className="flex justify-center items-center uppercase">
                {/* <Avatar name={'SM'} /> */}
                <p className="text-2xl font-semibold">{order?.customer_name}</p>
                {/* <MoreIcon className="h-4" /> */}
              </div>
              <div className="flex justify-around pt-5">
                {order?.customer_id && (
                  <p className="text-sm">{order?.customer_id}</p>
                )}

                <p className="text-sm">{order?.created_at}</p>
              </div>
              <div>
                <p className="text-black font-semibold text-base border-b-2 border-[#DCDCDC] py-5 text-center">
                  {order?.tracking_number}
                </p>
                {order?.order_status && (
                  <p className="text-[#175B46] font-semibold border-b-2 border-[#DCDCDC] py-3 text-center">
                    {status[order?.order_status]}
                  </p>
                )}

                <div className="flex flex-row border-b-2 border-[#DCDCDC] py-3 justify-between">
                  <p className="text-sm">Order Type:</p>
                  <div className="flex flex-row space-x-3">
                    <Image src={icon} alt={''} />
                    <p className="text-sm">Envío ASAP</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 border-[#DCDCDC] py-3">
                  <p className="text-sm">Preparation Time:</p>
                  <p className="text-sm">1min</p>
                </div>

                {order?.products && order?.products?.length > 0 && (
                  <div className="border-b-2 border-[#DCDCDC] ">
                    <div className="flex flex-col gap-3 bg-white rounded-lg my-5 p-5">
                      {order?.products?.map((product, index) => (
                        <p
                          key={
                            index +
                            product?.id! +
                            order?.created_at +
                            order?.tracking_number
                          }
                          className="text-sm"
                        >
                          {product?.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1 border-b-2 border-[#DCDCDC] ">
                  <div className="flex flex-row justify-between">
                    <p className="font-semibold text-sm">Amount</p>
                    <p className="font-semibold">{order?.amount}$</p>
                  </div>
                  <div className="flex flex-row justify-between ">
                    <p className="font-semibold text-sm">Tax</p>
                    <p className="font-semibold">{order?.sales_tax}$</p>
                  </div>
                  <div className="flex flex-row justify-between ">
                    <p className="font-semibold text-sm">Total</p>
                    <p className="font-semibold">{order?.total}$</p>
                  </div>
                  <div className="flex flex-row justify-between ">
                    <p className="font-semibold text-sm">Paid Total</p>
                    <p className="font-semibold">{order?.paid_total}$</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between py-3">
                  <p className="text-sm">Payment Status</p>
                  <p className="text-sm">{order?.payment_status}</p>
                </div>
                <div className="py-3">
                  <div className="space-y-3">
                    <p className="font-semibold">Customer</p>
                    <p className="w-full p-2 text-sm bg-white">
                      {order?.customer_name}
                    </p>
                    <p className="w-full p-2 text-sm bg-white">
                      {order?.customer_contact}
                    </p>
                  </div>

                  <div className="relative max-w-2xl bg-white flex flex-row my-5 p-5 border-dashed border-2 border-black justify-center ">
                    <Image src={icon2} alt={''} />
                    <p className="px-3"> Ver ruta</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(AllOrdersWithDateFilter);
