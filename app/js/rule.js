function Rule(options) {
    options = options || {};
    this.disabled = false;
    this.type = options.type || 'regex';
    this.value = options.value || '';
    this.stopOnMatch = options.stopOnMatch || true;
    this.path = options.path || '';
}
