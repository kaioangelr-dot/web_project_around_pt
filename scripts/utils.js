//import the necessary elements and functions from the index.js file to manage the popups and forms on the page
import {
  editPopup,
  addCardPopup,
  profileName,
  profileDescription,
  editName,
  editDescription,
  cardsContainer,
  renderCard,
  fillProfileForm, //prettier-ignore
} from "./index.js";

//selectors for the add card popup form inputs
const addCardName = document.querySelector(".popup__input_type_card-name");
const addCardLink = document.querySelector(".popup__input_type_url");

//opens the modal by adding the "popup_is-opened" class to the modal element
export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

//closes the modal by removing the "popup_is-opened" class from the modal element
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

//opens the edit popup and fills the form with the current profile name and description when the edit button is clicked
export function handleOpenEditModal() {
  openModal(editPopup);
  fillProfileForm();
}

//adds the new profile name and description to the page and closes the edit popup when the form is submitted
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;

  closeModal(editPopup);
}

//adds an event listener to the add card form to handle the form submission and add a new card to the page
export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  //add a new card to the page using the values from the form inputs and then clear the form inputs
  renderCard(addCardName.value, addCardLink.value, cardsContainer);

  //clear the form inputs after adding the card
  addCardName.value = "";
  addCardLink.value = "";

  closeModal(addCardPopup);
}

//close the popup when escape is pressed
export function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
