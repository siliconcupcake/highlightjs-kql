/*
Language: Kusto Query Language
Description: Kusto Query Language (KQL) is used to query large datasets in Azure Data Explorer, Azure Monitor, and Microsoft Sentinel.
Website: https://learn.microsoft.com/en-us/kusto/query/
Category: common, database
*/

export default function(hljs) {
  const regex = hljs.regex;

  const COMMENT_MODE = hljs.COMMENT('//', '$');

  const STRING = {
    scope: 'string',
    variants: [
      // double-quoted strings with escape sequences
      {
        begin: /"/,
        end: /"/,
        contains: [ { match: /\\./ } ]
      },
      // single-quoted strings with escape sequences
      {
        begin: /'/,
        end: /'/,
        contains: [ { match: /\\./ } ]
      },
      // verbatim double-quoted strings @"..."
      {
        begin: /@"/,
        end: /"/,
        contains: [ { match: /""/ } ]
      },
      // verbatim single-quoted strings @'...'
      {
        begin: /@'/,
        end: /'/,
        contains: [ { match: /''/ } ]
      },
      // h-prefixed strings
      {
        begin: /[hH]"/,
        end: /"/,
        contains: [ { match: /\\./ } ]
      },
      {
        begin: /[hH]'/,
        end: /'/,
        contains: [ { match: /\\./ } ]
      },
      // multiline strings
      {
        begin: /```/,
        end: /```/
      },
      {
        begin: /~~~/,
        end: /~~~/
      }
    ]
  };

  // Tabular operators: these appear after | in a pipe expression
  const TABULAR_OPERATORS = [
    "as",
    "consume",
    "count",
    "distinct",
    "evaluate",
    "extend",
    "facet",
    "find",
    "fork",
    "getschema",
    "invoke",
    "join",
    "limit",
    "lookup",
    "mv-apply",
    "mv-expand",
    "mvapply",
    "mvexpand",
    "order",
    "parse",
    "parse-kv",
    "parse-where",
    "partition",
    "print",
    "project",
    "project-away",
    "project-keep",
    "project-rename",
    "project-reorder",
    "reduce",
    "render",
    "sample",
    "sample-distinct",
    "scan",
    "search",
    "serialize",
    "sort",
    "summarize",
    "take",
    "top",
    "top-hitters",
    "top-nested",
    "union",
    "where",
    "filter"
  ];

  // Statement-level keywords
  const KEYWORDS = [
    "alias",
    "and",
    "between",
    "by",
    "declare",
    "default",
    "from",
    "in",
    "let",
    "materialize",
    "not",
    "of",
    "on",
    "or",
    "pattern",
    "range",
    "restrict",
    "set",
    "step",
    "to",
    "view",
    "with",
    "access",
    "aggregations",
    "assert-schema",
    "database",
    "execute",
    "graph-match",
    "graph-mark-components",
    "graph-shortest-paths",
    "graph-to-table",
    "macro-expand",
    "make-graph",
    "make-series",
    "partitioned-by",
    "query_parameters",
    "toscalar",
    "totable"
  ];

  // Scalar types
  const TYPES = [
    "bool",
    "boolean",
    "date",
    "datetime",
    "decimal",
    "double",
    "dynamic",
    "float",
    "guid",
    "int",
    "int8",
    "int16",
    "int32",
    "int64",
    "long",
    "real",
    "string",
    "time",
    "timespan",
    "uint",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "ulong",
    "uniqueid"
  ];

  const LITERALS = [
    "true",
    "false",
    "null"
  ];

  // Common KQL built-in functions (aggregation, scalar, window, etc.)
  const FUNCTIONS = [
    // Aggregation functions
    "avg",
    "avgif",
    "count",
    "countif",
    "dcount",
    "dcountif",
    "make_bag",
    "make_bag_if",
    "make_list",
    "make_list_if",
    "make_list_with_nulls",
    "make_set",
    "make_set_if",
    "max",
    "maxif",
    "min",
    "minif",
    "percentile",
    "percentilew",
    "percentiles",
    "percentiles_array",
    "percentilesw",
    "stdev",
    "stdevif",
    "sum",
    "sumif",
    "take_any",
    "take_anyif",
    "variance",
    "varianceif",
    // Scalar functions - String
    "base64_encode_tostring",
    "base64_encode_fromguid",
    "base64_decode_tostring",
    "base64_decode_toarray",
    "base64_decode_toguid",
    "countof",
    "extract",
    "extract_all",
    "extract_json",
    "indexof",
    "indexof_regex",
    "isempty",
    "isnotempty",
    "isnotnull",
    "isnull",
    "parse_command_line",
    "parse_csv",
    "parse_json",
    "parse_url",
    "parse_urlquery",
    "parse_version",
    "replace_regex",
    "replace_string",
    "replace_strings",
    "reverse",
    "split",
    "strcat",
    "strcat_delim",
    "strcmp",
    "strlen",
    "strrep",
    "substring",
    "tolower",
    "toupper",
    "translate",
    "trim",
    "trim_end",
    "trim_start",
    "url_decode",
    "url_encode",
    // Scalar functions - DateTime
    "ago",
    "datetime_add",
    "datetime_diff",
    "datetime_part",
    "dayofmonth",
    "dayofweek",
    "dayofyear",
    "endofday",
    "endofmonth",
    "endofweek",
    "endofyear",
    "format_datetime",
    "format_timespan",
    "getmonth",
    "getyear",
    "hourofday",
    "make_datetime",
    "make_timespan",
    "monthofyear",
    "now",
    "startofday",
    "startofmonth",
    "startofweek",
    "startofyear",
    "todatetime",
    "totimespan",
    "unixtime_microseconds_todatetime",
    "unixtime_milliseconds_todatetime",
    "unixtime_nanoseconds_todatetime",
    "unixtime_seconds_todatetime",
    "weekofyear",
    // Scalar functions - Dynamic/Array
    "array_concat",
    "array_iff",
    "array_index_of",
    "array_length",
    "array_reverse",
    "array_rotate_left",
    "array_rotate_right",
    "array_shift_left",
    "array_shift_right",
    "array_slice",
    "array_sort_asc",
    "array_sort_desc",
    "array_split",
    "array_sum",
    "bag_keys",
    "bag_merge",
    "bag_pack",
    "bag_remove_keys",
    "bag_has_key",
    "jaccard_index",
    "pack",
    "pack_all",
    "pack_array",
    "repeat",
    "set_difference",
    "set_has_element",
    "set_intersect",
    "set_union",
    "treepath",
    "zip",
    // Scalar functions - Math
    "abs",
    "acos",
    "asin",
    "atan",
    "atan2",
    "beta_cdf",
    "beta_inv",
    "beta_pdf",
    "bin",
    "ceiling",
    "cos",
    "cot",
    "degrees",
    "exp",
    "exp10",
    "exp2",
    "floor",
    "gamma",
    "isinf",
    "isfinite",
    "isnan",
    "log",
    "log10",
    "log2",
    "loggamma",
    "not",
    "pi",
    "pow",
    "radians",
    "rand",
    "round",
    "sign",
    "sin",
    "sqrt",
    "tan",
    "toint",
    "todouble",
    "tolong",
    "toreal",
    "tostring",
    "tobool",
    "todecimal",
    "toguid",
    // Scalar functions - Conditional
    "case",
    "coalesce",
    "iff",
    "iif",
    "max_of",
    "min_of",
    // Scalar functions - Type
    "gettype",
    "typeof",
    // Scalar functions - Hash
    "hash",
    "hash_md5",
    "hash_sha1",
    "hash_sha256",
    "hash_xxhash64",
    // Scalar functions - Geospatial
    "geo_distance_2points",
    "geo_geohash_to_central_point",
    "geo_point_in_circle",
    "geo_point_in_polygon",
    "geo_point_to_geohash",
    "geo_point_to_s2cell",
    // Window functions
    "next",
    "prev",
    "row_cumsum",
    "row_number",
    "row_rank",
    // Special expressions
    "datatable",
    "externaldata",
    "external_data",
    "entity_group",
    "materialized-view-combine"
  ];

  // Render chart types
  const CHART_TYPES = [
    "table",
    "list",
    "barchart",
    "piechart",
    "ladderchart",
    "timechart",
    "linechart",
    "anomalychart",
    "pivotchart",
    "areachart",
    "stackedareachart",
    "scatterchart",
    "timepivot",
    "columnchart",
    "timeline",
    "card",
    "treemap"
  ];

  // Multi-word combos that boost relevance
  const COMBOS = [
    "project-away",
    "project-keep",
    "project-rename",
    "project-reorder",
    "top-nested",
    "top-hitters",
    "sample-distinct",
    "mv-expand",
    "mv-apply",
    "make-series",
    "make-graph",
    "graph-match",
    "graph-to-table",
    "graph-shortest-paths",
    "graph-mark-components",
    "parse-where",
    "parse-kv",
    "assert-schema",
    "macro-expand",
    "materialized-view-combine",
    "nulls first",
    "nulls last"
  ];

  // Not all functions — only those that are also keywords and
  // should be highlighted exclusively when followed by (
  const RESERVED_FUNCTIONS = FUNCTIONS.filter((fn) => {
    return !KEYWORDS.includes(fn) && !TABULAR_OPERATORS.includes(fn);
  });

  const ALL_KEYWORDS = [
    ...KEYWORDS,
    ...TABULAR_OPERATORS
  ].filter((kw) => !FUNCTIONS.includes(kw));

  function kws_to_regex(list) {
    return regex.concat(
      /\b/,
      regex.either(...list.map((kw) => {
        return kw.replace(/[-]/g, '[-]').replace(/\s+/g, '\\s+');
      })),
      /\b/
    );
  }

  // keywords with less than 3 letters get reduced relevancy
  function reduceRelevancy(list, {
    exceptions, when
  } = {}) {
    const qualifyFn = when;
    exceptions = exceptions || [];
    return list.map((item) => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else if (qualifyFn(item)) {
        return `${item}|0`;
      } else {
        return item;
      }
    });
  }

  const FUNCTION_CALL = {
    match: regex.concat(/\b/, regex.either(...RESERVED_FUNCTIONS), /\s*\(/),
    relevance: 0,
    keywords: { built_in: RESERVED_FUNCTIONS }
  };

  const MULTI_WORD_KEYWORDS = {
    scope: "keyword",
    match: kws_to_regex(COMBOS),
    relevance: 1
  };

  const OPERATOR = {
    scope: "operator",
    match: /[+\-*/%]|==|!=|<>|<=?|>=?|=~|!~|\.\.|\|/,
    relevance: 0
  };

  // String operators as keyword-like patterns
  const STRING_OPERATOR = {
    scope: "keyword",
    match: regex.concat(
      /!?/,
      /\b/,
      regex.either(
        "contains",
        "contains_cs",
        "containscs",
        "endswith",
        "endswith_cs",
        "has",
        "has_cs",
        "has_all",
        "has_any",
        "hasprefix",
        "hasprefix_cs",
        "hassuffix",
        "hassuffix_cs",
        "like",
        "likecs",
        "notcontains",
        "notcontainscs",
        "notlike",
        "notlikecs",
        "startswith",
        "startswith_cs",
        "matches regex"
      ),
      /\b/
    ),
    relevance: 0
  };

  const VARIABLE = {
    scope: "variable",
    match: /\$[a-zA-Z_]\w*/
  };

  // Timespan literals like 1d, 2h, 30m, 10s, 100ms, etc.
  const TIMESPAN_LITERAL = {
    scope: "number",
    match: /\b\d+(\.\d+)?\s*(d|h|hr|m|min|minute|minutes|s|sec|second|seconds|ms|milli|millisecond|milliseconds|micro|microsecond|microseconds|nano|nanosecond|nanoseconds|tick|ticks)\b/,
    relevance: 0
  };

  return {
    name: 'Kusto',
    aliases: [ "kql" ],
    case_insensitive: true,
    keywords: {
      $pattern: /[!]?[\w][\w.-]*/,
      keyword:
        reduceRelevancy(ALL_KEYWORDS, { when: (x) => x.length < 3 }),
      literal: LITERALS,
      type: TYPES,
      built_in: CHART_TYPES
    },
    contains: [
      MULTI_WORD_KEYWORDS,
      FUNCTION_CALL,
      STRING_OPERATOR,
      STRING,
      TIMESPAN_LITERAL,
      hljs.C_NUMBER_MODE,
      COMMENT_MODE,
      OPERATOR,
      VARIABLE
    ]
  };
}
