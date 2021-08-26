import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
  Grid
} from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.bold} color="textPrimary">
                    SHAP Explainer Graph
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid direction="column" container alignItems="center">
                    <img src={`${companyDetail.SHAPFigure}`} alt="SHAP Explainer" className={classes.shapImage} />
                    <Box my={1} />
                    <Typography variant="caption" color="textPrimary">
                      {companyDetail.SHAPDescription}
                    </Typography>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Box my={1} />
            </Box>
          </CardContent>
        </PerfectScrollbar>
      </Card>
    </Box>
  );
};

export default TabDetailCompany;
