import Layout from '@/components/layouts/admin';
import AddStaffForm from '@/components/shop/staff-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useFindStaffByIdQuery } from '@/graphql/user.graphql';
import { adminOnly } from '@/utils/auth-utils';
import { User } from '__generated__/__types__';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const UpdateUserPage = () => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useFindStaffByIdQuery({});

  useEffect(() => {
    refetch({
      id: query.userSlug as string,
    });
  }, []);

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-product')}
        </h1>
      </div>
      <AddStaffForm initialValues={data?.findStaffById as User} />
    </>
  );
};

UpdateUserPage.authenticate = {
  permissions: adminOnly,
};
UpdateUserPage.Layout = Layout;

export default UpdateUserPage;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
