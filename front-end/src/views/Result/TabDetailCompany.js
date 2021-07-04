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
          <img src={`${companyDetail.Logo}`} alt="company logo" className={classes.image} />
          <Box my={1} />
          <Typography variant="h4" color="textPrimary">
            {companyDetail.name}
          </Typography>
          <Box my={1} />
          <Typography variant="body1" color="textPrimary">
            {companyDetail.brief}
          </Typography>
          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Similarity Score:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {Number.parseFloat(companyDetail.Score).toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Employee count:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {companyDetail.employees_count}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Market Value Class:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {companyDetail.Market_Value_class}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Sales:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {companyDetail.Sales}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Profits:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {companyDetail.Profits}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>SHAP Explainer graph:</span>
            </Typography>
          </Box>
          <img src={`${companyDetail.SHAPFigure}`} alt="company logo" className={classes.image} />
          <Box my={1} />
          <Typography variant="body1" color="textPrimary">
            {companyDetail.SHAPDescription}
          </Typography>
          <Box my={1} />
        </Box>
      </Card>
    </Box>
  );
};

export default TabDetailCompany;
