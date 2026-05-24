export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //clone and select the card template to create a new card element

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  //add event listeners to the like button, delete button and card image here
  _setEventListeners() {
    //add event listeners to the like button and the delete button of the card
    const cardLikeBtn = this._element.querySelector(".card__like-button");
    cardLikeBtn.addEventListener("click", (evt) => evt.target.classList.toggle("card__like-button_is-active")); //prettier-ignore

    const cardDeleteBtn = this._element.querySelector(".card__delete-button");
    cardDeleteBtn.addEventListener("click", (evt) => evt.target.closest(".card").remove()); //prettier-ignore
    this._handleCardClick(this._cardImage, this._name, this._link);
  }

  generateCard() {
    this._element = this._getCardTemplate();

    //add the name and link to the card image
    const cardTitle = this._element.querySelector(".card__title");
    cardTitle.textContent = this._name;

    //add the name and link to the card image
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
