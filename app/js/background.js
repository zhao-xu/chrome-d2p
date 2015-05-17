function onDeterminingFilename(downloadItem, suggest) {
    var rules = [];
    try {
        rules = JSON.parse(localStorage.rules);
    } catch (e) {
        localStorage.rules = "[]";
    }
    var result = {path: ''};
    for (var i = 0; i < rules.length; i++) {
        rules[i].test(downloadItem, result);
    }
    suggest({
        filename: result.path + downloadItem.filename,
        conflictAction: 'uniquify'
    })
}
chrome.downloads.onDeterminingFilename.addListener(onDeterminingFilename);