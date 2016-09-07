// based on vehicleType, additionaData schema is different  
var idl = (data) => ({
    vehicleType: 'string',
    model: 'string',
    // written as hash lookup
    additionalData: {
        bike: {
            frameNumber: 'string'
        },
        car: {
            VIN: 'string',
            plateNumber: 'string'
        }
    }[data.vehicleType],
    // or better written as getter to indicate dynamic nature
    get additionalData2() {
        return {
            bike: {
                frameNumber: 'string'
            },
            car: {
                VIN: 'string',
                plateNumber: 'string'
            }
        }[data.vehicleType];
    },
    // or as function call
    additionalData3: additionalData(data.vehicleType)
    
    // other options include requiring external schemas etc
});

function additionalData(vehicleType) {
    return {
        bike: {
            frameNumber: 'string'
        },
        car: {
            VIN: 'string',
            plateNumber: 'string'
        }
    }[vehicleType];
}
module.exports = idl;
