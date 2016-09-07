/*global describe:true,it:true,	after:true,before:true,afterEach:true,beforeEach:true */
var schema = require("../src/sjss.js");
var assert = require("assert");
var glob = require("glob");

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
                expected: file.replace(".in.", ".out.")
            }
        }
    });
    // then this will become many it() registered in before();
    function _it(data) {

        return it("test for " + data.input, function() {
            // load
            var i = require(data.input);
            var e = require(data.expected);
            // execute
            var o = schema(i);
            // assert
            assert.deepEqual(o, e);
        });
    }
});
