import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {Rule} from '../rule';

@Component({
    selector: 'app-options',
    standalone: true,
    templateUrl: './options.component.html',
    styleUrl: './options.component.css',
    imports: [
        NzTableComponent,
        NzCardComponent,
        NzInputDirective,
        FormsModule,
        NzButtonComponent,
        NzIconDirective,
        NzCheckboxComponent
    ]
})
export class OptionsComponent {
    rules = signal<Rule[]>([]);

    constructor() {
        if (chrome?.storage) {
            this.loadRules();
        } else {
            this.devTest();
        }
    }

    loadRules() {
        chrome.storage.local.get(['rules']).then(item => {
            let rules = item['rules'] as Rule[];
            if (!rules) {
                let v2Rules = localStorage.getItem('rules');
                if (v2Rules) {
                    rules = JSON.parse(v2Rules) as Rule[];
                }
            }
            if (rules) {
                this.rules.set(rules);
            }
        })
    }

    devTest() {
        let v2Rules = localStorage.getItem('rules');
        if (v2Rules) {
            let rules = JSON.parse(v2Rules) as Rule[];
            if (rules) {
                this.rules.set(rules);
            }
        }
    }
}
