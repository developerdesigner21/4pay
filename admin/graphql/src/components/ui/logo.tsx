import Image from 'next/image';
import Link from '@/components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@/settings/site.settings';
// import { useSettings } from '@/contexts/settings.context';
import { useAtom } from 'jotai';
import { miniSidebarInitialValue } from '@/utils/constants';
import { useWindowSize } from '@/utils/use-window-size';
import { RESPONSIVE_WIDTH } from '@/utils/constants';
// import { LogoSVG } from '@/components/icons/logo';
// import LogoText from '@/components/icons/logo-text';
import { useRouter } from 'next/router';
import { useSettingsQuery } from '@/graphql/settings.graphql';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  // @ts-ignore
  ...props
}) => {
  const { locale } = useRouter();
  const { data } = useSettingsQuery({
    variables: {
      language: locale,
    },
  });

  var newLogo = data?.settings?.options?.collapseLogo?.original;
  if(data?.settings?.options?.collapseLogo?.original.includes('4pay.ai') == true && data?.settings?.options?.collapseLogo?.original.includes('4pay.ai/backend') == false){
    newLogo = data?.settings?.options?.collapseLogo?.original.replace("4pay.ai", "4pay.ai/backend");
  }
  
  var newLogos = data?.settings?.options?.logo?.original;
  if(data?.settings?.options?.logo?.original.includes('4pay.ai') == true && data?.settings?.options?.logo?.original.includes('4pay.ai/backend') == false){
    newLogos = data?.settings?.options?.logo?.original.replace("4pay.ai", "4pay.ai/backend");
  }

  const [miniSidebar, _] = useAtom(miniSidebarInitialValue);
  const { width } = useWindowSize();
  return (
    <Link
      href={siteSettings?.logo?.href}
      className={cn('inline-flex items-center gap-3', className)}
      // {...props}
    >
      {miniSidebar && width >= RESPONSIVE_WIDTH ? (
        <span
          className="relative overflow-hidden "
          style={{
            width: siteSettings.collapseLogo.width,
            height: siteSettings.collapseLogo.height,
          }}
        >
          <Image
            src={
              newLogo ??
              siteSettings.collapseLogo.url
            }
            alt={
              data?.settings?.options?.siteTitle ??
              siteSettings.collapseLogo.alt
            }
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-contain"
            loading="eager"
          />
        </span>
      ) : (
        <span
          className="relative overflow-hidden "
          style={{
            width: siteSettings.logo.width,
            height: siteSettings.logo.height,
          }}
        >
          <Image
            src={
              newLogos ?? siteSettings.logo.url
            }
            alt={data?.settings?.options?.siteTitle ?? siteSettings.logo.alt}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-contain"
            loading="eager"
          />
        </span>
      )}
    </Link>
  );
};

export default Logo;
