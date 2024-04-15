import { FilterIcon } from '@/components/icons/filter-icon';
// import MobileNavigation from '@/components/layouts/mobile-navigation';
import HomeGeneralLayout from '@/components/layouts/_home';
import GeneralLayout from '@/components/layouts/_general';
import { Grid } from '@/components/products/grid';
import SearchCount from '@/components/search-view/search-count';
import SidebarFilter from '@/components/search-view/sidebar-filter';
import Sorting from '@/components/search-view/sorting';
import ErrorMessage from '@/components/ui/error-message';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { useProducts } from '@/framework/product';
import { drawerAtom } from '@/store/drawer-atom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import StickyBox from 'react-sticky-box';

import dynamic from 'next/dynamic';
import { Product } from '@/types';
import useLayout from '@/lib/hooks/use-layout';

const MobileNavigation = dynamic(
  () => import('@/components/layouts/mobile-navigation'),
  {
    ssr: false,
  },
);

export { getServerSideProps } from '@/framework/search.ssr';

export default function SearchPage() {
  const { t } = useTranslation('common');
  const [_, setDrawerView] = useAtom(drawerAtom);
  const { query } = useRouter();
  const { searchType, ...restQuery }: any = query;
  const {
    products,
    isLoading,
    paginatorInfo,
    error,
    loadMore,
    isLoadingMore,
    hasMore,
  } = useProducts({
    limit: PRODUCTS_PER_PAGE,
    orderBy: 'created_at',
    sortedBy: 'DESC',
    ...(query?.category && { categories: query?.category }),
    ...(searchType && { type: searchType }),
    ...restQuery,
  });

  const { layout } = useLayout();

  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-between gap-5 mb-7 lg:flex-row-reverse">
        {/* //FIXME: */}
        <div className="flex items-center justify-between w-full lg:w-fit">
          <motion.button
            className="flex lg:hidden items-center rounded border border-border-200 bg-gray-100 bg-opacity-90 py-1 px-3 text-sm font-semibold text-heading transition-colors duration-200 hover:border-accent-hover hover:bg-accent hover:text-light focus:border-accent-hover focus:bg-accent focus:text-light focus:outline-0 md:h-10 md:py-1.5 md:px-4 md:text-base"
            whileTap={{ scale: 0.88 }}
            onClick={() =>
              setDrawerView({
                display: true,
                view: 'SEARCH_FILTER',
              })
            }
            style={{ height: '45px' }}
          >
            <FilterIcon
              width="17.05"
              height="18"
              className="ltr:mr-2 rtl:ml-2"
            />
            {t('text-filter')}
          </motion.button>
          <Sorting variant="dropdown" />
        </div>
        <SearchCount
          from={paginatorInfo?.firstItem ?? 0}
          to={paginatorInfo?.lastItem ?? 0}
          total={
            //@ts-ignore
            paginatorInfo?.total ?? 0
          }
        />
      </div>
      <Grid
        products={products as Product[] | undefined}
        loadMore={loadMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        error={error}
        column={layout === 'compact' ? 'five' : 'six'}
      />
    </div>
  );
}

const GetLayout = (page: React.ReactElement) => {
  return (
    <HomeGeneralLayout layout="compact">
      <>
        <div className="w-full bg-light">
          <div className="flex flex-col lg:flex-row w-full min-h-screen p-5 lg:px-5 lg:py-10 mx-auto max-w-1920 rtl:space-x-reverse lg:space-x-10 xl:py-14 xl:px-16">
            <div className="w-full hidden lg:block lg:w-80">
              <StickyBox offsetTop={140} offsetBottom={30}>
                <SidebarFilter />
              </StickyBox>
            </div>
            {page}
          </div>
        </div>
      </>
    </HomeGeneralLayout>
  );
};

SearchPage.getLayout = GetLayout;
