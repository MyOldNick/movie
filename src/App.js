import React, { useState, useEffect } from "react";
import { Container} from "@material-ui/core";

import "./App.scss";

import { API, API_KEY, IMAGE_API } from "./const";
import useStyles from "./useStyles";

//компоненты
import Form from "./Components/Form";
import Popup from "./Components/Popper";
import MovieList from "./Components/MovieList";
import Pagination from "./Components/Pagination";

function App() {
  const [sortRating, setSortRating] = useState(false); //сортируем по рейтингу или нет
  const [formValue, setFormValue] = useState(""); //содержимое формы
  const [movie, setMovie] = useState([]); //массив с фильмами
  const [page, setPage] = useState(1); //активная страница с АПИ
  const [anchorEl, setAnchorEl] = useState(null); //все для popup
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [activeOverview, setActiveOverview] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (movie.length <= 0) {
      const movieName = JSON.parse(localStorage.getItem("name"));

      if (movieName) {
        setFormValue(movieName);
      }
      getMovie();
    }
  });

  //запросы на сервер
  const getMovie = () => {
    fetch(`${API}/3/movie/popular?${API_KEY}&language=ru&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res.results);
      });
  };

  const getMovieByName = () => {
    fetch(`${API}/3/search/movie?${API_KEY}&language=ru&query=${formValue}`)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res.results);
      });
  };

  const getSortByRating = () => {
    setSortRating(true);
    fetch(`${API}/3/movie/top_rated?${API_KEY}&language=ru&page=${page}`)
      .then((res) => res.json())
      .then((res) => setMovie(res.results));
  };

  //поиск фильма по названию
  const findMovieByName = (event) => {
    localStorage.setItem("name", JSON.stringify(formValue));

    if (formValue) {
      getMovieByName();
    }

    event.preventDefault();
  };

  const formChange = (event) => {
    setFormValue(event.target.value);
  };

  //выбор активной страницы
  const selectPage = (event, value) => {
    setPage(value);
    sortRating ? getSortByRating() : getMovie();
  };

  //показать popup. Просто скопировал с документации
  const showPopup = (newPlacement, overview) => (event) => {
    setActiveOverview(overview);
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Container className="main-container">
      <Popup
        anchorEl={anchorEl}
        placement={placement}
        classes={classes}
        activeOverview={activeOverview}
        open={open}
      />
      <Form
        findMovieByName={findMovieByName}
        classes={classes}
        formChange={formChange}
        formValue={formValue}
        getSortByRating={getSortByRating}
      />
      <MovieList movie={movie} IMAGE_API={IMAGE_API} showPopup={showPopup} />
      <Pagination page={page} selectPage={selectPage} />
    </Container>
  );
}

export default App;
