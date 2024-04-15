import MobileCategoryMenu from '@/components/layouts/mobile-menu/mobile-category-menu';
import { drawerAtom } from '@/store/drawer-atom';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import Drawer from './drawer';
const CartSidebarView = dynamic(
  () => import('@/components/cart/cart-sidebar-view'),
);
const MobileAuthorizedMenu = dynamic(
  () => import('@/components/layouts/mobile-menu/mobile-authorized-menu'),
);
const MobileMainMenu = dynamic(
  () => import('@/components/layouts/mobile-menu/mobile-main-menu'),
);
const SearchFilterView = dynamic(
  () => import('@/components/search-view/sidebar-filter'),
);
const MaintenanceMoreInfo = dynamic(
  () => import('@/components/maintenance/more-info'),
);

export default function ManagedDrawer() {
  const [{ display, view, data }, setDrawerState] = useAtom(drawerAtom);
  return (
    <Drawer
      open={display}
      onClose={() => setDrawerState({ display: false, view: '' })}
      variant={
        [
          'FILTER_VIEW',
          'MAIN_MENU_VIEW',
          'FILTER_LAYOUT_TWO_VIEW',
          'SEARCH_FILTER',
        ].includes(view)
          ? 'left'
          : 'right'
      }
      className={`${
        view === 'MAINTENANCE_MORE_INFO' && 'max-w-sm md:max-w-xl '
      }${view === 'SEARCH_FILTER' && ' w-80'}`}
    >
      {view === 'cart' && <CartSidebarView />}
      {view === 'FILTER_VIEW' && <MobileCategoryMenu variables={data} />}
      {view === 'MAIN_MENU_VIEW' && <MobileMainMenu />}
      {view === 'AUTH_MENU_VIEW' && <MobileAuthorizedMenu />}
      {view === 'SEARCH_FILTER' && (
        <SearchFilterView
          type={data?.type}
          showManufacturers={data?.showManufacturers}
        />
      )}
      {view === 'MAINTENANCE_MORE_INFO' && (
        <MaintenanceMoreInfo variables={data} />
      )}
    </Drawer>
  );
}
