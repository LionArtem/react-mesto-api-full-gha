import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar.current.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      onClose={onClose}
      buttonText='изменить'
    >
      <input
        ref={avatar}
        name="linkAvatar"
        id="fotoAvatarlink-input"
        className="popup__info-text popup__info-text_type_fotolink"
        type="url"
        placeholder="Ссылка на аватар"
        required
      />
      <p className="fotoAvatarlink-input-error popup__input-error"></p>
    </PopupWithForm>
  );
}
