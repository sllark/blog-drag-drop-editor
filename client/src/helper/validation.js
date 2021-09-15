export const validateEmail = (email) => {

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
    }

    return false;
}

export const validatePassword = (password) => {

    if (password.length < 5) {
        return false;
    }

    return true;
}


