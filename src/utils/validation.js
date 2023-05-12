export const validate = (value, rules) => {
    let isValid = true;
    let errorMessage = '';

    if (rules.required && value.trim() === '') {
        errorMessage = 'This field is required';
        isValid = false;
    }

    if (rules.minLength && value.length < rules.minLength) {
        errorMessage = `This field must be at least ${rules.minLength} characters long`;
        isValid = false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        errorMessage = `This field must be at most ${rules.maxLength} characters long`;
        isValid = false;
    }

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = 'Invalid email address';
        isValid = false;
    }

    return {
        isValid: isValid,
        errorMessage: errorMessage,
    };
};
