import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card'; 
import Header from './Header';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <Header
        button="Выйти"
        onClick = {props.onClick}
        isLoggedIn = {props.isLoggedIn}
        email={props.email}
      />

      <section className="profile">
        <div 
          onClick={props.onEditAvatar}
          className="profile__userpic-edit-button"></div>
        <img 
          src={currentUser.avatar}
          className="profile__pic" 
          alt="Фото пользователя" />
        <h1 className="profile__title">{currentUser.name}</h1>
        <button 
          type="button" 
          onClick={props.onEditProfile} 
          className="profile__edit-button" 
          aria-label="Редактировать профиль" />
        <p className="profile__subtitle">{currentUser.about}</p>
        <button 
          type="button"  
          onClick={props.onAddPlace} 
          className="profile__add-button"
          aria-label="Добавить новое место" />
      </section>

      <section className="places">
        {props.cards.map((card) => (
          <Card 
            card={card} 
            key={card._id} 
            onCardClick={props.onCardClick}
            onLikeClick={props.onCardLike}
            onCardDelete={props.onCardDelete}/>
        ))}
      </section>

    </main>
  )
}

export default Main; 