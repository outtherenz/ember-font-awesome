/* eslint-env node */
"use strict";
const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const OldFaIconComponent = require('./old-fa-icon');

module.exports = class FaListComponent extends BuildTimeComponent {
  constructor(node, opts = {}) {
    super(node, Object.assign({ tagName: 'ul', classNames: ['fa-ul'] }, opts));
    this.contentVisitor = {
      MustacheStatement: (node) => {
        let componentAlias = this.node.program.blockParams[0];
        if (componentAlias !== undefined && node.path.original === `${componentAlias}.old-fa-icon`) {
          return (new OldFaIconComponent(node, { listItem: true, transform: opts.transform })).toElement();
        }
      }
    }
  }
}
