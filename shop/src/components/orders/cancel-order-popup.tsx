import ConfirmationCard from '@/components/ui/cards/confirmation';
import {
    useModalAction,
    useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteAddress } from '@/framework/user';
import TrashIcon from '@/components/icons/trash';
import Button from '@/components/ui/button';
import { CancelOrderF } from '@/framework/order';
// import { useCancelOrderMutation } from '@/framework/gql/orders.graphql';
import { useEffect } from 'react';
// import { useCancelOrder } from '@/framework/review';




function CancelOrderPopup() {
    const { mutate: verifyOrder } = CancelOrderF();
    const { data } = useModalState();
    
    const { closeModal } = useModalAction();
    function onCancel() {
        closeModal();
    }
    function onSubmit() {
        verifyOrder({orderId:data.tracking_number});
        closeModal();
    }

    return (
        <div className="m-auto w-full max-w-sm rounded-md bg-light p-4 pb-6 sm:w-[24rem] md:rounded-xl">
            <div className="h-full w-full text-center">
                <div className="flex h-full flex-col justify-between">
                    <span className="m-auto mt-4 text-accent">
                        <TrashIcon className="h-12 w-12" />
                    </span>
                    <p className="mt-4 text-xl font-bold text-heading">Cancel Order</p>
                    <p className="px-6 py-2 leading-relaxed text-body-dark dark:text-muted">
                        Are you sure you want to cancel order ?
                    </p>
                    <div className="mt-8 flex w-full items-center justify-between space-x-4 rtl:space-x-reverse">
                        <div className="w-1/2">
                            <Button
                                onClick={onCancel}
                                variant="custom"
                                className='w-full rounded bg-red-600 py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-red-600-hover focus:bg-red-600-hover focus:outline-none'
                            > No </Button>
                        </div>

                        <div className="w-1/2">
                            <Button
                                onClick={onSubmit}
                                // loading={deleteBtnLoading}
                                // disabled={deleteBtnLoading}
                                variant="custom"
                                className='w-full rounded bg-accent py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-accent-hover focus:bg-accent-hover focus:outline-none'>
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CancelOrderPopup;
