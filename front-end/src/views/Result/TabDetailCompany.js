import { Box, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    [theme.breakpoints.up('xs')]: {
      height: '30%',
      width: '30%'
    },
    [theme.breakpoints.up('md')]: {
      height: '20%',
      width: '20%'
    },
    [theme.breakpoints.up('lg')]: {
      height: '15%',
      width: '15%'
    }
  },
  bold: {
    fontWeight: 'bold'
  },
  shapImage: {
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      weight: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      height: '80%',
      width: '80%'
    }
  }
}));
const TabDetailCompany = ({ companyDetail }) => {
  const classes = useStyles();

  return (
    <Box mb={7}>
      <Card>
        <PerfectScrollbar>
          <CardContent>
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
              <Typography variant="body1" color="textPrimary">
                <span className={classes.bold}>SHAP Explainer graph:</span>
              </Typography>
              <Grid direction="column" alignItems="center" xs={12} container>
                <img src={`${companyDetail.SHAPFigure}`} alt="company logo" className={classes.shapImage} />
                <Typography variant="caption" color="textSecondary">
                  {companyDetail.SHAPDescription}
                </Typography>
              </Grid>
              <Box my={1} />
            </Box>
          </CardContent>
        </PerfectScrollbar>
      </Card>
    </Box>
  );
};

export default TabDetailCompany;
