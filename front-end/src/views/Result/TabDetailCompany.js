import { Box, Card, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    [theme.breakpoints.down('sm')]: {
      height: '50%',
      weight: '50%'
    },
    [theme.breakpoints.up('sm')]: {
      height: '35%',
      width: '35%'
    }
  },
  bold: {
    fontWeight: 'bold'
  }
}));
const TabDetailCompany = ({ companyDetail }) => {
  const classes = useStyles();

  return (
    <Box mb={7}>
      <Card>
        <Box p={3}>
          <img src={`data:image/png;base64 , ${companyDetail.logo_url}`} alt="company logo" className={classes.image} />
          <Box my={1} />
          <Typography variant="h4" color="textPrimary">
            {companyDetail.name}
          </Typography>
          <Box my={1} />
          <Typography variant="body1" color="textPrimary">
            {companyDetail.description}
          </Typography>
          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Score:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {companyDetail.Score}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default TabDetailCompany;
