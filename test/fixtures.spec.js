/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var sjss = require("../src/sjss.js");
var assert = require("assert");
var glob = require("glob");
var debugSchema = require("debug")("schema");

describe("Simplified Schema Syntax", function() {




    // make at least on method, so before gets called
    it("_load test files", function(done) {
        done();
    });
    before(function(done) {

        var addIt = this.test.parent.addTest.bind(this.test.parent);
        glob("./fixtures/*.in.*", { cwd: __dirname }, function(err, files) {
            files && files
                .map(file2testData)
                .forEach(function(file) {
                    addIt(_it(file));
                });
            done(err, files);
        });

        function file2testData(file) {
            return {
                input: file,
                expected: file.replace(".in.", ".out."),
                data: file.replace(".in.", ".data.")
            }
        }
    });
    // then this will become many it() registered in before();
    function _it(test) {

        return it("test for " + test.input, function() {
            // load
            var sjssSchema = require(test.input);
            var jsonSchema = require(test.expected);
            if (typeof sjssSchema === "function") {

                // optional data, then e is expected to be a function
                var payload;
                try {
                    payload = require(test.data);
                } catch (ex) {}

                sjssSchema = sjssSchema(payload);
            }

            // execute
            var generatedSchema = sjss(sjssSchema);
            debugSchema(JSON.stringify(generatedSchema, null, 2));
            // assert
            assert.deepEqual(generatedSchema, jsonSchema);
        });
    }
});
