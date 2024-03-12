import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { logoPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  }: any = useSettings();

  var newLogo = logo.original;
  if(logo.original.includes('4pay.ai') == true && logo.original.includes('4pay.ai/backend') == false){
    newLogo = logo.original.replace("https://4pay.ai//", "https://4pay.ai/backend/");
  }

  return (
    <Link href="/" className={cn('inline-flex', className)} {...props}>
      <span className="relative h-[2.125rem] w-32 overflow-hidden md:w-[8.625rem]">
        <Image
          src={newLogo ?? logoPlaceholder}
          alt={siteTitle || '4Pay Logo'}
          fill
          sizes="(max-width: 768px) 100vw"
          loading="eager"
          className="object-contain"
        />
      </span>
    </Link>
  );
};

export default Logo;
