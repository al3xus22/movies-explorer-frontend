//Поиск
export const filterMovies = (query, movies) => {
  return movies.filter((movie) => movie.nameRU.toLowerCase().includes(query.toLowerCase()) || movie.nameEN.toLowerCase().includes(query.toLowerCase()));
}

//Фильтр короткометражек
export const filterShortFilms = (movies) => {
  return movies.filter((movie) => movie.duration <= 40);
}