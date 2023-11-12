

import data from './../db/data.js'

let db_utility = {
    fetch(request) {
        const parts = request.split('/');
        const type = parts[0];
        const className = parts[1];
        const patternAndParams = parts[2];
        const pattern = patternAndParams.split('?')[0];
        const params = patternAndParams.split('?')[1].split("&");
        let per_page = 1, page = 1;
        params.forEach(param => {
            let [key, value] = param.split("=");
            if (key === "per_page") {
                per_page = parseInt(value) || 1;
            } else if (key === "page") {
                page = parseInt(value) || 1;
            }
        });
        return new Promise((resolve, reject) => {
            if (type === "get" && className === "mostpopular") {
                const movieList = data.MostPopularMovies.slice(0, 20);
                let result = {
                    search: type,
                    page: parseInt(page),
                    per_page: parseInt(per_page),
                    total: parseInt(movieList.length),
                    total_page: Math.ceil(this.total / this.per_page),
                    items: movieList
                }
                result.total_page = Math.ceil(result.total / result.per_page)
                resolve(result);
            }
            else if (type === "get" && className === "top50") {
                const movieList = data.Top50Movies.slice(0, 20);
                let result = {
                    search: type,
                    page: parseInt(page),
                    per_page: parseInt(per_page),
                    total: parseInt(movieList.length),
                    total_page: Math.ceil(this.total / this.per_page),
                    items: movieList
                }
                result.total_page = Math.ceil(result.total / result.per_page)
                resolve(result);
            }
            else if (type === "get" && className === "topboxoffice") {
                const movieList = data.Movies;
                let moviesWithBoxOffice = movieList.filter(movie => movie.boxOffice !== undefined);
                moviesWithBoxOffice.sort((a, b) => {
                    let firstNum = Number(a.boxOffice.cumulativeWorldwideGross
                        .slice(1)
                        .split(',')
                        .join(''));
                    let secondNum = Number(b.boxOffice.cumulativeWorldwideGross
                        .slice(1)
                        .split(',')
                        .join(''));
                    return firstNum < secondNum ? 1 : -1
                })

                let result = {
                    search: type,
                    page: parseInt(page),
                    per_page: parseInt(per_page),
                    total: parseInt(moviesWithBoxOffice.length),
                    total_page: Math.ceil(this.total / this.per_page),
                    items: moviesWithBoxOffice.slice(0, 5)
                }

                result.total_page = Math.ceil(result.items.length / result.per_page)
                resolve(result);
            }
            else if (type === "search" && className === "movie" && pattern.length > 0) {
                const movieList = data.Movies;
                let searchMovies = movieList.filter(function (movie) {
                    if (movie.fullTitle.toLowerCase().indexOf(pattern.toLowerCase()) !== -1) {
                        return true;
                    }
                    else {
                        return false
                    }
                });
                let result = {
                    search: type,
                    page: parseInt(page),
                    per_page: parseInt(per_page),
                    total: parseInt(searchMovies.length),
                    total_page: 1,
                    items: searchMovies
                }
                result.total_page = Math.ceil(result.total / result.per_page)
                resolve(result);
            }
        })
    }
}

export default db_utility;