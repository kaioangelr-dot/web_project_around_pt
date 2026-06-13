import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, action) {
    super(popupSelector);
    this._btn = this._popup.querySelector(".popup__button");
    this._action = action;
    this._handleConfirmation = this._handleConfirmation.bind(this);
  }

  _handleConfirmation() {
    this._action(this._id, this._cardElement);
    super.close();
  }

  open(data) {
    super.open();

    //recieves an object, and save the id and the card when the popup is opened for the handle.
    this._id = data.id;
    this._cardElement = data.cardElement;

    this._btn.addEventListener("click", this._handleConfirmation);
  }

  close() {
    super.close();
    this._btn.removeEventListener("click", this._handleConfirmation);
  }
}
