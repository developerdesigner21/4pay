import { useOrdersQuery } from '../orders.graphql';
import { NetworkStatus } from '@apollo/client';

export function useOrders() {
  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useOrdersQuery({
    variables: {
      first: 10,
      orderBy: 'updated_at',
      sortedBy: 'DESC',
    },
    notifyOnNetworkStatusChange: true,
  });

  function handleLoadMore() {
    if (data?.orders?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.orders?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }

  return {
    orders: data?.orders?.data ?? [],
    paginatorInfo: data?.orders?.paginatorInfo,
    isLoading,
    isFetching: networkStatus === NetworkStatus.refetch,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.orders?.paginatorInfo?.hasMorePages),
  };
}
