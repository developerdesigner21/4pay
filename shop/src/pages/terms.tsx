import Seo from '@/components/seo/seo';
import NotFound from '@/components/ui/not-found';
import { useTermsAndConditions } from '@/framework/terms-and-conditions';
import { LIMIT_HUNDRED } from '@/lib/constants';
import { useTranslation } from 'next-i18next';
import PageBanner from '@/components/banners/page-banner';
import Terms from '@/components/terms/terms';
import { getStaticProps } from '@/framework/terms-and-conditions-ssr';
import { getLayoutWithFooter } from '@/components/layouts/layout-with-footer';
import ErrorMessage from '@/components/ui/error-message';
import { TermsAndConditions } from '@/types';
export { getStaticProps };
import { Link as AnchorLink, Element } from 'react-scroll';
import { useState, useEffect } from "react";


export default function TermsPage() {
  const { t } = useTranslation();
  const [pageSlug, setPageSlug] = useState<any>([])


  const { termsAndConditions, isLoading, error } = useTermsAndConditions({
    type: 'global',
    issued_by: 'Super Admin',
    limit: LIMIT_HUNDRED,
    is_approved: true,
  });

  const filteredArray = termsAndConditions.filter(obj => obj.slug === "terms-condition");
  useEffect(() => {
      setPageSlug(filteredArray);
  }, [])

  if (error) return <ErrorMessage message={error.message} />;

  // return (
  //   <>
  //     <Seo title="Terms" url="terms" />
  //     <section className="mx-auto w-full max-w-1920 bg-light pb-8 lg:pb-10 xl:pb-14">
  //       <PageBanner
  //         title={t('text-terms-condition')}
  //         breadcrumbTitle={t('text-home')}
  //       />
  //       {/* End of page header */}
  //       <div className="mx-auto w-full max-w-screen-lg px-4 py-10">
  //         {!isLoading && !termsAndConditions.length ? (
  //           <div className="min-h-full p-5 md:p-8 lg:p-12 2xl:p-16">
  //             <NotFound text="text-no-faq" className="h-96" />
  //           </div>
  //         ) : (
  //           <Terms isLoading terms={termsAndConditions as TermsAndConditions[]} />
  //         )}
  //       </div>
  //     </section>
  //   </>
  // );

  return (
    <div className="flex flex-col md:flex-row">
      {pageSlug?.map((item: RefundPolicy | TermsAndConditions) => {
        return (
          <Element
            key={item?.title}
            name={makeTitleToDOMId(item?.title)}
            className="mb-7 md:mb-10"
          >
            {/* <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
              {item?.title}
            </h2> */}
            <div className="mt-15 leading-loose text-body-dark prose max-w-full" dangerouslySetInnerHTML={{ __html: item?.description }}>
              {/* {t(item?.description)} */}
            </div>
          </Element>
        );
      })}
    </div>
  )
}

TermsPage.getLayout = getLayoutWithFooter;