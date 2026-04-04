const editBtn = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editCloseBtn = editPopup.querySelector(".popup__close");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editName = editPopup.querySelector(".popup__input_type_name");
const editDescription = editPopup.querySelector(".popup__input_type_description"); /* prettier-ignore */

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

for (let i = 0; i < initialCards.length; i++) {
  console.log(initialCards[i].name);
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  openModal(editPopup);
  fillProfileForm();
}

editBtn.addEventListener("click", handleOpenEditModal);

editCloseBtn.addEventListener("click", function () {
  closeModal(editPopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;

  closeModal(editPopup);
}

editPopup.addEventListener("submit", handleProfileFormSubmit);
