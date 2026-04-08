//selectors for the edit profile button and the edit profile popup and its close button
const editBtn = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editCloseBtn = editPopup.querySelector(".popup__close");

//selectors for the profile name and description elements on the page
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//selectors for the edit profile popup and its form inputs
const editName = editPopup.querySelector(".popup__input_type_name");
const editDescription = editPopup.querySelector(".popup__input_type_description"); /* prettier-ignore */

//selectors for the cards container, the add card button and the add card popup and its close button
const cardsContainer = document.querySelector(".cards__list");
const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");
const addCardCloseBtn = addCardPopup.querySelector(".popup__close");

//selectors for the add card popup form inputs
const addCardName = addCardPopup.querySelector(".popup__input_type_card-name");
const addCardLink = addCardPopup.querySelector(".popup__input_type_url");

//selectors for the image popup and its elements
const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

let initialCards = [
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

//opens the modal by adding the "popup_is-opened" class to the modal element
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

//closes the modal by removing the "popup_is-opened" class from the modal element
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

//fills the edit form with the current profile name and description
function fillProfileForm() {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
}

//opens the edit popup and fills the form with the current profile name and description when the edit button is clicked
function handleOpenEditModal() {
  openModal(editPopup);
  fillProfileForm();
}

//adds the new profile name and description to the page and closes the edit popup when the form is submitted
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;

  closeModal(editPopup);
}

//creates the card element based on the template and fills it with the provided name and link
function getCardElement(name, link) {
  //select the card template and clone it to create a new card element
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);

  //add the name and link to the card image, if they are provided, otherwise use default values
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name ? name : "Lugar sem nome";

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link ? link : "../images/placeholder.jpg";

  cardImage.alt = name ? name : "Imagem de um lugar sem nome";

  //add event listeners to the like button and the delete button of the card
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });

  //selectors for the image popup and its elements
  cardImage.addEventListener("click", function () {
    openModal(imagePopup);
    imagePopupImage.src = link ? link : "../images/placeholder.jpg";
    imagePopupImage.alt = name ? name : "Imagem de um lugar sem nome";
    imagePopupCaption.textContent = name ? name : "Lugar sem nome";
  });

  return cardElement;
}

//renders a new card with the provided name and link and adds it to the container
function renderCard(name, link, container) {
  //create a new card element
  const newCard = getCardElement(name, link);

  //add the card to the container in the beginning of the list
  container.prepend(newCard);
}

//adds an event listener to the add card form to handle the form submission and add a new card to the page
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  //add a new card to the page using the values from the form inputs and then clear the form inputs
  renderCard(addCardName.value, addCardLink.value, cardsContainer);

  //clear the form inputs after adding the card
  addCardName.value = "";
  addCardLink.value = "";

  closeModal(addCardPopup);
}

//adds event listeners to the edit button and the close button of the edit popup
editBtn.addEventListener("click", handleOpenEditModal);

editCloseBtn.addEventListener("click", function () {
  closeModal(editPopup);
});

//adds an event listener to the edit form to handle the form submission and update the profile information
editPopup.addEventListener("submit", handleProfileFormSubmit);

//adds event listeners to the add card button and the close button of the add card popup
addCardBtn.addEventListener("click", function () {
  openModal(addCardPopup);
});
addCardCloseBtn.addEventListener("click", function () {
  closeModal(addCardPopup);
});

//adds an event listener to the add card form to handle the form submission and add a new card to the page
addCardPopup.addEventListener("submit", handleCardFormSubmit);

//add an event listener to the close button of the image popup to close the popup when the button is clicked
imagePopupCloseBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});

//render the initial cards on the page by iterating over the initialCards array and calling the renderCard function for each card
initialCards.forEach((card) =>
  renderCard(card.name, card.link, cardsContainer),
);
