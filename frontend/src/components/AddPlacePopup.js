import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

export default function AddPlacePopup({ onClose, isOpen, onUpdateUser }) {
  const { values, handleChange, setValues } = useForm({
    nameFoto: '',
    link: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  React.useEffect(() => {
    setValues({
      nameFoto: '',
      link: '',
    });
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      buttonText='добавить'
      title="Новое место"
      name="elements"
    >
      <input
        value={values.nameFoto}
        onChange={handleChange}
        name="nameFoto"
        id="title-input"
        className="popup__info-text popup__info-text_type_title"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <p className="title-input-error popup__input-error"></p>
      <input
        value={values.link}
        onChange={(e) => handleChange(e)}
        name="link"
        id="fotolink-input"
        className="popup__info-text popup__info-text_type_fotolink"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <p className="fotolink-input-error popup__input-error"></p>
    </PopupWithForm>
  );
}
