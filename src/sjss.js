// summary:
//      Shortened syntax for JSONSchema, 
// description:
//      inspired by strummer https://www.npmjs.com/package/strummer
//      but main 
// example:
//      
//      | code

// by pmelisko

var traverse = require('traverse');

module.exports = struct2Schema;

function struct2Schema(struct, options) {

    return traverse(struct).map(function(value) {
        this.after(function() {
            transform.call(this, this.node, options);
        });
        if (this.isLeaf) {
            transform.call(this, value, options);
        }
    });
}


function transform(value, options) {

    options || (options = {});
    // console.log(this.key);
    if (isArray(value)) {
        this.update(Object.assign({
            type: "array",
            items: value.length > 1 ? value : value[0]
        }, options.items), true);
    } else if (isPlainObject(value) && !isEmptyObject(value)) {

        this.update({
            type: "object",
            properties: value
        }, true);
    } else if (isFunction(value)) {
        var jsType = isJsStandardType(value)
        if (jsType) {
            this.update(jsType, true); // execute function
        } else {
            this.update(value(), true); // execute function
        }

    } else if (typeof value == "string") {
        if (isJsonStandardType(value)) {
            this.update({ // primitive type (explicitely defined as string)
                type: value
            }, true);
        } else {
            this.update({
                "enum": [value]
            }, true);
        }

    } else {
        this.update({
            type: "object"
        }, true);
    }
}

var toString = Object.prototype.toString;

function isPlainObject(arg) {
    return toString.call(arg) === '[object Object]';
}

function isArray(arg) {
    return toString.call(arg) === '[object Array]';
}

function isFunction(arg) {
    return toString.call(arg) === '[object Function]';
}

function isEmptyObject(org) {
    return !Object.keys(org).length;
}

function isJsonStandardType(str) {
    //http://json-schema.org/latest/json-schema-core.html
    return /^(array|boolean|integer|number|null|object|string)$/.test(str);
}

function isJsStandardType(type) {
    //http://json-schema.org/latest/json-schema-core.html
    switch (type) {
        case Number:
            return { type: 'number' }
        case String:
            return { type: 'string' }
        default:
            return null;
    }
}