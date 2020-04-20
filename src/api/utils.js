function validAPIrequest(data, parameterTypes) {
    if(!Array.isArray(data) || data.length !== parameterTypes.length) {
        return false;
    }

    for(let i = 0; i < data.length; i++) {
        if(typeof data[i] !== parameterTypes[i]) {
            return false;
        }
    }
    return true;
}

module.exports.validAPIrequest = validAPIrequest;