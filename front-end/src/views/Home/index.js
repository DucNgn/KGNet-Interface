import React from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import Page from '../../components/Page';
import { Box, Card, CardContent, makeStyles, TextField, Button, SvgIcon } from '@material-ui/core';
import Header from './Header';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    textAlign: 'center'
  }
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleOnclick = () => {
    let val = document.getElementById('mode').value;
    history.push(val);
  };
  return (
    <Page title="KGNET-Homepage">
      <Box>
        <Header />
        <Box my={2} />
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h1" color="textPrimary">
              KGNET
            </Typography>
            <Typography variant="caption" color="textPrimary">
              by
            </Typography>
            <Typography variant="h5" color="textPrimary">
              Concordia Data System lab
            </Typography>
            <Box my={3} />
            <Typography variant="h4">Start with choosing a mode</Typography>
            <Box my={8} />
            <TextField
              className={classes.selectField}
              label="Mode"
              name="mode"
              // onChange={handleCustomerChange}
              select
              id="mode"
              SelectProps={{ native: true }}
              // value={currentCustomer || ''}
              variant="outlined"
            >
              <option value="/dogs">Dog Breeds Recognition</option>
              <option value="/companies">Companies Similarities</option>
            </TextField>
            <Box my={4} />
            <Button variant="contained" color="primary" onClick={handleOnclick}>
              Next
              <SvgIcon>
                <ArrowRightAltIcon />
              </SvgIcon>
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

export default Home;
