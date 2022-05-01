import validator from 'validator'

const signUpValidate = (user) => {
    const name = user.name
    const surname = user.surname
    const email = user.email
    const password = user.password

    let response = {}

    if(name >= 2) {
        response[name] = true
    } else {
        response[name] = false
    }

    if(surname >= 2) {
        response[surname] = true
    } else {
        response[surname] = false
    }

    if(validator.isEmail(email)) {
        response[email] = true
    } else {
        response[email] = false
    }

    if (validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        response[password] = true
    } else {
        response[password] = false
    }
}

module.exports = {
    signUpValidate
}