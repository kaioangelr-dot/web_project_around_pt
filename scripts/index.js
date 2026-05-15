import { FormValidator, config } from "./FormValidator.js";

//import the Card class from the Card.js file to create and manage card elements on the page
import Card from "./Card.js";
//import the necessary elements and functions from the utils.js file to manage the popups and forms on the page
import {
  handleEscapeKey,
  openModal,
  closeModal,
  handleOpenEditModal,
  handleProfileFormSubmit,
  handleCardFormSubmit,
} from "./utils.js";

//selectors for all popups on the page
const popups = document.querySelectorAll(".popup");

//selectors for the edit profile button and the edit profile popup
const editBtn = document.querySelector(".profile__edit-button");
export const editPopup = document.querySelector("#edit-popup");
const editForm = editPopup.querySelector(".popup__form");

//all close buttons selector
const closeBtns = document.querySelectorAll(".popup__close");

//selectors for the profile name and description elements on the page
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description",
);

//selectors for the edit profile popup and its form inputs
export const editName = editPopup.querySelector(".popup__input_type_name");
export const editDescription = editPopup.querySelector(".popup__input_type_description"); /* prettier-ignore */

//selectors for the cards container and the add card popup and its form
export const cardsContainer = document.querySelector(".cards__list");
const addCardBtn = document.querySelector(".profile__add-button");
export const addCardPopup = document.querySelector("#new-card-popup");
const addCardForm = addCardPopup.querySelector(".popup__form");

//create instances of the FormValidator class for the edit profile form and the add card form, passing the configuration object and the respective form element to the constructor
const cardFormValidator = new FormValidator(config, addCardForm);
const profileFormValidator = new FormValidator(config, editForm);

//array to store the form validator instances for easy access when resetting the validation state of the forms
export const arrFormValidators = [cardFormValidator, profileFormValidator];

const initialCards = [
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

//fills the edit form with the current profile name and description
export function fillProfileForm() {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
}

//renders a new card with the provided name and link and adds it to the container
export function renderCard(name, link, container) {
  //create a new card instance using the Card class and the provided name and link
  const card = new Card({ name, link }, "#card-template");

  //generate the card element using the generateCard method of the Card class
  const cardElement = card.generateCard();

  //add the card to the container in the beginning of the list
  container.prepend(cardElement);
}

//render the initial cards on the page by iterating over the initialCards array and calling the renderCard function for each card
initialCards.forEach((card) => renderCard(card.name, card.link, cardsContainer)); //prettier-ignore

//adds event listeners to the edit button to open the edit popup and fill the form with the current profile name and description when the button is clicked
editBtn.addEventListener("click", handleOpenEditModal);

//adds an event listener to the edit form to handle the form submission and update the profile information
editPopup.addEventListener("submit", handleProfileFormSubmit);

//adds event listeners to the add card button
addCardBtn.addEventListener("click", () => openModal(addCardPopup));

//adds an event listener to the add card form to handle the form submission and add a new card to the page
addCardPopup.addEventListener("submit", handleCardFormSubmit);

//adds event listeners to all close buttons and popups to close the respective popup when the button is clicked or when the user clicks outside the popup content
[popups, closeBtns].forEach((closeElements) => {
  closeElements.forEach((element) => {
    element.addEventListener("click", (evt) => {
      const popup = element.closest(".popup_is-opened");
      if (evt.target === element) {
        closeModal(popup);
      }
    });
  });
});

//add event listeners to the inputs of the forms, input validity, and toggle the button state every time the user types something in the input
arrFormValidators.forEach((formValidator) => formValidator.setEventListeners());
