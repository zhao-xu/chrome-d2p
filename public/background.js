function testRule(downloadItem, rule, result) {
    if (rule.disabled || !rule.value || !rule.path) {
        return;
    }
    if (new RegExp(rule.value, 'i').test(downloadItem.url + downloadItem.filename)) {
        result.path = rule.path + '/' + result.path;
        return true;
    }
    return false;
}

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
    chrome.storage.local.get(['rules']).then(item => {
        let rules = item.rules || [];
        let result = {path: ''};
        for (let i = 0; i < rules.length; i++) {
            if (testRule(downloadItem, rules[i], result)) {
                break;
            }
        }
        suggest({
            filename: result.path + downloadItem.filename,
            conflictAction: 'uniquify'
        });
    });
    return true;
});
