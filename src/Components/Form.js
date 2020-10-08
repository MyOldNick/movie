import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";

export default function Form(props) {
  const {
    findMovieByName,
    classes,
    formChange,
    formValue,
    getSortByRating,
  } = props;
  
  return (
    <Grid container justify="center" alignItems="center" className="pt-5">
      <form
        onSubmit={findMovieByName}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          onChange={formChange}
          value={formValue}
          type="text"
          label="Введите название фильма"
          className="form-style"
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          type="submit"
        >
          Поиск
        </Button>
      </form>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={getSortByRating}
      >
        Сортировать по рейтингу
      </Button>
    </Grid>
  );
}
