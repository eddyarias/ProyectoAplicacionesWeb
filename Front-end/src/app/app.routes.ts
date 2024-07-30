import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component:  LoginComponent},
    { path: 'paginas', component: DashboardComponent,
        children: [
            {
                path: 'inicios',
                loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
            }
        ]
    }
];

// export const routes: Routes = [
//     { path: '', redirectTo: '/login', pathMatch: 'full' },
//     { path: 'log', component:  DashboardComponent,
//         children: [
//             {
//                 path: 'login',
//                 loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
//             }
//         ]
//     },
//     { path: 'paginas', component: DashboardComponent,
//         children: [
//             {
//                 path: 'inicios',
//                 loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
//             }
//         ]
//     }
// ];
