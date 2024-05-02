import { Order } from '__generated__/__types__';
import Image from 'next/image';
import icon from '@/assets/Frame (1).png';
import icon2 from '@/assets/Vector.png';
import { ORDER_STATUS } from '@/utils/order-status';
import { useTranslation } from 'react-i18next';
import Select from '../ui/select/select';
import { useUpdateOrderMutation } from '@/graphql/orders.graphql';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface ProductCardProps {
  order: Order;
  className?: string;
}

const status: Record<string, string> = {
  'order-pending': 'Order Pending',
  'order-processing': 'Order Processing',
  'order-completed': 'Order Completed',
  'order-cancelled': 'Order Cancelled',
  'order-refunded': 'Order Refunded',
  'order-failed': 'Order Failed',
  'order-out-for-delivery': 'Order Out For Delivery',
  'order-at-local-facility': 'Order At Local Facility',
};

const OrderCard: React.FC<ProductCardProps> = ({ order, className }) => {
  const { t } = useTranslation();
  const orderStatus=ORDER_STATUS.slice(1, 6)?.map((d)=>({label:d.name,value:d.status}))
  const [updateOrder, { loading: updating }] = useUpdateOrderMutation({
    onCompleted: () => {
      toast.success(t('common:successfully-updated'));
    },
  });

  const updateStatus = (id: string, status: string) => {
    updateOrder({
      variables: {
        input: {
          id: id,
          order_status: status,
        },
      },
    });
  };

  return (
    <div
      key={order.id + '' + order?.created_at}
      className="bg-[#009F7F1A] p-5 rounded-lg"
    >
      <div className="flex justify-center items-center uppercase">
        <p className="text-2xl font-semibold">{order?.customer_name}</p>
      </div>

      <div className="flex justify-around pt-5">
        {order?.customer_id && <p className="text-sm">{order?.customer_id}</p>}
        <p className="text-sm">{order?.created_at}</p>
      </div>

      <div>
        <p className="text-black font-semibold text-base border-b-2 border-[#DCDCDC] py-5 text-center">
          {order?.tracking_number}
        </p>
        {order?.order_status && (
          <p className="text-[#175B46] font-semibold border-b-2 border-[#DCDCDC] py-3 text-center">
            {status[order?.order_status].replace(/^Order\s/, '')}
          </p>
        )}

        <div className="flex flex-row border-b-2 border-[#DCDCDC] py-3 justify-between">
          <p className="text-sm">Order Type:</p>
          <div className="flex flex-row space-x-3">
            <Image src={icon} alt={''} />
            <p className="text-sm">Envío ASAP</p>
          </div>
        </div>
        <div className="flex flex-row justify-between border-b-2 border-[#DCDCDC] py-3">
          <p className="text-sm">Preparation Time:</p>
          <p className="text-sm">1min</p>
        </div>
        <div className="flex flex-row items-center justify-between border-b-2 border-[#DCDCDC] py-3">
          <p className="text-sm">Status</p>
          <Select
            name="order_status"
            value={orderStatus?.find((s)=>s.value==order?.order_status)}
            // defaultValue={{label:order?.name!,value:order?.order_status!}}
            placeholder={t('form:input-placeholder-order-status')}
            // getOptionLabel={(option: any) => option.name}
            // getOptionValue={(option: any) => option.status}
            options={orderStatus}
            onChange={(selected: any) =>{
              updateStatus(order.id, selected.value)
            }}
            isSearchable={true}
            // defaultInputValue={order?.order_status!}
            // blurInputOnSelect
            isDisabled={updating}
          />
        </div>

        {order?.products && order?.products?.length > 0 && (
          <div className="border-b-2 border-[#DCDCDC] ">
            <div className="flex flex-col gap-3 bg-white rounded-lg my-5 p-5">
              {order?.products?.map((product, index) => (
                <p
                  key={
                    index +
                    product?.id! +
                    order?.created_at +
                    order?.tracking_number
                  }
                  className="text-sm"
                >
                  {product?.name}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 border-b-2 border-[#DCDCDC] ">
          <div className="flex flex-row justify-between">
            <p className="font-semibold text-sm">Amount</p>
            <p className="font-semibold">{order?.amount}$</p>
          </div>
          <div className="flex flex-row justify-between ">
            <p className="font-semibold text-sm">Tax</p>
            <p className="font-semibold">{order?.sales_tax}$</p>
          </div>
          <div className="flex flex-row justify-between ">
            <p className="font-semibold text-sm">Total</p>
            <p className="font-semibold">{order?.total}$</p>
          </div>
          <div className="flex flex-row justify-between ">
            <p className="font-semibold text-sm">Paid Total</p>
            <p className="font-semibold">{order?.paid_total}$</p>
          </div>
        </div>
        <div className="flex flex-row justify-between py-3">
          <p className="text-sm">Payment Status</p>
          <p className="text-sm">{order?.payment_status}</p>
        </div>
        <div className="py-3">
          <div className="space-y-3">
            <p className="font-semibold">Customer</p>
            <p className="w-full p-2 text-sm bg-white">
              {order?.customer_name}
            </p>
            <p className="w-full p-2 text-sm bg-white">
              {order?.customer_contact}
            </p>
          </div>

          <div className="relative max-w-2xl bg-white flex flex-row my-5 p-5 border-dashed border-2 border-black justify-center ">
            <Image src={icon2} alt={''} />
            <p className="px-3"> Ver ruta</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
