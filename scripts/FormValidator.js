const forms = document.querySelectorAll(".popup__form");

//configuration object for the form validation, containing the selectors and class names used in the validation process
const config = {
  inputSelector: ".popup__input",
  submitBtnSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector)); //prettier-ignore
    this._submitBtn = this._formElement.querySelector(this._config.submitBtnSelector); //prettier-ignore
  }

  //show error messages and changes the form styles
  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.parentElement.querySelector(
    `.${inputElement.id}-input-error`); //prettier-ignore
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  //remove error messages and styles
  _hideInputError(inputElement) {
    const errorElement = inputElement.parentElement.querySelector(
    `.${inputElement.id}-input-error`); //prettier-ignore
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  //check if theres any invalid camp and add an error message, if not, the error message is hiden
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //disable button if any input is invalid
  _toggleButtonState() {
    const allValid = this._inputList.every((input) => input.validity.valid); //prettier-ignore
    this._submitBtn.disabled = !allValid;
  }

  //check if theres any invalid camp and add an error message and disable the button, if not, the error message is hiden and the button abled
  setEventListeners() {
    //initial button state
    this._toggleButtonState();

    //add event listeners to the inputs of the form, input validity, and toggle the button state every time the user types something in the input
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
}

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.setEventListeners();
});
