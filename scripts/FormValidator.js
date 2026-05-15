//configuration object for the form validation, containing the selectors and class names used in the validation process
export const config = {
  inputSelector: ".popup__input",
  submitBtnSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//import the configuration object for form validation from the FormValidator.js file
export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector)); //prettier-ignore
    this._submitBtn = this._formElement.querySelector(
      this._config.submitBtnSelector,
    );
  }

  //show error messages and changes the form styles
  _showInputError(inputElement, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-input-error`); //prettier-ignore
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  //remove error messages and styles
  _hideInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}-input-error`); //prettier-ignore
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  //reset the validation state of the form, clearing any error messages and resetting the submit button state
  resetValidation() {
    this._toggleButtonState();
    if (!document.querySelector(".popup_is-opened")) {
      this._inputList.forEach((input) => this._hideInputError(input));
    }
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
    const allValid = this._inputList.every((input) => input.validity.valid);
    this._submitBtn.disabled = !allValid;
  }

  //check if theres any invalid camp and add an error message and disable the button, if not, the error message is hiden and the button abled
  setEventListeners() {
    //add event listeners to the inputs of the form, input validity, and toggle the button state every time the user types something in the input
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
}
