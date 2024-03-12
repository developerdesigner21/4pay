import { useFAQs } from '@/framework/faqs';
import { LIMIT_HUNDRED } from "@/lib/constants";
import ErrorMessage from "../ui/error-message";
import NotFound from '@/components/ui/not-found';
import FAQ from "../faq/faq";
import ProductQuestions from '../questions/product-questions';

type ProductQuestionsProps = {
    className?: any;
    productId: string;
    shopId: string;
    productType?: string;
};

const FaqInformation: React.FC<ProductQuestionsProps> = ({
    productId,
    shopId,
    productType,
}) => {
    const { faqs, isLoading, error } = useFAQs({
        faq_type: 'global',
        issued_by: 'Super Admin',
        limit: LIMIT_HUNDRED,
    });
    console.log("faqs", faqs.length)

    if (error) return <ErrorMessage message={error.message} />;

    return (

        <div className='px-10'>
            <div className='my-5 '>
                <div
                    className={'flex flex-col justify-between sm:flex-row sm:items-center'}  >
                    <p className="mt-3  font-semibold tracking-tight  sm:mt-0 text-2xl text-[#00AB96]">
                        FAQ and information about product ({faqs.length})</p>
                </div>
            </div>

            <div>
                <ProductQuestions
                    productId={productId}
                    shopId={shopId}
                    productType={productType}
                />
            </div>
            <div className="w-full max-w-screen-lg py-10 mx-auto">
                <h2 className="mb-1 text-lg font-semibold tracking-tight text-heading">
                    Common FAQ
                </h2>
                {/* <p className='text-[20px] font-semibold'>Common FAQ</p> */}
                {!isLoading && !faqs.length ? (
                    <div className="min-h-full p-5 md:p-8 lg:p-12 2xl:p-16">
                        <NotFound text="text-no-faq" className="h-96" />
                    </div>
                ) : (
                    <FAQ data={faqs as any} isLoading={isLoading} />
                )}
            </div>
        </div>

    )
}
export default FaqInformation