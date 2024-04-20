import { useOrdersQuery } from '../orders.graphql';
import { NetworkStatus } from '@apollo/client';

export function useOrders({ variables }: { variables: any }) {
  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
    refetch,
  } = useOrdersQuery({
    variables: variables,
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
    orders: data?.orders?.data,
    paginatorInfo: data?.orders?.paginatorInfo,
    isLoading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.orders?.paginatorInfo?.hasMorePages),
    refetch,
  };
}
