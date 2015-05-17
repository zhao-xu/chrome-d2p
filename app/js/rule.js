function Rule(options) {
    options = options || {};
    this.disabled = false;
    this.type = options.type || 'regex';
    this.value = options.value || '';
    this.stopOnMatch = options.stopOnMatch || true;
    this.path = options.path || '';
}
Rule.prototype.test = function(downloadItem, result) {
    if (result.stop || this.disabled) {
        return;
    }
    if ('regex' === this.type) {
        if (new RegExp(this.value).test(downloadItem.filename)) {
            if (this.path) {
                result.path = this.path + '/' + result.path;
                if (this.stopOnMatch) {
                    result.stop = true;
                }
            }
        }
    }
};