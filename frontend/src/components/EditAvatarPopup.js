import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm 
    name='avatar'
    title='Обновить аватар'
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    onSubmit = {handleSubmit}>

      <input 
        ref={avatarRef}
        type="url" 
        className="popup__input-field popup__input-field_value_userpic" 
        id="userpic" 
        name="avatar" 
        placeholder="Ссылка" 
        required />
      <span id="userpic-error" className="popup__input-field popup__input-field_error" />
    </PopupWithForm>
  )  
}

export default EditAvatarPopup;