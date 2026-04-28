//inputs selector
const inputs = document.querySelectorAll(".popup__input");

//show error messages and changes the form styles
function showInputError(inputElement, errorMessage) {
  const errorElement = inputElement.parentElement.querySelector(
    `.${inputElement.id}-input-error`); //prettier-ignore
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

//remove error messages and styles
function hideInputError(inputElement) {
  const errorElement = inputElement.parentElement.querySelector(
    `.${inputElement.id}-input-error`); //prettier-ignore
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
}

//disable button if any input is invalid
function toggleButtonState(inputElement) {
  const currentForm = inputElement.closest(".popup__form");
  const formInputs = currentForm.querySelectorAll(".popup__input");
  const allValid = Array.from(formInputs).every((input) => input.validity.valid); //prettier-ignore
  const btn = currentForm.querySelector(".popup__button");
  btn.disabled = !allValid;
}

//check if theres any invalid camp and add an error message and disable the button, if not, the error message is hiden and the button abled
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
    } else {
      hideInputError(input);
    }
    toggleButtonState(input);
  });
});
