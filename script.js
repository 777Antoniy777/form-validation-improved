const form = document.querySelector('.registration');
const inputs = document.querySelectorAll('input');
const templateContent = document.querySelector('#template').content;
const MIN_LENGTH = 2;
const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        const [input, mes, status, setCondition] = rest;
        const inputWrapper = input.closest('.registration__input-wrapper');
        const clonnedTemplateContent = templateContent.cloneNode(true);
        let condition;
        let messageWrapper;
        if (inputWrapper) messageWrapper = inputWrapper.querySelector('.input-message');

        if (input.id === 'username') {
            condition = setCondition(input, input.value.length > 0 && input.value.length <= MIN_LENGTH);
        } else if (input.id === 'email') {
            condition = setCondition(input, !input.value.match(EMAIL_REG) && input.value);
        }

        if (condition) {
            input.classList.add('invalid');

            this.removeMessage(messageWrapper);
            if (status) this.addMessage(inputWrapper, clonnedTemplateContent, mes);

            return false;
        } else {
            input.classList.remove('invalid');

            if (document.activeElement !== input) {
                this.removeMessage(messageWrapper);
            }   
        }
    }

    checkValidityField(cond, target, status) {
        if (cond) {
            if (status) {
                this.isMinLength(target, true);
                return true;
            }

            this.isMinLength(target);
        }
    }
};

class UsernameValidation extends Validation {
    isMinLength(input, status) {
        this.setOptions(input, 'Min length should be 3 characters', status, this.setCondition);
    }
};

class EmailValidation extends Validation {
    isMatchEmail(input, status) {
        this.setOptions(input, 'Value should be email adress', status, this.setCondition);
    }
};

const usernameValidation = new UsernameValidation();
const emailValidation = new EmailValidation();

const onFormMouseover = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) usernameValidation.isMinLength(userInput, true);
    if (emailInput) emailValidation.isMatchEmail(emailInput, true);
};

const onFormMouseout = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput && document.activeElement !== userInput) usernameValidation.isMinLength(userInput, false);
    if (emailInput && document.activeElement !== emailInput) emailValidation.isMatchEmail(emailInput, false);
};

const onFormFocusin = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) usernameValidation.isMinLength(userInput, true);
    if (emailInput) emailValidation.isMatchEmail(emailInput, true);
};

const onFormFocusout = (evt) => {
    const target = evt.target;
    const userInput = target.closest('input[id="username"]');
    const emailInput = target.closest('input[id="email"]');

    if (userInput) usernameValidation.isMinLength(userInput, false);
    if (emailInput) emailValidation.isMatchEmail(emailInput, false);
};

form.addEventListener('mouseover', onFormMouseover);
form.addEventListener('mouseout', onFormMouseout);
form.addEventListener('focusin', onFormFocusin);
form.addEventListener('focusout', onFormFocusout);