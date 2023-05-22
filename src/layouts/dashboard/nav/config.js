// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
      title: 'orders',
      path: '/dashboard/orders',
      icon: icon('ic_document'),
  },
  {
      title: 'positions',
      path: '/dashboard/positions',
      icon: icon('ic_money'),
  },
//  {
//    title: 'backtest',
//    path: '/dashboard/backtest',
//    icon: icon('ic_blog'),
//  },
  {
    title: 'analysis',
    path: '/dashboard/analysis',
    icon: icon('ic_search'),
  },
  {
    title: 'setting',
    path: '/dashboard/settings',
    icon: icon('ic_setting'),
  },
//  {
//    title: 'login',
//    path: '/login',
//    icon: icon('ic_lock'),
//  },
//  {
//    title: 'Not found',
//    path: '/404',
//    icon: icon('ic_disabled'),
//  },
];

export default navConfig;
