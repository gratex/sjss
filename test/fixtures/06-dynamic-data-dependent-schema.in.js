// sjss can be function itself
// this allows for very dynamic schemas
// based on payload itself or other context

module.exports = function(payload) {
    // sample: schema, where prop2 is number or string based on prop1 value
    return {
        prop1: 'string',
        prop2: payload.prop1.length > 10 ? 'number' : 'string'
    }
}
