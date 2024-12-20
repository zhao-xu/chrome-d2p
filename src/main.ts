import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideExperimentalZonelessChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, withHashLocation} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';

import {AppComponent} from './app/app.component';
import {APP_ROUTES} from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter(APP_ROUTES, withHashLocation()),
        provideHttpClient(withFetch()),
        provideAnimations(),
        {provide: NzModalService},
    ]
}).catch((err) => console.error(err));
