import { LIMIT } from '@/utils/constants';
import { Order, PaginatorInfo } from '__generated__/__types__';
import ErrorMessage from '../ui/error-message';
import NotFound from '../ui/not-found';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Loader from '../ui/loader/loader';
import OrderCard from './card';
import { memo } from 'react';
import Button from '../ui/button';
import Pagination from '../ui/pagination';

interface Props {
  limit?: number;
  shopId?: string;
  gridClassName?: string;
  orders: Order[] | undefined;
  isLoading?: boolean;
  error?: any;
  loadMore?: any;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  className?: string;
  paginatorInfo: PaginatorInfo | undefined;
  handlePagination: (current: number) => void;
}

function Grid({
  className,
  orders,
  isLoading,
  error,
  loadMore,
  isLoadingMore,
  hasMore,
  limit = LIMIT,
  paginatorInfo,
  handlePagination,
}: Props) {
  if (error) return <ErrorMessage message={error.message} />;

  if (!isLoading && !orders?.length) {
    return (
      <div className="w-full min-h-full px-4 pt-6 pb-8 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }
  const { t } = useTranslation('common');

  return (
    <div className={cn('w-full', className)}>
      {isLoading && !orders?.length ? (
        <Loader showText={false} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {orders?.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
      )}
      {/* 
      {hasMore && (
        <div className="flex justify-center mt-8 mb-4 sm:mb-6 lg:mb-2 lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={loadMore}
            className="text-sm font-semibold h-11 md:text-base"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )} */}
      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={handlePagination}
          />
        </div>
      )}
    </div>
  );
}

export default Grid;
