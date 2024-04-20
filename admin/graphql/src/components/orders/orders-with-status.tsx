import React, { memo, useEffect } from 'react';
import { useOrdersByStatusQuery } from '@/graphql/orders.graphql';
import Loader from '../ui/loader/loader';
import OrderCard from './card';
import { Order } from '__generated__/__types__';
import { NetworkStatus } from '@apollo/client';
import Pagination from '../ui/pagination';
import ErrorMessage from '../ui/error-message';

const OrdersWithStatus = ({ orderStatus }: { orderStatus: string }) => {
  const { data, error, loading, refetch, networkStatus } =
    useOrdersByStatusQuery({
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    });

  if (error) return <ErrorMessage message={error.message} />;

  useEffect(() => {
    refetch({
      status: orderStatus,
    });
  }, [orderStatus]);

  const handlePagination = (current: any) => {
    refetch({
      status: orderStatus,
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
            {data?.ordersByStatus?.data?.map((order) => (
              <OrderCard order={order as Order} key={order?.id} />
            ))}
          </div>
          {!!data?.ordersByStatus?.paginatorInfo?.total && (
            <div className="flex items-center justify-center py-3">
              <Pagination
                total={data?.ordersByStatus?.paginatorInfo?.total}
                current={data?.ordersByStatus?.paginatorInfo?.currentPage}
                pageSize={data?.ordersByStatus?.paginatorInfo?.perPage}
                onChange={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default memo(OrdersWithStatus);
