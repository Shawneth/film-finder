import React, { ClassAttributes } from 'react'

const imgUrl = 'https://image.tmdb.org/t/p/w500';

interface IFilmInformation{
    id: number,
    title: string,
    release_date: string,
    poster_path: string
}

export default function FilmCard(filmData: IFilmInformation) {

    function searchForFilm() {
        open(`https://google.com/search?q=${encodeURIComponent(filmData.title)}${filmData.release_date ? encodeURIComponent(' (' + filmData.release_date + ')') : ''}`);
    }

    return (
        <li onClick={searchForFilm}>
            <h4>{filmData.title}</h4>
            <h5>{filmData.release_date}</h5>
            <div className="image-container">
                <img 
                    src={filmData.poster_path ? `${imgUrl}${filmData.poster_path}` : "./assets/missing-logo.png"}
                ></img>
            </div>
        </li>
    )
}
