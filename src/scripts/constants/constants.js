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

//selectors for the profile title and description elements, which will be updated with the user's information when the page loads
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description",
);

//selector for the avatar pic
export const profileAvatar = document.querySelector(".profile__image");
export const avatarBtn = document.querySelector(".profile__image-container");
export const avatarForm = document.querySelector("#avatar-form");
