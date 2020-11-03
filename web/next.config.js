const withTM = require('next-transpile-modules')(['common/store', 'common/utils', 'common/types', 'common/db']);
module.exports = withTM();
