class MoviesApi {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.message}`);
  }

  getMovies() {
    return fetch(`${this.url}`, {
      headers: this.headers,
    }).then(res => {
      return this._checkResponse(res);
    })
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Accept": "application/json",
  }
})