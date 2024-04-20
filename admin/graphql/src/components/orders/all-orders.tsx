import React from 'react';
import { useOrdersQuery } from '@/graphql/orders.graphql';
import OrderCard from './card';
import { Order } from '__generated__/__types__';
import Loader from '../ui/loader/loader';
import Pagination from '../ui/pagination';
import ErrorMessage from '../ui/error-message';

const AllOrders = () => {
  const { data, loading, error, refetch } = useOrdersQuery({
    variables: {
      first: 10,
      orderBy: 'updated_at',
      sortedBy: 'DESC',
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message={error.message} />;

  const handlePagination = (current: any) => {
    refetch({
      page: current,
    });
  };

  return (
    <>
      {loading || !data?.orders?.data?.length ? (
        <Loader showText={false} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data?.orders?.data?.map((order) => (
              <OrderCard order={order as Order} key={order.id} />
            ))}
          </div>
          {!!data?.orders?.paginatorInfo?.total && (
            <div className="flex items-center justify-center py-3">
              <Pagination
                total={data?.orders?.paginatorInfo?.total}
                current={data?.orders?.paginatorInfo?.currentPage}
                pageSize={data?.orders?.paginatorInfo?.perPage}
                onChange={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllOrders;
