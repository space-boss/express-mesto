import React from 'react';


function InfoTooltip(props) {
  const popupOpenedClass = props.isOpen ? "popup_opened" : '';

  return (
    <div className={`popup popup_infotooltip ${popupOpenedClass}`}>
        <div className={`popup__container popup__container-auth-feedback`}>
          <button type="button"
          onClick={props.onClose} 
          className="popup__close" 
          aria-label="Закрыть форму" />

          <img 
          className="popup__img-auth-feedback"
          src={props.src}
          alt ='Статус авторизации'/>

          <h3 className="popup__title popup__title_centered">
            {props.title}</h3>
        </div>
    </div>
  )
}

export default InfoTooltip;