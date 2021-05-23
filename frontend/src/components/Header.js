import logoPath from '../images/mesto-logo.svg';

function Header(props) {


  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип сервиса место" />
      <div className="header__infobox">
        <p className="header__email">{props.email}</p>
        <button
        className="header__button"
        type="button"
        onClick={props.onClick}>{props.button}</button>
      </div>
    </header>
  );
}

export default Header;  