const RE2 = require('re2')
exports.propertyMatcher = new RE2(/@import[^;]*|[;\s{]?\*?[a-zA-Z\-]+\s*:#?[\s\S]*url\(\s*['"]?[^'"\)\s]+['"]?\s*\)[^;}]*/g)
exports.urlMatcher = new RE2(/url\(\s*['"]?([^)'"]+)['"]?\s*\)/g)
