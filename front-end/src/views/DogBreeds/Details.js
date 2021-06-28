import React, { useState } from 'react';
import '@fontsource/roboto';
import { Typography, TextField, makeStyles } from '@material-ui/core';
import { Box, Card, CardContent } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  link: {
    [theme.breakpoints.down('md')]: {
      width: 300
    },
    width: 400
  },
  card: {
    [theme.breakpoints.down('md')]: {
      width: 300
    },
    width: 600,
    minHeight: 300
  },
  centerItem: {
    alignItems: 'center',
    textAlign: 'center'
  },
  nothingToDisplay: {
    paddingTop: '600px'
  }
}));
const Details = () => {
  const classes = useStyles();
  const [link, setLink] = useState();
  return (
    <Box mt={5} ml={2}>
      <TextField className={classes.link} value={link} label="Image link" name="Link" variant="outlined" />
      <Box my={5} display="flex" justifyContent="center">
        <Card className={classes.card}>
          <CardContent className={classes.centerItem}>
            {link === undefined ? (
              <Typography className={classes.nothingToDisplay} variant="caption" color="textSecondary">
                Nothing to display
              </Typography>
            ) : null}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Details;
