const passThrough = "$$ = $1";
const firstInList = "$$ = [ $1 ];";
const nextInList = "$1.push($3); $$ = $1";

const grammar = {
    lex: {
        rules: [
            // whitespace
            ["\\s+", "/* skip whitespace */"],
            ["//.*", "/* skip comment */"],

            ["true\\b",      "return 'TRUE'"],
            ["false\\b",     "return 'FALSE'"],
            ["null\\b",      "return 'NULL'"],
            ["undefined\\b", "return 'UNDEFINED'"],

            ["[-+]?(0|[1-9]\\d*)(\\.\\d+)?", "return 'NUMBER'"],
            ["\"[^\"\\r\\n]*\"", "return 'STRING'"],
            ["'[^'\\r\\n]*'", "return 'STRING'"],
            ["[a-zA-Z_][a-zA-Z0-9_]*", "return 'IDENTIFIER'"],

            [":",   "return ':'"],
            [",",   "return ','"],
            ["{",   "return '{'"],
            ["}",   "return '}'"],
            ["\\[", "return '['"],
            ["\\]", "return ']'"]
        ]
    },

    bnf: {
        program: [
            [ "primaryExpression", "return $1;" ]
        ],
        primaryExpression: [
            [ "TRUE", "$$ = true;" ],
            [ "FALSE", "$$ = false;" ],
            [ "NULL", "$$ = null;" ],
            [ "UNDEFINED", "$$ = undefined;" ],
            [ "NUMBER", "$$ = parseFloat($1);" ],
            [ "string", passThrough ],
            [ "array",  passThrough ],
            [ "object",  passThrough ]
        ],
        array: [
            [ "[ ]", "$$ = [];" ],
            [ "[ elements ]", "$$ = $2;" ]
        ],
        elements: [
            [ "elements , primaryExpression", "$1.push($3); $$ = $1" ],
            [ "elements primaryExpression", "$1.push($2); $$ = $1" ],
            [ "primaryExpression", "$$ = [ $1 ];" ]
        ],
        object: [
            [ "{ }", "$$ = {};" ],
            [ "{ properties }", "$$ = $2;" ]
        ],
        properties: [
            [ "properties , name : primaryExpression", "$$ = $1; $$[$3] = $5;" ],
            [ "properties name : primaryExpression", "$$ = $1; $$[$2] = $4;" ],
            [ "name : primaryExpression", "$$ = {}; $$[$1] = $3;" ]
        ],

        string: [
            [ "STRING", "$$ = $1.substring(1, $1.length - 1);" ]
        ],
        name: [
            [ "IDENTIFIER", passThrough ],
            [ "string", passThrough ],
            [ "TRUE", passThrough ],
            [ "FALSE", passThrough ],
            [ "NULL", passThrough ],
            [ "UNDEFINED", passThrough ]
        ]
    }
};

export default grammar;
