import UserInfo from "./Components/UserInfo.js";

import PopupWithForm from "./Components/PopupWithForm.js";

//import the necessary elements and functions from the utils.js file to manage the popups and forms on the page
import { handleProfileFormSubmit, handleCardFormSubmit } from "./utils.js";

import Section from "./Components/Section.js";

import FormValidator from "./FormValidator.js";

import Card from "./Card.js";

import PopupWithImage from "./components/PopupWithImage.js";

//import the necessary constants from the constants.js file to access the DOM elements and configuration for the forms and popups
import {
  editBtn,
  editForm,
  editName,
  editDescription,
  addCardBtn,
  addCardForm,
  configSelectors,
  initialCards,
} from "./constants/constants.js";

//create instances of the FormValidator class for the edit profile form and the add card form, passing the configuration object and the respective form element to the constructor
export const cardFormValidator = new FormValidator(configSelectors, addCardForm); //prettier-ignore
export const profileFormValidator = new FormValidator(configSelectors, editForm); //prettier-ignore

//add event listeners to the inputs of the forms, input validity, and toggle the button state every time the user types something in the input
[cardFormValidator, profileFormValidator].forEach((formValidator) => formValidator.setEventListeners()); //prettier-ignore

//enable validation for the forms by calling the enableValidation method of each form validator instance, which adds event listeners to the form inputs to validate the input values and toggle the submit button state accordingly
export const cardList = new Section(
  {
    items: initialCards,
    //renderer function that creates a new card for each item in the initialCards array and adds it to the container
    renderer: (item) => {
      const card = new Card(
        { name: item.name, link: item.link },
        "#card-template",
        //object with a handleCardClick method that creates a new instance of the PopupWithImage class and adds an event listener to the card image to open the popup with the respective name and link when the image is clicked
        (cardImage, name, link) => {
          const imagePopupInstance = new PopupWithImage("#image-popup");
          cardImage.addEventListener("click", () => {
            imagePopupInstance.open(name, link);
            imagePopupInstance.setEventListeners();
          });
        },
      );

      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  ".cards__list",
);

//render the initial cards on the page by calling the renderer method of the cardList instance, which iterates over the initialCards array and creates a card for each item using the provided renderer function
cardList.renderer();

//create instances of the Popup class for the edit profile popup and the add card popup, passing the respective popup selector to the constructor
export const editPopupInstance = new PopupWithForm("#edit-popup", handleProfileFormSubmit); //prettier-ignore
export const addCardPopupInstance = new PopupWithForm("#new-card-popup", handleCardFormSubmit); //prettier-ignore

//adds event listeners to all close buttons and popups to close the respective popup when the button is clicked or when the user clicks outside the popup content
[editPopupInstance, addCardPopupInstance].forEach((elements) => elements.setEventListeners()); //prettier-ignore

export const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

//adds event listeners to the edit button to open the edit popup and fill the form with the current profile name and description when the button is clicked
editBtn.addEventListener("click", () => {
  //get the current profile name and description from the page using the getUserInfo method of the userInfoInstance and store them in variables to be used when filling the edit profile form with the current values when the edit button is clicked
  const { name, description } = userInfoInstance.getUserInfo();

  editName.value = name;
  editDescription.value = description;
  editPopupInstance.open();
});

//adds event listeners to the add card button
addCardBtn.addEventListener("click", () => addCardPopupInstance.open());
