class AuthApi {
  constructor(config){
    this._url = config.url;
    this._headers = {
      "Accept": "application/json",
      "Content-Type": "application/json", 
    };
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };


  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({password, email})
    }).then(this._checkResponse)
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  };

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password})
    }).then(this._checkResponse);
  };

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(this._checkResponse)
  };
}


export const authApi = new AuthApi({
  url: "https://auth.nomoreparties.co",
});