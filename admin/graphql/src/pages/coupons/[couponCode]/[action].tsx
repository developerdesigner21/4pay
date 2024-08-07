import Layout from '@/components/layouts/admin';
import CouponCreateOrUpdateForm from '@/components/coupon/coupon-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useCouponQuery } from '@/graphql/coupons.graphql';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { Config } from '@/config';

export default function UpdateCouponPage() {
  const { locale, query } = useRouter();
  const { t } = useTranslation();
  const { data, loading, error } = useCouponQuery({
    variables: {
      code: query.couponCode as string,
      language:
        query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
    },
  });

  console.log(data, 'test');
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex pb-5 border-b border-dashed border-border-base md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-coupon')}
        </h1>
      </div>
      <CouponCreateOrUpdateForm initialValues={data?.coupon} />
    </>
  );
}
UpdateCouponPage.authenticate = {
  permissions: adminOnly,
};
UpdateCouponPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
