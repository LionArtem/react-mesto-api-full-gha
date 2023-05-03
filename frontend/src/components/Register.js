import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/Auth';
import { useForm } from '../hooks/useForm';

import Header from './Header';

export default function Register({ onRagistrationPopup }) {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm({
    name: '',
    about: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(values.email, values.password);
  };

  const register = (email, password) => {
    auth
      .registration(email, password)
      .then((res) => {
        if (res.error) {
          onRagistrationPopup(res.error);
        } else {
          onRagistrationPopup('Вы успешно зарегистрировались!');
        }
        setValues({
          password: '',
          email: '',
        });
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        onRagistrationPopup('Что-то пошло не так! Попробуйте ещё раз.');
      });
  };

  return (
    <>
      <Header>
        <p
          onClick={() => navigate('/sign-in', { replace: true })}
          className="header__personalization"
        >
          Вoйти
        </p>
      </Header>
      <div className="personalization">
        <p className="personalization__description">Регистрация</p>
        <form
          onSubmit={handleSubmit}
          className="personalization__form"
          name="login"
        >
          <input
            value={values.email || ''}
            onChange={(e) => handleChange(e)}
            name="email"
            id="email-input"
            className="personalization__input "
            type="email"
            placeholder="email"
            minLength="2"
            maxLength="40"
            required
          />
          <input
            onChange={(e) => handleChange(e)}
            value={values.password || ''}
            name="password"
            id="password-input"
            className="personalization__input"
            type="password"
            placeholder="пароль"
            minLength="2"
            maxLength="20"
            required
          />
          <button className="personalization__button" type="submit">
            Зарегистрироваться
          </button>
          <p
            onClick={() => navigate('/sign-in', { replace: true })}
            className="personalization__login-button"
          >
            Уже зарегистрированы? Войти
          </p>
        </form>
      </div>
    </>
  );
}
