import type { NextPageWithLayout } from '@/types';
import type { InferGetStaticPropsType } from 'next';
import { getLayout } from '@/components/layouts/layout';
import { AttributesProvider } from '@/components/products/details/attributes.context';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import ProductQuestions from '@/components/questions/product-questions';
import AverageRatings from '@/components/reviews/average-ratings';
import ProductReviews from '@/components/reviews/product-reviews';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';


import { getStaticPaths, getStaticProps } from '@/framework/product.ssr';
import FaqInformation from '@/components/custome/faq-information';
export { getStaticPaths, getStaticProps };
//FIXME: typescript and layout
const Details = dynamic(() => import('@/components/products/details/details'));
const BookDetails = dynamic(
  () => import('@/components/products/details/book-details')
);
const RelatedProducts = dynamic(
  () => import('@/components/products/details/related-products')
);
const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);

import { useProduct } from "@/framework/product";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProductPage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ product }: any) => {
  // const {query} = useRouter();
  // const { product:newproduct } = useProduct({slug:query.slug});
  // useEffect(()=>{
  //   console.log('product 01:',product);
  //   console.log('new product 01:',newproduct);
  // },[])

  const { width } = useWindowSize();
  return (
    <>
      <Seo
        title={product.name}
        url={product.slug}
        images={!isEmpty(product?.image) ? [product.image] : []}
      />
      <AttributesProvider>
        <div className="min-h-screen bg-light">
          {product.type?.slug === 'books' ? (
            <BookDetails product={product} />
          ) : (
            <>
              <Details product={product} />
              {/* <AverageRatings
                title={product?.name}
                ratingCount={product?.rating_count}
                totalReviews={product?.total_reviews}
                ratings={product?.ratings}
              /> */}

            </>
          )}

          <div className='grid grid-cols-1 lg:grid-cols-2  gap-4'>
            <div>
              <ProductReviews
                productId={product?.id}
                productType={product?.type?.slug}
              />
            </div>
            <div>
              <FaqInformation
                productId={product?.id}
                shopId={product?.shop?.id}
                productType={product?.type?.slug} />
            </div>
          </div>

          {/* <ProductReviews
            productId={product?.id}
            productType={product?.type?.slug}
          />
          <ProductQuestions
            productId={product?.id}
            shopId={product?.shop?.id}
            productType={product?.type?.slug}
          /> */}
          {product.type?.slug !== 'books' &&
            product?.related_products?.length > 1 && (
              <div className="p-5 lg:p-14 xl:p-16">
                <RelatedProducts
                  products={product.related_products}
                  currentProductId={product.id}
                  gridClassName="lg:grid-cols-4 2xl:grid-cols-6 !gap-3"
                />
              </div>
            )}
        </div>
        {width > 1023 && <CartCounterButton />}
      </AttributesProvider>
    </>
  );
};
ProductPage.getLayout = getLayout;
export default ProductPage;
