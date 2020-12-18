const withTM = require('next-transpile-modules')([ 'common/store', 'common/utils', 'common/types', 'common/db' ]);
const withLess = require('@zeit/next-less');

module.exports = withLess(withTM());

