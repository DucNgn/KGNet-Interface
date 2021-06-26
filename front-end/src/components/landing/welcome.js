/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";

import About from "../About";
import SelectBox from "./select";
import CompanySimilarityForm from "./forms/company";

const WelcomePage = () => {
  const [mode, setMode] = useState("company");

  const switchMode = (event) => {
    setMode(event.target.value);
  };

  return (
    <React.Fragment>
      <About />
      <Grid container justify="center" spacing={10}>
        <SelectBox mode={mode} onSwitch={switchMode} />
        <CompanySimilarityForm />
      </Grid>
    </React.Fragment>
  );
};

export default WelcomePage;
