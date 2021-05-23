function PopupWithForm(props) {

  const popupOpenedClass = props.isOpen ? "popup_opened" : '';

  return (
    <section className={`popup popup_${props.name} ${popupOpenedClass}`}>
    <div className={`popup__container popup__container-${props.name}`}>
      <button type="button" 
        onClick={props.onClose}
        className="popup__close" 
        aria-label="Закрыть форму" />
      <h3 className="popup__title">{props.title}</h3>
      <form 
        onSubmit={props.onSubmit}
        name="editValues" 
        method="post" 
        className={`popup__form popup__form-${props.name}`} 
        noValidate>
        {props.children}
        <input name="submit" type="submit" value="Сохранить" className="popup__submit-button" /> 
      </form>
    </div>
    </section>
  );
}

export default PopupWithForm;