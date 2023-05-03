import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: '',
    about: '',
  });

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      title="Редактировать профиль"
      name="profile"
      buttonText="сохранить"
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        name="name"
        id="name-input"
        className="popup__info-text popup__info-text_type_name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <p className="name-input-error popup__input-error"></p>
      <input
        onChange={handleChange}
        value={values.about || ''}
        name="about"
        id="job-input"
        className="popup__info-text popup__info-text_type_job"
        type="text"
        placeholder="Вид деятельности"
        minLength="2"
        maxLength="200"
        required
      />
      <p className="job-input-error popup__input-error"></p>
    </PopupWithForm>
  );
}
