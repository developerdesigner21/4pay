// import { privacyPolicy } from '@/framework/static/privacy';
// import { Link, Element } from 'react-scroll';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { useTranslation } from 'next-i18next';
// import { GetStaticProps } from 'next';
// import Seo from '@/components/seo/seo';
// import { getLayoutWithFooter } from '@/components/layouts/layout-with-footer';

// function makeTitleToDOMId(title: string) {
//   return title.toLowerCase().split(' ').join('_');
// }

// export default function PrivacyPage() {
//   const { t } = useTranslation('policy');
//   const { title, date, content } = privacyPolicy;

//   return (
//     <>
//       <Seo title="Privacy" url="privacy" />
//       <section className="mx-auto w-full max-w-1920 bg-light px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
//         <header className="mb-10 sm:mt-2 lg:mb-14 xl:mt-4">
//           <h1 className="mb-4 text-xl font-bold text-heading sm:mb-5 sm:text-3xl md:text-2xl 2xl:mb-7 2xl:text-4xl">
//             {t(title)}
//           </h1>
//           <p className="px-0.5 text-sm text-body-dark md:text-base 2xl:text-lg">
//             {date}
//           </p>
//         </header>
//         {/* End of page header */}

//         <div className="flex flex-col md:flex-row">
//           <nav className="mb-8 md:mb-0 md:w-72 xl:w-3/12">
//             <ol className="sticky z-10 md:top-16 lg:top-22">
//               {content?.map((item) => (
//                 <li key={item.title}>
//                   <Link
//                     spy={true}
//                     offset={-120}
//                     smooth={true}
//                     duration={500}
//                     to={makeTitleToDOMId(item.title)}
//                     activeClass="text-sm lg:text-base text-heading font-semibold"
//                     className="inline-flex cursor-pointer py-3 uppercase text-sub-heading"
//                   >
//                     {t(item.title)}
//                   </Link>
//                 </li>
//               ))}
//             </ol>
//           </nav>
//           {/* End of section scroll spy menu */}

//           <div className="md:w-9/12 md:pb-10 ltr:md:pl-8 rtl:md:pr-8">
//             {content?.map((item) => (
//               <Element
//                 key={item.title}
//                 name={makeTitleToDOMId(item.title)}
//                 className="mb-10"
//               >
//                 <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
//                   {t(item.title)}
//                 </h2>
//                 <div
//                   className="leading-loose text-body-dark"
//                   dangerouslySetInnerHTML={{ __html: t(item.description) }}
//                 />
//               </Element>
//             ))}
//           </div>
//           {/* End of content */}
//         </div>
//       </section>
//     </>
//   );
// }

// PrivacyPage.getLayout = getLayoutWithFooter;

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale!, ['common', 'policy'])),
//     },
//   };
// };


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
import TermsLoader from '@/components/ui/loaders/terms-loader';
import rangeMap from '@/lib/range-map';
import { useEffect, useState } from 'react';
export { getStaticProps };
import { Link as AnchorLink, Element } from 'react-scroll';


export default function PrivacyPage() {
  const { t } = useTranslation();
  const [pageSlug, setPageSlug] = useState<any>([])


  const { termsAndConditions, isLoading, error } = useTermsAndConditions({
    type: 'global',
    issued_by: 'Super Admin',
    limit: LIMIT_HUNDRED,
    is_approved: true,
  });
  const filteredArray = termsAndConditions.filter(obj => obj.slug === "privacy-policy");
  useEffect(() => {
    setPageSlug(filteredArray);
  }, [])

  if (error) return <ErrorMessage message={error.message} />;


  return (
    <>
      <Seo title="Terms" url="terms" />
      <section className="mx-auto w-full max-w-1920 bg-light pb-8 lg:pb-10 xl:pb-14">
        <PageBanner
          title={'Privacy Policy'}
          breadcrumbTitle={t('text-home')}
        />
        <div className="mx-auto w-full max-w-screen-lg px-4 py-10">
          {!isLoading && !termsAndConditions.length ? (
            <div className="min-h-full p-5 md:p-8 lg:p-12 2xl:p-16">
              <NotFound text="text-no-faq" className="h-96" />
            </div>
          ) : (

            <div className="flex flex-col md:flex-row">
              {pageSlug?.map((item: any) => {
                return (
                  <Element
                    key={item?.title}
                    name={(item?.title)}
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
          )}
        </div>

      </section>
    </>
  );
}

PrivacyPage.getLayout = getLayoutWithFooter;