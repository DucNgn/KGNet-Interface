import React, { useState } from 'react';
import '@fontsource/roboto';
import { Typography, TextField, makeStyles, CardActions, Button, SvgIcon } from '@material-ui/core';
import { Box, Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import useDebounce from '../../hooks/useDebounce';
import { useHistory } from 'react-router-dom';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import MyTabs from './Tabs';

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
const Details = ({ companyName, criteria, result }) => {
  const classes = useStyles();
  const history = useHistory();
  const [link, setLink] = useState('');
  const debouncedLink = useDebounce(link, 500);

  const handleOnchange = (val) => {
    if (val !== undefined) setLink(val);
  };

  const handleOnClick = (e) => {
    console.log('hello');
  };

  return (
    <Box mt={5} ml={2}>
      <Typography variant="body1" color="textPrimary">
        {`Similar companies to ${companyName} in term of ${criteria} are `}
        {result.map((e, idx) => {
          return `${e.name}` + (idx === result.length ? ', ' : '.');
        })}
      </Typography>
      <Box my={3} />
      <MyTabs result={result} />
    </Box>
  );
};

export default Details;
