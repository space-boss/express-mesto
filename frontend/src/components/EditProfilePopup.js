import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setUserName] = React.useState('');
  const [description, setUserDescription] = React.useState('');

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [currentUser])

  
  function changeUserName(name) {
    setUserName(name.target.value)
  }
 
  function changeUserInfo(description) {
    setUserDescription(description.target.value)
  }
   
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
      name='profile' 
      title='Редактировать профиль'
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}>

      <input 
        type="text" 
        className="popup__input-field popup__input-field_value_name" 
        id="profile-username" 
        name="name" 
        placeholder="Имя"
        value={name}
        onChange={changeUserName}
        required minLength={2} 
        maxLength={40} />
      <span id="profile-username-error" className="popup__input-field popup__input-field_error" />
      
      <input 
        type="text" 
        className="popup__input-field popup__input-field_value_job" 
        id="profile-job" 
        name="about" 
        value={description}
        onChange={changeUserInfo}
        placeholder="О себе" 
        required minLength={2} 
        maxLength={200} />
      <span id="profile-job-error" className="popup__input-field popup__input-field_error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup