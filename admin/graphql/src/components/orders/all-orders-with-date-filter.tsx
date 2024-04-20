import { useAllOrdersByDateSelectionQuery } from '@/graphql/orders.graphql';
import React, { memo, useEffect } from 'react';
import Loader from '../ui/loader/loader';
import OrderCard from './card';
import { Order } from '__generated__/__types__';
import { NetworkStatus } from '@apollo/client';
import Pagination from '../ui/pagination';
import ErrorMessage from '../ui/error-message';

const AllOrdersWithDateFilter = ({
  startDate,
  endDate,
  isDateValid,
}: {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  isDateValid: boolean;
}) => {
  const { data, error, loading, refetch, networkStatus } =
    useAllOrdersByDateSelectionQuery({
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    });

  if (error) return <ErrorMessage message={error.message} />;

  useEffect(() => {
    if (isDateValid)
      refetch({
        start_date: startDate != null ? startDate!.toString() : '',
        end_date: endDate != null ? endDate!.toString() : '',
      });
  }, [startDate, endDate, isDateValid]);

  const handlePagination = (current: any) => {
    refetch({
      start_date: startDate != null ? startDate!.toString() : '',
      end_date: endDate != null ? endDate!.toString() : '',
      page: current,
    });
  };

  return (
    <>
      {loading || networkStatus === NetworkStatus.refetch ? (
        <Loader showText={false} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data?.allOrdersByDateSelection?.data?.map((order) => (
              <OrderCard order={order as Order} key={order?.id} />
            ))}
          </div>
          {!!data?.allOrdersByDateSelection?.paginatorInfo?.total && (
            <div className="flex items-center justify-center py-3">
              <Pagination
                total={data?.allOrdersByDateSelection?.paginatorInfo?.total}
                current={
                  data?.allOrdersByDateSelection?.paginatorInfo?.currentPage
                }
                pageSize={
                  data?.allOrdersByDateSelection?.paginatorInfo?.perPage
                }
                onChange={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default memo(AllOrdersWithDateFilter);
