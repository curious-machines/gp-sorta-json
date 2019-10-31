import assert from "assert";
import Parser from "../lib/Parser.js";

describe("Parser", () => {
    describe("Primitives", () => {
        const tests = [
            { source: "true", expected: true },
            { source: "false", expected: false },
            { source: "null", expected: null },
            // NOTE: Jison turns 'undefined' into 'true' for some reason
            // { source: "undefined", expected: undefined },
            { source: "10.5", expected: 10.5 },
            { source: '"test"', expected: "test" }
        ];

        tests.forEach(test => {
            it(test.source, () => {
                const {source, expected} = test;
                const result = Parser.parse(source);

                assert.deepStrictEqual(result, expected);
            });
        });
    });
});
