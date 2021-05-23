import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);


  const cardDeleteButtonclassName = (
    `place__delete ${isOwn ? 'place__delete_shown' : ''}`
  ); 

  const cardLikeButtonclassName = (
    `place__like ${isLiked ? 'place__like_pressed' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onLikeClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="place" key={props.card._id} >
      <button 
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonclassName}  
        aria-label="Удалить элемeнт"></button>
      <button 
        onClick={handleClick}
        type="button" 
        className="place__cover-button" 
        aria-label="Увеличить картинку">
          <img className="place__cover" alt={props.card.name} src={props.card.link}/>
      </button>
      <div className="place__description">
        <h2 className="place__title">{props.card.name}</h2>
        <button 
          type="button"
          onClick={handleLikeClick} 
          className={cardLikeButtonclassName} 
          aria-label="Добавить в избранное"></button>
        <p className="place__like-count">{props.card.likes.length}</p>
      </div> 
    </div>
  )
} 

export default Card