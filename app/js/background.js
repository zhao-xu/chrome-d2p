function onDeterminingFilename(downloadItem, suggest) {
    function testRule(downloadItem, rule, result) {
        if (rule.disabled) {
            return;
        }
        if ('regex' === rule.type) {
            if (rule.path && new RegExp(rule.value, 'i').test(downloadItem.referrer + downloadItem.filename)) {
                result.path = rule.path + '/' + result.path;
                if (rule.stopOnMatch) {
                    return true;
                }
            }
        }
    }
    console.log(JSON.stringify(downloadItem));
    var rules;
    try {
        rules = JSON.parse(localStorage.rules);
    } catch (e) {
        rules = [];
    }
    var result = {path: ''};
    for (var i = 0; i < rules.length; i++) {
        if (testRule(downloadItem, rules[i], result)) {
            break;
        }
    }
    suggest({
        filename: result.path + downloadItem.filename,
        conflictAction: 'uniquify'
    })
}
chrome.downloads.onDeterminingFilename.addListener(onDeterminingFilename);