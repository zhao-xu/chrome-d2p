var model;
$(function () {
    model = {
        nextRuleId: 0,
        rules: ko.observableArray(),
        status: ko.observable(),
        loadRules: function () {
            model.rules.removeAll();
            try {
                JSON.parse(localStorage.rules).forEach(function(rule) {
                    rule.id = model.nextRuleId++;
                    model.rules.push(ko.mapping.fromJS(rule));
                    if (model.nextRuleId < rule.id) {
                        model.nextRuleId = rule.id;
                    }
                });
            } catch (e) {
                localStorage.rules = '[]';
            }
        },
        addRule: function () {
            var rule = new Rule();
            rule.id = model.nextRuleId++;
            model.rules.push(ko.mapping.fromJS(rule));
        },
        saveRules: function () {
            localStorage.rules = JSON.stringify(ko.mapping.toJS(model.rules));
            model.status('Rules Saved');
            setTimeout(function() {model.status('')}, 2000);
        },
        deleteRule: function (rule) {
            model.rules.remove(rule);
        }
    };
    var options = {
        attribute: "data-bind",
        globals: window,
        bindings: ko.bindingHandlers,
        noVirtualElements: false
    };
    ko.bindingProvider.instance = new ko.secureBindingsProvider(options);
    ko.applyBindings(model);
    model.loadRules();
    if (model.rules().length === 0) {
        model.addRule();
    }
});
