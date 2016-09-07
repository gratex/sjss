/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var sjss = require("../src/sjss.js");
var assert = require("assert");

describe("sjss (Simplified JSONSchema Syntax)", function() {

    it("complex sample", function() {
        var sjssSyntax = {
            a: 'integer',
            b: 'number',
            c: [{ d: 'string', e: {} }],
            f: function() {
                return {
                    type: ["boolean", "null"]
                };
            },
            g: ["integer", "null"]
        };

        var expectedSchema = {
            "type": "object",
            "properties": {
                "a": {
                    "type": "integer"
                },
                "b": {
                    "type": "number"
                },
                "c": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "d": {
                                "type": "string"
                            },
                            "e": {
                                "type": "object"
                            }
                        }
                    }
                },
                "f": {
                    "type": [
                        "boolean",
                        "null"
                    ]
                },
                "g": {
                    "type": "array",
                    "items": [{
                        "type": "integer"
                    }, {
                        "type": "null"
                    }]
                }
            }
        };
        var r = sjss(sjssSyntax);
        assert.deepEqual(r, expectedSchema);
    });

    it("string - not schema type", function() {
        assert.deepEqual(sjss({
            id: 'exact string expected'
        }), {
            type: 'object',
            properties: {
                id: { "enum": ['exact string expected'] },
            }

        }, "non standard string shell be replaced by 'constant'");
    });

    it("array - options", function() {
        var r = sjss({ a: ['string'], b: ['number'] }, { items: { minItems: 1 } });
        assert.deepEqual(r, {
            type: 'object',
            properties: {
                a: {
                    type: 'array',
                    items: { type: "string" },
                    minItems: 1
                },
                b: {
                    type: 'array',
                    items: { type: "number" },
                    minItems: 1
                }
            }
        }, "each array shell be generated with specified properties");
    });
});
