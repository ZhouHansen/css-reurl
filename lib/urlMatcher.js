exports.propertyMatcher = /@import[^;]*|[;\s{]?\*?[a-zA-Z\-]+\s*:#?[\s\S]*url\(\s*['"]?[^'"\)\s]+['"]?\s*\)[^;}]*/g
exports.urlMatcher = /url\(\s*['"]?(?!data:)([^)'"]+)['"]?\s*\)/g
