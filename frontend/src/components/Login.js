import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/Auth';
import { useForm } from '../hooks/useForm';

export default function Login({ handleLogin, setEmail, addInfoLoginPage }) {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm({
    name: '',
    about: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize(values.email, values.password);
  };

  const authorize = (email, password) => {
    auth
      .authorization(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setEmail(email);
          handleLogin();
          setValues({
            password: '',
            email: '',
          });
          navigate('/main', { replace: true });
          addInfoLoginPage();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header>
        <p
          onClick={() => navigate('/sign-up', { replace: true })}
          className="header__personalization"
        >
          Регистрация
        </p>
      </Header>
      <div className="personalization">
        <p className="personalization__description">Вход</p>
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
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
