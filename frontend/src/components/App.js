import React from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Footer from './Footer';

import ImagePopup from './ImagePopup';
import Main from './Main';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { auth } from '../utils/Auth';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      auth
        .checkAuthorization()
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          navigate('/main', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => (i._id || i) === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCard(!isLiked, card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteImg(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [infoToolTipText, setInfoToolTipText] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .addServerUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const handleUpdateAvatar = (url) => {
    api
      .addServerUserAvatar(url)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const handleAddPlaceSubmit = ({ nameFoto, link }) => {
    api
      .addNewCard({ nameFoto, link })
      .then((userData) => {
        setCards([userData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link ||
    infoToolTipText;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleCardLike,
        cards,
        setCards,
        handleCardDelete,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              email={email}
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onCardClick={(card) => setSelectedCard(card)}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register
              onRagistrationPopup={(text) => setInfoToolTipText(text)}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login handleLogin={() => handleLogin()} setEmail={setEmail} />
          }
        />
      </Routes>
      <Footer />

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        onClose={() => closeAllPopups()}
        isOpen={isEditProfilePopupOpen}
      />
      <AddPlacePopup
        onUpdateUser={({ nameFoto, link }) =>
          handleAddPlaceSubmit({
            nameFoto,
            link,
          })
        }
        onClose={() => closeAllPopups()}
        isOpen={isAddPlacePopupOpen}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={() => setIsEditAvatarPopupOpen(false)}
      />
      <ImagePopup onClose={() => closeAllPopups()} isOpen={selectedCard} />
      <InfoTooltip
        infoToolTipText={infoToolTipText}
        onClose={() => setInfoToolTipText(false)}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
