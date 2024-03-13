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