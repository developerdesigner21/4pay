import { useCategoriesQuery } from '@/graphql/categories.graphql';
import rangeMap from '@/utils/range-map';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';

type Props = {
  onCategoryFilter: (category: any) => void;
};

const CategoryFilter = ({ onCategoryFilter }: Props) => {
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState<string>();
  const {
    data: categoryData,
    loading: categoryLoading,
    refetch: categoryRefetch,
  } = useCategoriesQuery({
    variables: {
      language: locale,
      first: 999,
      page: 1,
    },
    fetchPolicy: 'network-only',
  });
  return (
    <>
      <div className="w-full flex flex-row justify-between mr-4 gap-2">
        {categoryLoading ? (
          rangeMap(10, (i) => (
            <ContentLoader
              key={i}
              speed={2}
              width={'100%'}
              height={75}
              viewBox="0 0 75 75"
              backgroundColor="#e0e0e0"
              foregroundColor="#cecece"
            >
              <rect x="0" y="0" rx="6" ry="6" width="100%" height="75" />
            </ContentLoader>
          ))
        ) : (
          <>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-2">
              {categoryData?.categories?.data?.map((cat) => (
                <button
                  key={cat.id}
                  className={cn(
                    'p-3 rounded cursor-pointer',
                    activeTab === cat.id ? 'bg-accent' : ''
                  )}
                  onClick={() => {
                    onCategoryFilter(cat);
                    setActiveTab(cat.id);
                  }}
                >
                  {cat.image ? (
                    <Image
                      src={cat?.image?.original!}
                      className="relative cursor-pointer h-100 w-100"
                      alt="cat-image"
                      height={75}
                      width={75}
                    />
                  ) : (
                    cat.name
                  )}
                </button>
              ))}
            </div>
            {categoryData?.categories?.data?.length && (
              <button
                className={cn(
                  'whitespace-nowrap text-base font-semibold text-accent',
                  activeTab ? 'cursor-pointer' : 'opacity-30 cursor-default'
                )}
                onClick={() => {
                  onCategoryFilter(''), setActiveTab('');
                }}
                disabled={!activeTab}
              >
                Clear
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CategoryFilter;
