

import { getVariations } from '@/lib/get-variations';
import { useEffect, useMemo, useState } from "react";
import VariationGroups from "../details/variation-groups";
import { useAttributes } from '../details/attributes.context';
import { AddToCartAlt } from '../add-to-cart/add-to-cart-alt';
import { CloseIcon } from '@/components/icons/close-icon';
import { useModalAction } from '@/components/ui/modal/modal.context';
import Image from "next/image";
import { AddToCart } from '../add-to-cart/add-to-cart';
import { isVariationSelected } from '@/lib/is-variation-selected';
import isEqual from 'lodash/isEqual';
import pimage from '@/assets/category-img.png'
import Checkbox from '@/components/ui/forms/checkbox/checkbox';
import { useProduct } from '@/framework/product';
import Spinner from '@/components/ui/loaders/spinner/spinner';



const VariationPopup = (productData: any) => {
    console.log("productData",productData);
    
    let slugValue = productData.product;
    const { product, isLoading } = useProduct({ slug: slugValue });

    const productItem: any = product;
    console.log("productItem", productItem);

    const { closeModal } = useModalAction();
    const [isAttributeName, setIsAttributeName] = useState<any>();
    const [attributes, setIsAtrribute] = useState<any>({});
    const [isTestVariation, setISTestVariation] = useState();
    console.log("attributes:---------", isAttributeName,attributes);


    const variations = useMemo(
        () => getVariations(product?.variations),
        [product?.variations]
    );
    console.log("variations",variations);
    

    const handleSelectVariation = (variationValue: any) => {
        console.log("variationValue",variationValue);
        // setIsAttributeName(variationValue.options[0].name);
        // variationValue.product?.variations.map((item:any) => {
        //      return (
        //      setIsAttributeName(item.attribute.slug)
        //      )
        // })
        setIsAtrribute({
            g8 : variationValue.title
        })
    };

    const isSelected: any = isVariationSelected(variations, attributes.test);
    let selectedVariation: any = {};

    selectedVariation = productItem?.variation_options.find((o: any) => {
        console.log("o-----------",o);
        // console.log("sel-------- ",isEqual(o.options.map((v: any) => v.value).sort(), Object.values(attributes).sort()))  
                
        return (
            isEqual(o.options.map((v: any) => v.value).sort(), Object.values(attributes).sort())
        )
    });


    console.log("selectedVariation",selectedVariation);

   
    if (isLoading) {
        return <Spinner showText={false} />;
    }

    
    return (
        <>
            <div className="m-auto w-full  rounded-md bg-light p-4 pb-6 sm:w-full md:rounded-xl bg-zinc-100	">
                <div className="h-full w-full text-center">
                    <div className="flex h-full flex-col justify-between">
                        <div className="flex flex-row justify-between">
                            <p className=" text-xl font-bold text-heading">{product?.name}</p>
                            <div onClick={closeModal} className="cursor-pointer mt-2">
                                <CloseIcon className="h-4 w-4" />
                            </div>
                        </div>
                        {/* Image, Variation name, 2X100, $Amount, cart button */}

                        {/* {productItem?.variations.map((item: any) => {
                            console.log("item", item);

                            return (
                                <div className="mt-8 flex  w-full max-w-auto items-center justify-between space-x-4 rtl:space-x-reverse">
                                    <div className="flex flex-col space-y-3">
                                        <div className="grid grid-cols-6 gap-0 bg-[white] p-3 rounded-md">
                                            <div>
                                                <Image src={pimage} alt={''} className="h-10 w-10" />
                                            </div>
                                            <div>
                                                <span>
                                                    {item.value}
                                                </span>
                                            </div>
                                            <div>
                                                <span>200</span>
                                            </div>
                                            <div>
                                                <span>2 x 100</span>
                                            </div>
                                            <div>
                                                <button onClick={() => handleSelectVariation(item)}>
                                                    Select Variation
                                                </button>
                                            </div>
                                            <div>
                                                <AddToCartAlt
                                                    data={productItem}
                                                    variant="bordered"
                                                    variation={selectedVariation}
                                                // disabled={selectedVariation?.is_disable || !isSelected}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })} */}
                        {/* {productItem?.variations.map((variations: any) => {
                            console.log("variation", variations);

                            return (
                                productItem.variation_options.map((variation_options: any) => {
                                    console.log("variation_options", variation_options);
                                    return (
                                        <div className="mt-8 flex  w-full max-w-auto items-center justify-between space-x-4 rtl:space-x-reverse">
                                            <div className="flex flex-col space-y-3">
                                                <div className="grid grid-cols-5 gap-6 bg-[white] p-3 rounded-md">

                                                    <div>
                                                        <Image src={pimage} alt={''} height={20} width={20} />
                                                    </div>
                                                    <div>{variation_options.title}</div>
                                                    <div>{variation_options.quantity}</div>
                                                    <div onClick={() => handleSelectVariation(variation_options)} >{variation_options.price}</div>
                                                    <div className='bg-[gray]' >
                                                        <AddToCartAlt
                                                            data={productItem}
                                                            variant="bordered"
                                                            variation={selectedVariation}
                                                        // disabled={selectedVariation?.is_disable || !isSelected}
                                                        />
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        })} */}

                        {productItem?.variation_options.map((item: any) => {
                            console.log("item:-----------------", item)
                           
                            return (
                                <>
                                    <div className="mt-8 flex  w-full max-w-[1520px] items-center justify-between ">
                                        <div className="flex flex-col space-y-3">
                                            <div className="grid grid-cols-6  bg-[white] p-3 rounded-md">
                                                <div>
                                                    <Image  src={item.image[0].original}  alt={''} height={50} width={60} />
                                                </div>
                                                <div className='text-sm'> {item.title}</div>
                                                <div>1 x {item.quantity}</div>
                                                <div>{item.price}</div>
                                                <div
                                                    role="button"
                                                    onClick={() => handleSelectVariation(item)}
                                                    className='cursor-pointer whitespace-nowrap items-center w-24 rounded border-border-200 bg-accent hover:bg-accent active:bg-accent focus:outline-none focus:ring focus:ring-violet-300 px-2 py-2 text-sm text-heading transition-colors'>
                                                    <p className='mt-2 text-white'>Add</p> 
                                                </div>
                                                <div className='' onClick={closeModal} >
                                                    <AddToCartAlt
                                                        data={productItem}
                                                        variant="bordered"
                                                        variation={selectedVariation}
                                                    // disabled={selectedVariation?.is_disable || !isSelected}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        
                    </div>
                </div>
            </div >
        </>

    )
}
export default VariationPopup;
