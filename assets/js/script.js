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

function handleValidDate(inputs) {
    let inputBirthDay = null;
    let isValid = true;

    let year = null;
    let month = null;
    let day = null;

    inputs.forEach(input => {
        removeAlert(input.nextElementSibling);
        const { value: inputValue } = input;

        if (input.id === 'userBirthDay') {
            day = inputValue.replace(/^0+/, '');
            inputBirthDay = input;
        }

        if (input.id === 'userBirthMonth') month = inputValue.replace(/^0+/, '');
        if (input.id === 'userBirthYear') year = inputValue.replace(/^0+/, '');
    });

    const currentDate = new Date();

    currentDate.setFullYear(year);
    currentDate.setMonth(month - 1);
    currentDate.setDate(day);

    const formatDate = currentDate.toLocaleDateString();
    const resultDate = `${month}/${day}/${year}`;

    if (formatDate !== resultDate) {
        const fieldBox = inputBirthDay.parentNode;
        const alert = createAlert('Must be a valid date');
        inputBirthDay.insertAdjacentElement('afterend', alert);

        fieldBoxAlert(fieldBox, true);
        isValid = false;
    }

    return isValid;
}

function handleAgeCalculator(userBirthDay, userBirthMonth, userBirthYear) {
    const userBirthDate = new Date(`${userBirthYear}-${userBirthMonth}-${userBirthDay}`);
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const userResultDate = new Date(currentDate - userBirthDate);

    let userAgeDays = userResultDate.getDate() - 1;
    let userAgeMonths = userResultDate.getMonth();
    let userAgeYears = currentYear - userBirthYear;

    if (
        (userBirthYear == currentYear && userBirthMonth > currentMonth) ||
        (userBirthYear == currentYear && userBirthMonth == currentMonth && userBirthDay >= currentDay)) {
        userAgeDays = 0;
        userAgeMonths = 0;
    }

    if (userBirthDay > currentDay && userBirthMonth >= currentMonth) userAgeYears--;
    if(userAgeYears < 0) userAgeYears = 0;

    displayAgeResult(userAgeDays, userAgeMonths, userAgeYears);
}

function displayAgeResult(days, months, years) {
    let initDays = 0;
    let initMonths = 0;
    let initYear = 0;

    const calculatorYearResult = document.getElementById('calculatorYearResult');
    const calculatorMonthResult = document.getElementById('calculatorMonthResult');
    const calculatorDayResult = document.getElementById('calculatorDaysResult');

    const yearAnimation = setInterval(() => {
        if (initYear === years) clearInterval(yearAnimation);

        calculatorYearResult.textContent = initYear;
        initYear++;
    }, 50);

    const monthAnimation = setInterval(() => {
        if (initMonths === months) clearInterval(monthAnimation);

        calculatorMonthResult.textContent = initMonths;
        initMonths++;
    }, 50);

    const dayAnimation = setInterval(() => {
        if (initDays === days) clearInterval(dayAnimation);

        calculatorDayResult.textContent = initDays;
        initDays++;
    }, 50);
}