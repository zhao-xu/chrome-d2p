(async function () {
    var model = {
        nextRuleId: 0,
        rules: ko.observableArray(),
        status: ko.observable(),
        loadRules: async function () {
            model.rules.removeAll();
            try {
                let item = await chrome.storage.local.get(['rules']);
                let rules = item.rules || [];
                rules.forEach(function(rule) {
                    rule.id = model.nextRuleId++;
                    model.rules.push(ko.mapping.fromJS(rule));
                });
            } catch (e) {
                console.debug('d2p:error', e);
            }
        },
        addRule: function () {
            var rule = new Rule();
            rule.id = model.nextRuleId++;
            model.rules.push(ko.mapping.fromJS(rule));
        },
        saveRules: function () {
            chrome.storage.local.set({rules: ko.mapping.toJS(model.rules)});
            model.status('Rules Saved');
            setTimeout(function() {model.status('')}, 2000);
        },
        deleteRule: function (rule) {
            model.rules.remove(rule);
        },
        migrateV2Rules: () => {
            let v2RuleString = localStorage.getItem('rules');
            if (v2RuleString) {
                try {
                    let nextRuleId = 0;
                    let rules = [];
                    JSON.parse(v2RuleString).forEach(function (rule) {
                        rule.id = nextRuleId++;
                        rules.push(ko.mapping.fromJS(rule));
                    });
                    model.rules(rules);
                    chrome.storage.local.set({rules: ko.mapping.toJS(model.rules)});
                    localStorage.removeItem('rules');
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };

    ko.bindingProvider.instance = new ko.secureBindingsProvider({
        attribute: "data-bind",
        globals: window,
        bindings: ko.bindingHandlers,
        noVirtualElements: false
    });
    ko.applyBindings(model);

    await model.loadRules();
    if (model.rules().length === 0) {
        model.migrateV2Rules();
    }
    if (model.rules().length === 0) {
        model.addRule();
    }
})();
