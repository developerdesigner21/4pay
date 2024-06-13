import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { getErrorMessage } from '@/utils/form-error';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDeleteTypeMutation } from '@/graphql/type.graphql';

const GroupDeleteView = () => {
  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  const { t } = useTranslation();

  const [deleteGroupById, { loading }] = useDeleteTypeMutation({
    //@ts-ignore
    update(cache, { data: { deleteGroup } }) {
      cache.modify({
        fields: {
          types(existingRefs, { readField }) {
            return existingRefs?.data?.filter(
              (ref: any) => deleteGroup.id !== readField('id', ref)
            );
          },
        },
      });
      toast.success(t('common:successfully-deleted'));
    },
  });

  async function handleDelete() {
    try {
      await deleteGroupById({
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

export default GroupDeleteView;
