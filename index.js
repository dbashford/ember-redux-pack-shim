/* jshint node: true */
/* eslint-env node */

'use strict';

const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const WebpackWriter = require('broccoli-webpack');

module.exports = {
  name: 'redux-pack',

  included(app) {
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.import('vendor/redux-pack.amd.js');
  },

  treeForVendor(tree) {
    const rPackPath = path.dirname(require.resolve('redux-pack'));
    const rPackTree = new WebpackWriter([ rPackPath ], {
      entry: './index.js',
      output: {
        library: 'redux-pack',
        libraryTarget: 'amd',
        filename: 'redux-pack.amd.js'
      }
    });

    if (!tree) {
      return this._super.treeForVendor.call(this, rPackTree);
    }

    const trees = mergeTrees([rPackTree, tree], {
      overwrite: true
    });

    return this._super.treeForVendor.call(this, trees);
  }
};
