# highlightjs-kql

Kusto Query Language (KQL) syntax highlighting for [highlight.js](https://highlightjs.org/).

## About KQL

Kusto Query Language (KQL) is a read-only query language used to explore data in Azure Data Explorer, Azure Monitor (Log Analytics), Azure Sentinel, and other Microsoft services. It uses a pipe-based syntax similar to shell pipelines.

Learn more: https://learn.microsoft.com/en-us/kusto/query/

## Usage

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
<script src="dist/kql.min.js"></script>
<script>hljs.highlightAll();</script>
```

### Via npm

```bash
npm install highlightjs-kql
```

```javascript
const hljs = require('highlight.js');
const kql = require('highlightjs-kql');
hljs.registerLanguage('kql', kql);
```

### Example

```kql
StormEvents
| where StartTime between (datetime(2007-01-01) .. datetime(2007-12-31))
| where State == "FLORIDA"
| summarize count() by EventType
| sort by count_ desc
| take 10
| render barchart
```

## Development

To test this grammar, clone it into the `extra/` folder of a highlight.js checkout, then build and run tests:

```bash
cd /path/to/highlight.js
# clone or symlink this repo into extra/
node ./tools/build.js -t node
npm run test
```

## License

MIT
