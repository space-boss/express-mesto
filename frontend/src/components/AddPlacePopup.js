import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setPlaceName] = React.useState('');
  const [link, setPlaceLink] = React.useState('');


  function changePlaceName(name) {
    setPlaceName(name.target.value)
  }

  function changePlaceLink(link) {
    setPlaceLink(link.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }


  return (
    <PopupWithForm 
    name='place' 
    title='Новое место'
    onSubmit = {handleSubmit}
    isOpen = {props.isOpen}
    onClose = {props.onClose}>

      <input
      type="text" 
      className="popup__input-field popup__input-field_value_place" 
      id="place-name" 
      name="place"
      value={name} 
      onChange={changePlaceName}
      placeholder="Название" 
      required minLength={2} 
      maxLength={30} 
      />
      <span id="place-name-error" className="popup__input-field popup__input-field_error" />
      
      <input 
      type="url" 
      className="popup__input-field popup__input-field_value_placeurl" 
      id="place-url" 
      value={link} 
      onChange={changePlaceLink}
      name="link" 
      placeholder="Ссылка на картинку"
      required 
      />
      <span id="place-url-error" className="popup__input-field popup__input-field_error" />
    </PopupWithForm>   
  )
}

export default AddPlacePopup;