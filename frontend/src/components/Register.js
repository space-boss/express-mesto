import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';


function Register({onRegister, onRegisterPopup}) {

  const [email, setUserEmail] = React.useState('');
  const [password, setUserPassword] = React.useState('');
  const history = useHistory();

  function handleEmailInput(evt) {
    setUserEmail(evt.target.value)
  }

  function handlePasswordInput(evt) {
    setUserPassword(evt.target.value)
  }

  function handleFormSubmit(evt) {
    evt.preventDefault(); 
    onRegister({
      password: password,
      email: email
    })
    onRegisterPopup();
  }

  function handleRedirect() {
    history.push("/sign-in")
  }
 
  return(
    <>
    <Header button="Войти" onClick={handleRedirect} />

    <section className="auth">
      <div className="auth__container">
        <h3 className="auth__title">Регистрация</h3>
          <form 
          className="auth__form"
          onSubmit={handleFormSubmit}>
            <input 
            onChange={handleEmailInput}
            value={email}
            type="text"
            className="auth__input-field" 
            id="auth-email" 
            name="email" 
            placeholder="Email" 
            required minLength="2" 
            maxLength="40"/>

            <input 
            onChange={handlePasswordInput}
            value={password}
            type="password" 
            className="auth__input-field" 
            id="auth-password"
            name="password"
            placeholder="Пароль"
            required minLength="8"
            maxLength="40"/>

            <input name="submit" type="submit" value="Зарегистрироаться" className="auth__submit-button"/>
          </form> 
          <div className="auth__signin">
            <Link to="/sign-in" className="auth__signin-link"> Уже зарегистрированы? Войти </Link>
          </div>
      </div>

    </section> 
    </>
 )

}

export default Register;