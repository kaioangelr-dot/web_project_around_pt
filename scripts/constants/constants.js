//selectors for the edit profile button and the edit profile form
export const editBtn = document.querySelector(".profile__edit-button");
export const editForm = document.querySelector("#edit-profile-form");

//selectors for the input fields of the edit profile form
export const editName = editForm.querySelector("#name");
export const editDescription = editForm.querySelector("#description"); /* prettier-ignore */

//selectors for the add card button and the add card form
export const addCardBtn = document.querySelector(".profile__add-button");
export const addCardForm = document.querySelector("#new-card-form");

//selectors for the input fields of the add card form
export const configSelectors = {
  inputSelector: ".popup__input",
  submitBtnSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
