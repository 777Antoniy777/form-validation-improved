const form = document.querySelector('.registration');
const inputs = document.querySelectorAll('input');
const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const templateContent = document.querySelector('#template').content;

const addMessage = (inputWrap, templateCont, mes) => {
    let messageTemplate;

    inputWrap.append(templateCont);
    messageTemplate = inputWrap.querySelector('.input-message span');
    messageTemplate.textContent = mes;
}

const removeMessage = (mesWrap) => {
    if (mesWrap) {
        mesWrap.remove();
    }
};

const setCond = (input) => {
    if (input.value.length > 0 && input.value.length <= 2) {
        return true;
    }
    return false;
};

const setOptions = (...rest) => {
    const [mesWrap, inputWrap, input, tempCont, mes, status, setCond] = rest;
    const condition = setCond(input);

    if (condition) {
        input.classList.add('invalid');

        if (status === 'mouseout' || status === 'focusout') {
            removeMessage(mesWrap);
        }

        if (status === 'mouseover' || status === 'focus') {
            removeMessage(mesWrap);
            addMessage(inputWrap, tempCont, mes);
        }

        return false;
    } 
    else {
        if (document.activeElement !== input) {
            removeMessage(mesWrap);
        }   
    }
};

const isMinLength = (input, min, status) => {
    const inputWrapper = input.closest('.registration__input-wrapper');
    const clonnedTemplateContent = templateContent.cloneNode(true);
    let messageWrapper;
    if (inputWrapper) messageWrapper = inputWrapper.querySelector('.input-message');

    const condition = input.value.length > 0 && input.value.length <= 2;

    input.classList.remove('invalid');

    setOptions(
        messageWrapper,
        inputWrapper,
        input,
        clonnedTemplateContent,
        'Min length should be 3 characters',
        status,
        setCond,
    );
};

const isMatchEmail = (input, status) => {
    const inputWrapper = input.closest('.registration__input-wrapper');
    const clonnedTemplateContent = templateContent.cloneNode(true);
    let messageWrapper;
    if (inputWrapper) messageWrapper = inputWrapper.querySelector('.input-message');
    input.classList.remove('invalid');
    const t = !input.value.match(emailRe) && input.value;

    setOptions(
        messageWrapper,
        inputWrapper,
        input,
        clonnedTemplateContent,
        'Value should be email adress',
        status,
        setCond,
    );
};

const onFormMouseover = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) {
        if (document.activeElement !== userInput) {
            isMinLength(target, 2, 'mouseover');
        } else {
            isMinLength(target, 2);
        }
    }

    if (emailInput) {
        if (document.activeElement !== emailInput) {
            isMatchEmail(target, 'mouseover');
            console.log('mouseover1')
        } else {
            isMatchEmail(target);
            console.log('mouseover2')
        }
    }
};

const onFormMouseout = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) {
        if (document.activeElement !== userInput) {
            isMinLength(target, 2, 'mouseout');
            console.log('mouseout1')
        } else {
            isMinLength(target, 2);
            console.log('mouseout2')
        }
    }

    if (emailInput) {
        if (document.activeElement !== emailInput) {
            isMatchEmail(target, 'mouseout');
        } else {
            isMatchEmail(target);
        }
    }
};

const onFormFocusin = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) {
        isMinLength(target, 2, 'focus');
        console.log('focus1')
    }

    if (emailInput) {
        isMatchEmail(target, 'focus');
    }
};

const onFormFocusout = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (document.activeElement !== userInput) {
        isMinLength(target, 2, 'focusout');
        console.log('focusout1', target)
    } else {
        isMinLength(target, 2);
        console.log('focusout2')
    }

    if (document.activeElement !== emailInput) {
        isMatchEmail(target, 'focusout');
    } else {
        isMatchEmail(target);
    }
};

const onFormInput = (evt) => {
    const target = evt.target;
    const input = target.closest('input');

    if (!input || input.dataset.status === 'change') return false;
    if (!input.value.length) return false;

    console.log(target);
};

form.addEventListener('mouseover', onFormMouseover);
form.addEventListener('mouseout', onFormMouseout);
form.addEventListener('focusin', onFormFocusin);
form.addEventListener('focusout', onFormFocusout);
form.addEventListener('input', onFormInput);