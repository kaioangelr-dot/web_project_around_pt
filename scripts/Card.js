export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    /* the like status is set to the opposite, so when the user clicks the like button, 
    the first request will be the opposite of the current like status. */
    this._isLiked = !data.isLiked;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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

    //if the backend returns (isLiked: true), add the active class to the like button when the page is loaded
    if (!this._isLiked) {
      cardLikeBtn.classList.add("card__like-button_is-active");
    }

    cardLikeBtn.addEventListener("click", () => {
      //the button is activated in the front end to avoid delays from the backend response.
      cardLikeBtn.classList.toggle("card__like-button_is-active");

      //updates the like status in the back end when the like button is pressed.
      this._isLiked = !this._isLiked;
      //this function update the like status only in the backend
      this._handleLikeClick(this._id, this._isLiked, cardLikeBtn);
    });

    const cardDeleteBtn = this._element.querySelector(".card__delete-button");

    //remove the delete button if the user is not the card's owner
    if (!this._owner) {
      cardDeleteBtn.remove();
      //add the delete btn event if the user is the card's owner
    } else {
      cardDeleteBtn.addEventListener("click", (evt) => {
        const cardElement = evt.target.closest(".card");
        this._handleDeleteClick(this._id, cardElement);
      });
    }

    this._handleCardClick(this._cardImage, this._name, this._link);
  }

  generateCard() {
    //template element selector
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
