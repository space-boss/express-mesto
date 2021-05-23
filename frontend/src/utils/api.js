class Api {
  constructor(config){
		this._url = config.url;
    this._headers = {
      "Content-Type": "application/json", 
      "Authorization": config.authorization,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }

  getCard() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  generateCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.place,
        link: newCard.link,
      })
    }).then(this._checkResponse);
  }
  

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if(!res.ok) {
        return Promise.reject('Не удалось удалить карточку')
      }
    })
  }
  
  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers, 
    }).then(this._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const apiConfig = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20",
  authorization: 'e834f1b9-ceab-4d08-a43d-18df96eb5098'
});
   
