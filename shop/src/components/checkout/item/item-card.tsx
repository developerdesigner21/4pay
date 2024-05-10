import usePrice from '@/lib/use-price';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Counter from '@/components/ui/counter';
import { useCart } from '@/store/quick-cart/cart.context';
import { CloseIcon } from '@/components/icons/close-icon';
import { Image } from '@/components/ui/image';
interface Props {
  item: any;
  notAvailable?: boolean;
}

const ItemCard = ({ item, notAvailable }: Props) => {
  const { t } = useTranslation('common');
  const { price } = usePrice({
    amount: item.itemTotal,
  });
  const {
    isInStock,
    clearItemFromCart,
    addItemToCart,
    removeItemFromCart,
    updateCartLanguage,
    language,
  } = useCart();

  function handleIncrement(e: any) {
    e.stopPropagation();
    // Check language and update
    if (item?.language !== language) {
      updateCartLanguage(item?.language);
    }
    addItemToCart(item, 1);
    if (Object.fromEntries(document.cookie.split("; ").map(item => item.split('=')))['auth_token']) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Object.fromEntries(document.cookie.split("; ").map(item => item.split('=')))['auth_token']}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(`https://4pay.ai/backend/graphql?query=mutation AddtocartProduct {AddtocartProduct(input: { productid:"${item.id}" })}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    } else (
      console.log("No Authorized Token")
    )
  }
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);

    if (item.quantity === 1) {
      if (Object.fromEntries(document.cookie.split("; ").map(item => item.split('=')))['auth_token']) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Object.fromEntries(document.cookie.split("; ").map(item => item.split('=')))['auth_token']}`);

        var requestOptions:any = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(`https://4pay.ai/backend/graphql?query=mutation AddtocartProductRemove {AddtocartProductRemove(input: { productid: "${item.id}" })}`, requestOptions)
          .then(response => response.json())
          .then(result => console.log("Result", result))
          .catch(error => console.log('error', error));
        console.log("Sucesssfully Remove ")
      } else (
        console.log("No Authorized Token")
      )
    }
    else (
      console.log("Not Remove")
    )
  };
  const outOfStock = !isInStock(item.id);

  return (
    <div className="flex justify-between py-2 items-center">
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="block object-fit product-image cursor-pointer mr-2"
      />
      <div className="">
        <span
          className={cn('text-sm', notAvailable ? 'text-red-500 flex' : 'text-body flex items-center')}
        >
          <span>{item.name}</span>{' '}
          <span> {item?.in_flash_sale ? '(On Sale)' : ''} </span>
        </span>
        <span
          className={cn('text-sm', notAvailable ? 'text-red-500' : 'text-body')}
        >
          {!notAvailable ? price : t('text-unavailable')}
        </span>
      </div>
      
      <span
        className={cn(
          'text-sm font-bold ml-1',
          notAvailable ? 'text-red-500' : 'text-heading'
        )}
      >
        {/* {item.quantity} */}
        {/* <div className="flex-shrink-0"> */}
          <Counter
            value={item.quantity}
            onDecrement={handleRemoveClick}
            onIncrement={handleIncrement}
            variant="florine"
            disabled={outOfStock}
          />
        {/* </div> */}
      </span>
      {/* <button
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600 focus:outline-0 ltr:ml-2 ltr:-mr-2 rtl:mr-2 rtl:-ml-2"
        onClick={() => clearItemFromCart(item.id)}
      >
        <span className="sr-only">{t('text-close')}</span>
        <CloseIcon className="h-3 w-3" />
      </button> */}
    </div>
  );
};

export default ItemCard;
