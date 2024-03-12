import type { Address } from '@/types';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { RadioGroup } from '@headlessui/react';
import { useAtom, WritableAtom } from 'jotai';
import AddressCard from '@/components/address/address-card';
import { AddressHeader } from '@/components/address/address-header';
import { useTranslation } from 'next-i18next';
import { AddressForm } from '@/components/address/address-form';

interface AddressesProps {
  addresses: Address[] | undefined;
  label: string;
  atom: WritableAtom<Address | null, any, Address>;
  className?: string;
  count: number;
  type: string;
  isadd: boolean;
  isbilling: {
    istrue: boolean;
    isvalue: boolean;
  }
  isbillingaction: () => void
}

export const GuestAddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  atom,
  className,
  count,
  type,
  isadd = true,
  isbilling = { istrue: false, isvalue: false },
  isbillingaction = ()=>{}
}) => {
  const { t } = useTranslation('common');
  const [selectedAddress, setAddress] = useAtom(atom);
  const { openModal } = useModalAction();

  function onAdd() {
    openModal('ADD_OR_UPDATE_GUEST_ADDRESS', { type, atom });
  }

  function onEdit(address: any) {
    openModal('ADD_OR_UPDATE_GUEST_ADDRESS', { type, atom, address });
  }

  function onSubmit(values: any) {
    const formattedInput = {
      title: values.title,
      type: values.type,
      address: values.address,
    };
    setAddress(formattedInput);
  }

  return (
    <div className={className}>
      {isbilling.istrue?
      <AddressHeader onAdd={isbillingaction} count={count} label={label} isaddshow={isadd} isicon={false} isaddlabel={isbilling.isvalue?'Hide':'Show'}/>
      :<AddressHeader onAdd={onAdd} count={count} label={label} isaddshow={isadd} />
      }
      
      <div className={`${isbilling.istrue?isbilling.isvalue?'':'hidden':''}`}>
        <AddressForm
          onSubmit={onSubmit}
          isType={false}
          defaultValues={{
            title: addresses?.title,
            type: type,
            address: {
              ...addresses?.address,
            },
          }}
        />
      </div>
      {/* {addresses && addresses?.length ? (
        <RadioGroup as="span" value={selectedAddress} onChange={setAddress}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {addresses?.map((address) => (
              <RadioGroup.Option value={address} key={address?.id}>
                {({ checked }) => (
                  <AddressCard
                    checked={checked}
                    address={address}
                    onEdit={() => onEdit(address)}
                  />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
            {t('text-no-address')}
          </span>
        </div>
      )} */}
    </div>
  );
};
export default GuestAddressGrid;
