import React from "react";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export default function PaginationComponent(props) {
  const { page, selectPage } = props;
  
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="pt-15 mb-20"
    >
      <Pagination count={5} page={page} onChange={selectPage} />
    </Grid>
  );
}
