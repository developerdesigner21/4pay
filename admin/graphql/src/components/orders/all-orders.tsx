import React from 'react';
import { useOrders } from '@/graphql/query/order';
import { Grid } from './grid';
import { LIMIT } from '@/utils/constants';

const AllOrders = () => {
  const { orders, hasMore, loadMore, isLoading, isLoadingMore, error } =
    useOrders();

  const orderItems: any = orders;
  return (
    <Grid
      orders={orderItems}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      limit={LIMIT}
    />
  );
};

export default AllOrders;
