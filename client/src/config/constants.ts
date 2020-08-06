export const Constants = {
    imagePlaceHolderURI: '../../assets/Image-Coming-Soon.png',
    routes: {
        REGISTER: 'register',
        LOGIN: 'login',
        HOME: '',
        MOVIE_GENRE: 'movies/:genre/:pageNo',
        MOVIE_CERTIFICATION: 'movies/certification/:certification/:pageNo',
        FAVOURITE_MOVIE: 'movies/favorite',
        MOVIE_BY_YEAR: 'movies/years/:year/:pageNo',
        MOVIE_BY_CAST: 'movies/byCast/:cast/:castName/:pageNo',
        MOVIE_SEARCH: 'movies/search/:query/:pageNo',
        MOVIE_DETAIL: 'movieDetail/:id',
    },
    US_RATTING: [{rate: "G"}, {rate: "PG-13"}, {rate: "R"}, {rate: "NC-17"}, {rate: "NR"}, {rate: "PG"}]
}
  