import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

export default function MovieList(props) {
  const { movie, IMAGE_API, showPopup } = props;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {movie.map((el) => (
        <Card className="movie-card pb-10" key={el.original_title}>
          <CardMedia
            component="img"
            height="500"
            width="300"
            image={`${IMAGE_API}${el.poster_path}`}
          ></CardMedia>
          <Typography gutterBottom variant="h6" style={{ marginLeft: "10px" }}>
            {el.title.substring(0, 23)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={showPopup("bottom", el.overview)}
            style={{ marginLeft: "10px" }}
          >
            Подробнее
          </Button>
        </Card>
      ))}
    </Grid>
  );
}
