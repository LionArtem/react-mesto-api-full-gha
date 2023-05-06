import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Header from './Header';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const navigate = useNavigate();
  const { currentUser, cards, setLoggedIn } = useContext(CurrentUserContext);

  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, email } = props;

  return (
    <>
      <Header>
        <div className="header__conteiner-personalization">
          <p className="header__personalization-email">{email} </p>
          <p
            onClick={() => {
              localStorage.removeItem('token');
              setLoggedIn(false);
              navigate('/sign-in', { replace: true });
            }}
            className="header__personalization"
          >
            Выйти
          </p>
        </div>
      </Header>
      <main className="content">
        <section className="profile">
          <div onClick={onEditAvatar} className="profile__conteiner">
            <div className="profile__pencil-avatar"></div>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-li">
              <h1 className="profile__title">{currentUser.name}</h1>
              <h2 className="profile__subtitl">{currentUser.about}</h2>
            </div>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
            >
              <img
                className="profile__pencil"
                src="/images/pencil.png"
                alt="карандаш"
              />
            </button>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__add-button"
            type="button"
          >
            <img className="profile__plus" src="/images/plus.png" alt="плюс" />
          </button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
