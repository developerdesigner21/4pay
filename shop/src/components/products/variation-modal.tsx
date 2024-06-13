import { useMemo } from 'react';
import { getVariations } from '@/lib/get-variations';
import { isVariationSelected } from '@/lib/is-variation-selected';
import VariationGroups from './details/variation-groups';
import VariationPrice from './details/variation-price';
import isEqual from 'lodash/isEqual';
import pimage from '@/assets/category-img.png';
import Image from 'next/image';
import {
  AttributesProvider,
  useAttributes,
} from '@/components/products/details/attributes.context';
import { AddToCart } from './add-to-cart/add-to-cart';
import { useProduct } from '@/framework/product';
import Spinner from '../ui/loaders/spinner/spinner';

interface Props {
  product: any;
}

const Variation = ({ product }: Props) => {
  return (
    <div className="w-[95vw] max-w-xl rounded-md bg-white p-4 h-[75vh] overflow-auto">
      <h3 className="mb-2 text-center text-2xl font-semibold text-heading">
        {product?.name}
      </h3>
      <div className="">
        {product?.variation_options?.map((item: any, i: number) => {
          return (
            <>
              <div className="flex items-center border-b border-solid border-border-200 border-opacity-75 px-4 py-4 text-sm sm:px-6 ">
                <div className="relative mx-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-gray-100 sm:h-16 sm:w-16">
                  <Image
                    src={item?.image[0]?.original}
                    alt={item.name}
                    width={75}
                    height={75}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-heading">{item.title} </h3>
                  <p className="my-2.5 font-semibold text-accent">
                    ${item.price}
                  </p>
                </div>
                <div className="ltr:ml-auto rtl:mr-auto">
                  <AddToCart data={product} variation={item} variant="single" />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

const ProductVariation = ({ product }: { product: any }) => {
  if (!product)
    return (
      <div className="relative flex items-center justify-center h-96 w-96 bg-light">
        <Spinner />
      </div>
    );
  return (
    <AttributesProvider>
      <Variation product={product} />
    </AttributesProvider>
  );
};

export default ProductVariation;
