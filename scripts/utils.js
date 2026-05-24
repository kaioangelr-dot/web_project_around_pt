import Card from "./Card.js";

import PopupWithImage from "./Components/PopupWithImage.js";

import {
  cardList,
  editPopupInstance,
  addCardPopupInstance,
  userInfoInstance,
} from "./index.js";

//adds the new profile name and description to the page and closes the edit popup when the form is submitted
export function handleProfileFormSubmit(inputs) {
  userInfoInstance.setUserInfo({
    name: inputs.name,
    description: inputs.description,
  });

  editPopupInstance.close();
}

//adds an event listener to the add card form to handle the form submission and add a new card to the page
export function handleCardFormSubmit(inputs) {
  //create a new card instance using the input values from the form and add it to the page by calling the addItem method of the cardList instance, then close the add card popup
  const card = new Card(
    { name: inputs.name, link: inputs.link },
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

  addCardPopupInstance.close();
}
