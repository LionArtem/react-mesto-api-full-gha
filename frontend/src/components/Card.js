import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick } = props;
  const { currentUser, handleCardLike, handleCardDelete } =
    useContext(CurrentUserContext);
  const isOwn = (card.owner._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some((i) => (i._id || i) === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && 'element__like_active'
  }`;

  return (
    <div className="element">
      {isOwn && (
        <button
          className="element__delete"
          onClick={() => handleCardDelete(card)}
          type="button"
        />
      )}
      <img
        onClick={() => onCardClick(card)}
        className="element__foto"
        src={card.link}
        alt={card.name}
      />
      <div className="element__signature">
        <p className="element__name-foto">{card.name}</p>
        <div>
          <button
            className={cardLikeButtonClassName}
            onClick={() => handleCardLike(card)}
            type="button"
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
