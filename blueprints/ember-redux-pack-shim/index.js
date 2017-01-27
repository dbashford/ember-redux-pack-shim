/* jshint node: true */
/* eslint-env node */

module.exports = {
  afterInstall() {
    return this.addPackagesToProject([
      { name: 'redux-pack', target: '0.1.4' }
    ]);
  },

  normalizeEntityName() {
    // this prevents an error when the entityName is not specified
  }
};
