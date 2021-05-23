import React from 'react';
import Header from './Header';
import { useHistory } from 'react-router-dom';



function Login({ onLogin, onRegister }) {

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
    const userData = {
      email,
      password
    }
    onLogin(userData)
  }

  function handleRedirect() {
    history.push("/sign-up")
  }
 

  return(
    <>
    <Header 
    button="Регистрация"
    onClick={handleRedirect} 
    />
 
    <section className="auth">
      <div className="auth__container">
        <h3 className="auth__title">Вход</h3>
          <form 
          className="auth__form"
          onSubmit={handleFormSubmit}>
            <input 
            onChange = {handleEmailInput}
            value = {email}
            type="text" 
            className="auth__input-field" 
            id="auth-email" 
            name="email" 
            placeholder="Email" 
            required minLength="2" 
            maxLength="40"/>

            <input 
            onChange = {handlePasswordInput}
            value = {password}
            type="password" 
            className="auth__input-field"
            id="auth-password" 
            name="password" 
            placeholder="Пароль" 
            required 
            minLength="8" 
            maxLength="40"/>

            <input name="submit" type="submit" value="Войти" className="auth__submit-button"/>
          </form> 
        </div>
    </section>
    </>
  )

}

export default Login;
