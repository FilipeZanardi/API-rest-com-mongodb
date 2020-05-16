
'use strict';

let errors = [];

function ValidationContract(){
    errors =[]
}

ValidationContract.prototype.isRequired =(value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMinLen =  (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMaxLen =  (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}


ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.'']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    if(!reg.test(value))
        errors.push({ message: message});
}



exports.errors = errors;

exports.clear = async () => {
    errors = [];
}

exports.isValid = async () => {
    return errors.length == 0;
}
