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
                path: 'populars',
                children: [
                    {
                        path: '',
                        loadChildren: '../populars/populars.module#PopularsPageModule'
                    }
                ]
            }, {
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
