"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (options.username.length < 2) {
        return [
            {
                field: 'username',
                message: 'Username length must be at least 3 characters',
            },
        ];
    }
    if (options.username.includes('@')) {
        return [
            {
                field: 'username',
                message: 'Username cannot consist an @',
            },
        ];
    }
    if (!options.email.includes('@')) {
        return [
            {
                field: 'email',
                message: 'Please enter a valid Email Address',
            },
        ];
    }
    if (options.password.length < 2) {
        return [
            {
                field: 'password',
                message: 'Password length must be at least 3 characters',
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map