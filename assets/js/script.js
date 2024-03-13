function handleEmptyInput(input) {
    const fieldBox = input.parentNode;
    const { value: inputValue } = input;

    if (inputValue === '') {
        const alert = createAlert('This field is required');
        input.insertAdjacentElement('afterend', alert);

        fieldBoxAlert(fieldBox, true);
        return;
    }

    fieldBoxAlert(fieldBox, false);
    return true;
}

function handleInput(input) {
    let isValid = true;

    const regex = /^[0-9]+$/;
    const { value: inputValue } = input;
    const fieldBox = input.parentNode;

    if (input.id === 'userBirthDay') {
        if (!regex.test(inputValue) || inputValue < 1 || inputValue > 31) {
            const alert = createAlert('Must be a valid day');
            input.insertAdjacentElement('afterend', alert);

            fieldBoxAlert(fieldBox, true);
            isValid = false;
        }
    }

    if (input.id === 'userBirthMonth') {
        if (!regex.test(inputValue) || inputValue < 1 || inputValue > 12) {
            const alert = createAlert('Must be a valid month');
            input.insertAdjacentElement('afterend', alert);

            fieldBoxAlert(fieldBox, true);
            isValid = false;
        }
    }

    if (input.id === 'userBirthYear') {
        const currentDate = new Date();
        const year = currentDate.getFullYear();

        if (!regex.test(inputValue) || inputValue < 1) {
            const alert = createAlert('Must be a valid year');
            input.insertAdjacentElement('afterend', alert);

            fieldBoxAlert(fieldBox, true);
            isValid = false;
        }

        if (inputValue > year) {
            const alert = createAlert('Must be in the past');
            input.insertAdjacentElement('afterend', alert);

            fieldBoxAlert(fieldBox, true);
            isValid = false;
        }
    }

    return isValid;
}