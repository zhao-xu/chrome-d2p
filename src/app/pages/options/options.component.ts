import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTableModule} from 'ng-zorro-antd/table';
import {Rule} from '../rule';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrl: './options.component.scss',
    imports: [
        FormsModule,
        NzTableModule,
        NzCardModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzCheckboxModule
    ]
})
export class OptionsComponent {
    rules = signal<Rule[]>([]);

    constructor() {
        this.loadRules();
    }

    loadRules() {
        if (chrome?.storage) {
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
            });
        } else {
            let v2Rules = localStorage.getItem('rules');
            if (v2Rules) {
                let rules = JSON.parse(v2Rules) as Rule[];
                if (rules) {
                    this.rules.set(rules);
                }
            }
        }
    }

    addRule() {
        this.rules.update(rules => [...rules, {value: '', path: '', disabled: false}]);
    }

    deleteRule(rule: Rule) {
        this.rules.update(rules => rules.filter(r => r !== rule));
        if (this.rules().length == 0) {
            this.addRule();
        }
    }

    saveRules() {
        let rules = [...this.rules().filter(r => r.value || r.path || r.disabled)];
        if (chrome?.storage) {
            chrome.storage.local.set({rules}).then(() => {
                this.loadRules();
            });
        } else {
            localStorage.setItem('rules', JSON.stringify(rules));
            this.loadRules();
        }
    }
}
