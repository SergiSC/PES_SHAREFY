import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registre', loadChildren: './pages/registre/registre.module#RegistrePageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'mur', loadChildren: './pages/mur/mur.module#MurPageModule' },
  { path: 'populars', loadChildren: './pages/populars/populars.module#PopularsPageModule' },
  { path: 'jocs', loadChildren: './pages/jocs/jocs.module#JocsPageModule' },
  { path: 'config', loadChildren: './pages/config/config.module#ConfigPageModule' },
  { path: 'afegir', loadChildren: './pages/afegir/afegir.module#AfegirPageModule' },
  { path: 'recuperar', loadChildren: './pages/recuperar/recuperar.module#RecuperarPageModule' },
  { path: 'informacio', loadChildren: './pages/informacio/informacio.module#InformacioPageModule' },
  { path: 'comentaris', loadChildren: './pages/comentaris/comentaris.module#ComentarisPageModule' },
  { path: 'legal', loadChildren: './pages/legal/legal.module#LegalPageModule' },
  { path: 'editar-publicacio/:idPublicacio',
    loadChildren: './pages/editar-publicacio/editar-publicacio.module#EditarPublicacioPageModule' },
  { path: 'buscar', loadChildren: './pages/buscar/buscar.module#BuscarPageModule' },
  { path: 'perfiluser', loadChildren: './pages/perfiluser/perfiluser.module#PerfiluserPageModule' },
  { path: 'perfiljoc', loadChildren: './pages/perfiljoc/perfiljoc.module#PerfiljocPageModule' },
  { path: 'vistapublicacio', loadChildren: './pages/vistapublicacio/vistapublicacio.module#VistapublicacioPageModule' },
  { path: 'followers', loadChildren: './pages/followers/followers.module#FollowersPageModule' },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },  { path: 'canviar-contra', loadChildren: './pages/canviar-contra/canviar-contra.module#CanviarContraPageModule' },
  { path: 'pending', loadChildren: './pages/pending/pending.module#PendingPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
