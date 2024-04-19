import { useOrders } from '@/graphql/query/order';
import React from 'react';

type Props = {};

const OrdersGridHome = (props: Props) => {
  const { orders, hasMore, loadMore, isLoading, isLoadingMore } = useOrders();
  return <div>OrdersGridHome</div>;
};

export default OrdersGridHome;
