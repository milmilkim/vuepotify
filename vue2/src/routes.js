import AppMain from './pages/AppMain';
import AppSearch from './pages/AppSearch';
import AppError404 from './pages/AppError404.vue';
import AppDetail from './pages/AppDetail';
import AppPlaylist from './pages/AppPlaylist';
import PlaylistItem from './components/PlaylistItem';

const routes = [
  { path: '/', component: AppMain },
  { path: '/search', component: AppSearch },
  { path: '/detail/:id', component: AppDetail },
  { path: '/playlist', component: AppPlaylist, children: [{ path: ':id', component: PlaylistItem }] },
  { path: '*', component: AppError404 },
];

export default routes;
