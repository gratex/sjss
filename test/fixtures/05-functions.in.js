module.exports = {
    // use functions to generate any schema object for given property,
    // return 'object of schema from yor function'
    definedByFunction: function() {
        return {
            type: "whatever",
            _: "build schema for this field with functions"
        }
    },
    v3requiredProperty: function() {

        return { type: 'boolean', required: true };
    }
}
