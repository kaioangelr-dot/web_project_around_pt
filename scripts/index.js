import UserInfo from "./Components/UserInfo.js";

import Popup from "./Components/Popup.js";

import PopupWithForm from "./Components/PopupWithForm.js";

import Section from "./Components/Section.js";

import FormValidator from "./FormValidator.js";

import Card from "./Card.js";

import PopupWithImage from "./components/PopupWithImage.js";

import Api from "./Components/Api.js";

import {
  editBtn,
  editForm,
  editName,
  editDescription,
  addCardBtn,
  addCardForm,
  configSelectors,
  profileTitle,
  profileDescription,
  profileAvatar,
  avatarBtn,
  avatarForm,
} from "./constants/constants.js";
import PopupWithConfirmation from "./Components/PopupWithConfirmation.js";

//----------------------------------------------------//   Instances   //--------------------------------------------//

const cardFormValidator = new FormValidator(configSelectors, addCardForm);
const profileFormValidator = new FormValidator(configSelectors, editForm);
const avatarFormValidator = new FormValidator(configSelectors, avatarForm);

const editPopupInstance = new PopupWithForm("#edit-popup", handleProfileFormSubmit); //prettier-ignore
const addCardPopupInstance = new PopupWithForm("#new-card-popup", handleCardFormSubmit); //prettier-ignore
const avatarInstance = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit); //prettier-ignore

const deletePopupInstance = new PopupWithConfirmation("#delete-popup", handleDeleteConfirmation); //prettier-ignore

const userInfoInstance = new UserInfo({ nameSelector: ".profile__title", descriptionSelector: ".profile__description"}); //prettier-ignore

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "255730f4-b854-443a-b66b-ed3f6dcae23a",
    "Content-Type": "application/json",
  },
});

//----------------------------------------------------//   Form handles   //--------------------------------------------//

//adds the new profile name and description to the page and closes the edit popup when the form is submitted
function handleProfileFormSubmit(inputs) {
  editPopupInstance.renderLoading(true);
  //change the name and description in the front end
  userInfoInstance.setUserInfo({
    name: inputs.name,
    description: inputs.description,
  });

  //change the name and description in the back end
  api
    .editUserInfo(inputs.name, inputs.description)
    .then((data) => {
      editPopupInstance.close();
    })
    .finally(() => editPopupInstance.renderLoading(false));
}

function handleCardFormSubmit(inputs) {
  addCardPopupInstance.renderLoading(true, "Crie");
  //store the inputs values and process them to create cards in the front end and add the card's image and name in the server
  api
    .addCard(inputs.name, inputs.link)
    .then((data) => {
      //The class Section will render the card and the  class Card will create the card, store the id, link and name.
      const cardList = new Section(
        {
          items: [data],
          renderer: (item) => {
            const card = new Card(
              { name: item.name, link: item.link, id: data._id },
              "#card-template",
              (cardImage, name, link) => {
                const imagePopupInstance = new PopupWithImage("#image-popup");
                cardImage.addEventListener("click", () => {
                  imagePopupInstance.open(name, link);
                  imagePopupInstance.setEventListeners();
                });
              },
              //updates the like status in the back end when the like button is pressed, but the button is activated in the front end.
              (id, isLiked, cardLikeBtn) => {
                api.toggleLike(id, isLiked, cardLikeBtn);
              },

              (id, cardElement) => {
                //save the values in a object when the popup is opened for the confirmation class.
                deletePopupInstance.open({ id: id, cardElement: cardElement });
              },
            );
            //generate the card
            const cardElement = card.generateCard();
            //add the item in the front end
            cardList.addItem(cardElement);
          },
        },
        ".cards__list",
      );
      //executes the preview function
      cardList.renderer();

      addCardPopupInstance.close();
    })
    .finally(() => addCardPopupInstance.renderLoading(false, "Crie"));
}

function handleAvatarFormSubmit(inputs) {
  avatarInstance.renderLoading(true);

  api
    .editAvatar(inputs.link)
    .then((data) => {
      profileAvatar.src = data.avatar;
      avatarInstance.close();
    })
    .finally(() => avatarInstance.renderLoading(false));
}

function handleDeleteConfirmation(id, cardElement) {
  api.deleteCard(id).then(() =>
    //remove the card in the front end if removed from the server
    cardElement.remove(),
  );

  deletePopupInstance.close();
}

//----------------------------------------------------//   Event listeners   //--------------------------------------------//

//enable the form validator
[cardFormValidator, profileFormValidator, avatarFormValidator].forEach(
  (formValidator) => formValidator.setEventListeners(),
);

//adds event listeners to all close buttons and popups to close the respective popup
[
  editPopupInstance,
  addCardPopupInstance,
  deletePopupInstance,
  avatarInstance,
].forEach((elements) => elements.setEventListeners());

//----------------------------------------------------//   open popup buttons   //--------------------------------------------//
editBtn.addEventListener("click", () => {
  //fills the form with the current values, in case the user only wants to edit the current values
  const { name, description } = userInfoInstance.getUserInfo();

  editName.value = name;
  editDescription.value = description;

  editPopupInstance.open();
  profileFormValidator.resetValidation();
});

addCardBtn.addEventListener("click", () => {
  addCardPopupInstance.open();
  cardFormValidator.resetValidation();
});

avatarBtn.addEventListener("click", () => {
  avatarInstance.open();
  avatarFormValidator.resetValidation();
});

//----------------------------------------------------//  Apis  //--------------------------------------------//

api.getAllData().then(([userData, cardsData]) => {
  //user data
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.src = userData.avatar;

  //card render data
  const cardList = new Section(
    {
      items: cardsData,
      //renderer function that creates a new card for each item in the initialCards array and adds it to the container
      renderer: (item) => {
        const card = new Card(
          { name: item.name, link: item.link, id: item._id, isLiked: item.isLiked, owner: item.owner }, //prettier-ignore
          "#card-template",
          //object with a handleCardClick method that creates a new instance of the PopupWithImage class and adds an event listener to the card image to open the popup with the respective name and link when the image is clicked
          (cardImage, name, link) => {
            const imagePopupInstance = new PopupWithImage("#image-popup");
            cardImage.addEventListener("click", () => {
              imagePopupInstance.open(name, link);
              imagePopupInstance.setEventListeners();
            });
          },
          //updates the like status in the back end when the like button is pressed, but the button is activated in the front end.
          (id, isLike, cardLikeBtn) => {
            api.toggleLike(id, isLike, cardLikeBtn);
          },

          (id, cardElement) => {
            deletePopupInstance.open({ id: id, cardElement: cardElement });
          },
        );

        const cardElement = card.generateCard();

        cardList.addItemAppend(cardElement);
      },
    },
    ".cards__list",
  );
  //call the renderer method of the cardList instance to render the initial cards on the page
  cardList.renderer();
});
