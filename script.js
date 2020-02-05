const form = document.querySelector('.registration');
const inputs = document.querySelectorAll('input');
const templateContent = document.querySelector('#template').content;
const MIN_LENGTH = 2;
const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USER_REG = /aaaa/;

const Errors = {
    USERNAME: {
        IS_MIN_LENGTH: 'Min length should be 3 characters',
        IS_MATCH_REG: 'Value should be aaaa',
    },
    EMAIL: {
        IS_MATCH_REG: 'Value should be email',
    },
};

class Validation {
    addMessage (inputWrap, templateCont, mes) {
        let messageTemplate;

        inputWrap.append(templateCont);
        messageTemplate = inputWrap.querySelector('.input-message span');
        messageTemplate.textContent = mes;
    }

    removeMessage(mesWrap) {
        if (mesWrap) mesWrap.remove();
    }

    setCondition(input, cond) {
        if (input.value) {
            if (cond) return true;
        }
        return false;
    }

    setOptions(...rest) {
        const [input, status, setCondition] = rest;
        const inputWrapper = input.closest('.registration__input-wrapper');
        const clonnedTemplateContent = templateContent.cloneNode(true);
        let condition;
        let messageWrapper;
        if (inputWrapper) messageWrapper = inputWrapper.querySelector('.input-message');

        let message = '';

        if (input.id === 'username') {
            const isMinLength = setCondition(input, input.value.length > 0 && input.value.length <= MIN_LENGTH);
            const isMatchReg = setCondition(input, !input.value.match(USER_REG) && input.value);

            if (isMinLength) {
                condition = isMinLength;
                message = Errors.USERNAME.IS_MIN_LENGTH;
            } else if (!isMinLength && isMatchReg) {
                condition = isMatchReg;
                message = Errors.USERNAME.IS_MATCH_REG;
            }

        } else if (input.id === 'email') {
            const isMatchReg = setCondition(input, !input.value.match(EMAIL_REG) && input.value);

            if (isMatchReg) {
                condition = isMatchReg;
                message = Errors.EMAIL.IS_MATCH_REG;
            }
        }

        if (condition) {
            input.classList.add('invalid');

            this.removeMessage(messageWrapper);
            if (status) this.addMessage(inputWrapper, clonnedTemplateContent, message);

            return false;
        } else {
            input.classList.remove('invalid');

            if (document.activeElement !== input) {
                this.removeMessage(messageWrapper);
            }   
        }
    }

    checkValidtity(input, status) {
        this.setOptions(input, status, this.setCondition);
    }
};

const validaion = new Validation();

const onFormMouseover = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) validaion.checkValidtity(userInput, true);
    if (emailInput) validaion.checkValidtity(emailInput, true);
};

const onFormMouseout = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput && document.activeElement !== userInput) validaion.checkValidtity(userInput, false);
    if (emailInput && document.activeElement !== emailInput) validaion.checkValidtity(emailInput, false);
};

const onFormFocusin = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) validaion.checkValidtity(userInput, true);
    if (emailInput) validaion.checkValidtity(emailInput, true);
};

const onFormFocusout = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) validaion.checkValidtity(userInput, false);
    if (emailInput) validaion.checkValidtity(emailInput, false);
};

form.addEventListener('mouseover', onFormMouseover);
form.addEventListener('mouseout', onFormMouseout);
form.addEventListener('focusin', onFormFocusin);
form.addEventListener('focusout', onFormFocusout);