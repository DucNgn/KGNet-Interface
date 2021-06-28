import React from 'react';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import About from '../../components/About';
import SelectBox from '../../components/landing/select';
import CompanySimilarityForm from '../../components/landing/forms/CompanySimilarity';
import ImageRecognitionForm from '../../components/landing/forms/ImageRecognition';

const Details = () => {
  const [mode, setMode] = useState('company');

  const switchMode = (event) => {
    setMode(event.target.value);
  };

  const renderForm = () => {
    if (mode == 'company') {
      return (
        <Grid item>
          <CompanySimilarityForm />
        </Grid>
      );
    }

    if (mode == 'image') {
      return (
        <Grid item>
          <ImageRecognitionForm />
        </Grid>
      );
    }
  };

  return (
    <React.Fragment>
      <About />
      <Grid container justify="center" spacing={10}>
        <SelectBox mode={mode} onSwitchMode={switchMode} />
        {renderForm()}
      </Grid>
    </React.Fragment>
  );
};

export default Details;
