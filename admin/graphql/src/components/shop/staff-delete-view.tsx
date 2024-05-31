import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useRemoveStaffMutation } from '@/graphql/shops.graphql';
import { useDeleteStaffMutation } from '@/graphql/user.graphql';
import { getErrorMessage } from '@/utils/form-error';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const StaffDeleteView = () => {
  const { t } = useTranslation();
  const [deleteStaffById, { loading }] = useDeleteStaffMutation({
    //@ts-ignore
    update(cache, { data: { deleteStaff } }) {
      cache.modify({
        fields: {
          usersByPermission(existingRefs, { readField }) {
            return existingRefs?.data?.filter(
              (ref: any) => deleteStaff.id !== readField('id', ref)
            );
          },
        },
      });
      toast.success(t('common:successfully-deleted'));
    },
  });

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    try {
      await deleteStaffById({
        variables: { id: modalData as string },
      });
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default StaffDeleteView;
