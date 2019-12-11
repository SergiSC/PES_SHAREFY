import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'mur',
                children: [{
                    path: '',
                    loadChildren: '../mur/mur.module#MurPageModule'
                }]
            }, {
                path: 'events',
                children: [
                    {
                        path: '',
                        loadChildren: '../events/events.module#EventsPageModule'
                    }
                ]
            },
            {
                path: 'jocs',
                children: [
                    {
                        path: '',
                        loadChildren: '../jocs/jocs.module#JocsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/mur',
                pathMatch: 'full'
            },
            {
                path: 'perfiluser',
                children: [
                    {
                        path: '',
                        loadChildren: './pages/perfiluser/perfiluser.module#PerfiluserPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/mur',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule {
}
