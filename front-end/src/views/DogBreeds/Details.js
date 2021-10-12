import React from 'react';
import '@fontsource/roboto';
import { Typography, TextField, makeStyles, Button, SvgIcon } from '@material-ui/core';
import { Box, Card, CardContent, CardActionArea } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
const Details = ({ handleShowResult, setLink, debouncedLink }) => {
  const classes = useStyles();

  const handleOnchange = (val) => {
    if (val !== undefined) setLink(val);
  };

  return (
    <Box mt={5} ml={2}>
      <TextField
        className={classes.link}
        onChange={(e) => handleOnchange(e.target.value)}
        label="Image link"
        name="Link"
        variant="outlined"
      />
      <Box my={5} display="flex" justifyContent="center">
        <Card className={debouncedLink === '' ? classes.card : null}>
          <CardActionArea>
            <CardContent className={classes.centerItem}>
              {debouncedLink === '' ? (
                <Typography className={classes.nothingToDisplay} variant="caption" color="textSecondary">
                  Nothing to display
                </Typography>
              ) : (
                <img height="100%" alt="dog" width="100%" src={debouncedLink} />
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <Box my={2} className={classes.centerItem}>
        <Button variant="contained" color="primary" onClick={e => handleShowResult(debouncedLink)}>
          Show result
          <SvgIcon>
            <ArrowDownwardIcon />
          </SvgIcon>
        </Button>
      </Box>
    </Box>
  );
};

export default Details;
