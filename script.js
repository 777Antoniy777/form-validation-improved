const form = document.querySelector('.registration');
const inputs = document.querySelectorAll('input');
const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
console.log(inputs);

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

const hideMessage = (mesWrap) => {
    if (mesWrap) {
        mesWrap.classList.add('hidden');
    }
};

const isMinLength = (input, min, status) => {
    const inputWrapper = input.closest('.registration__input-wrapper');
    const clonnedTemplateContent = templateContent.cloneNode(true);
    const messageWrapper = inputWrapper.querySelector('.input-message');
    input.classList.remove('invalid');

    removeMessage(messageWrapper);

    if (input.value.length > 0 && input.value.length <= min) {
        input.classList.add('invalid');

        if (status) {
            addMessage(inputWrapper, clonnedTemplateContent, 'Min length should be 3 characters');
        }

        return false;
    }
};

const isMatchEmail = (input, re) => {
    if (!input.value.match(re)) {
        console.log('value should be email adress');
        return false;
    }
};

const onFormFocusin = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');

    if (userInput) {
        isMinLength(target, 2, true);
    }
};

const onFormFocusout = (evt) => {
    const target = evt.target;
    const input = target.closest('input');
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (input.dataset.status === 'input') return false;

    if (userInput) {
        isMinLength(target, 2);
    }

    if (emailInput) {
        isMatchEmail(target, emailRe)
    }
};

const onFormInput = (evt) => {
    const target = evt.target;
    const input = target.closest('input');

    if (!input || input.dataset.status === 'change') return false;
    if (!input.value.length) return false;

    console.log(target);
};

form.addEventListener('focusin', onFormFocusin);
form.addEventListener('focusout', onFormFocusout);
form.addEventListener('input', onFormInput);