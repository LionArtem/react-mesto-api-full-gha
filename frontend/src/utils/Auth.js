class Auth {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  checkAuthorization() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkResponse);
  }

  authorization(email, password) {
    return fetch(`${this.baseUrl}/signin`, this._method(email, password)).then(
      this._checkResponse
    );
  }

  registration(email, password) {
    return fetch(`${this.baseUrl}/signup`, this._method(email, password)).then(
      (res) => {
        if (() => Promise.resolve(res.status) === 400) {
          return res.json();
        }
        return Promise.reject(res);
      }
    );
  }

  _method(email, password) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    };
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  };
}

const auth = new Auth({
 // baseUrl: 'https://api.mesto.add.nomoredomains.monster',
  baseUrl: 'http://localhost:3000',
});

export { auth };
