function ImagePopup(props) {

  const popupOpenedClass = props.isOpen ? "popup_opened" : '';
  
  return (
    <section className={`popup popup_zoom ${popupOpenedClass}`}>    
      <div className="popup__picture">
        <button type="button"
          onClick={props.onClose} 
          className="popup__close" 
          aria-label="Закрыть форму" />
        <img className="popup__img" alt={`${props.card.name}`} src={`${props.card.link}`} />
        <p className="popup__caption"> {props.card.name} </p>
    </div>
  </section>
  );
}

export default ImagePopup;