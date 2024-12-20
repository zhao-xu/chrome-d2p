import {Route} from '@angular/router';
import {OptionsComponent} from './pages/options/options.component';

export const APP_ROUTES: Route[] = [
    {
        path: 'options',
        component: OptionsComponent
    },
    {
        path: '',
        component: OptionsComponent
    }
];
