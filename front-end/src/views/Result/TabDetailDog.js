import { Box, Card, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    [theme.breakpoints.down('sm')]: {
      height: '30%',
      weight: '30%'
    },
    [theme.breakpoints.up('sm')]: {
      height: '30%',
      width: '30%'
    },
    [theme.breakpoints.up('md')]: {
      height: '20%',
      width: '20%'
    },
    [theme.breakpoints.up('lg')]: {
      height: '10%',
      width: '10%'
    }
  },
  bold: {
    fontWeight: 'bold'
  },
  shapImage: {
    [theme.breakpoints.down('sm')]: {
      height: '80%',
      weight: '80%'
    },
    [theme.breakpoints.up('sm')]: {
      height: '100%',
      width: '100%'
    }
  }
}));
const TabDetailDog = ({ mode, dogDetail }) => {
  const classes = useStyles();

  return (
    <Box mb={7}>
      <Card>
        <Box m={2}>
          <img src={`${dogDetail.dog_image}`} alt="Dog Breed" className={classes.image} />
          <Box my={1} />
          <Typography variant="h5" color="textPrimary">
            <span className={classes.bold}>Breed's name: </span>
            {dogDetail.breed_class}
          </Typography>
          <Box my={1} />
          {mode === 'dogSimilarity' ? (
            <Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" color="textPrimary">
                  <span className={classes.bold}>Score:</span>
                </Typography>
                <Box mx={2} />
                <Typography variant="body1" color="textPrimary">
                  {`${Number.parseFloat(dogDetail.Score).toFixed(2)}`}
                </Typography>
              </Box>
            </Box>
          ) : null}
          <img src={`${dogDetail.SHAPFigure}`} alt="SHAP Explainer" className={classes.shapImage} />
          <Typography variant="h5" color="textPrimary">
            Overview
          </Typography>
          <Box my={1} />

          <Typography variant="body1" color="textPrimary">
            {dogDetail.breed_overview}
          </Typography>
          <Box my={1} />
          <Typography variant="h5" color="textPrimary">
            Facts
          </Typography>
          <Box my={1} />

          <Typography variant="body1" color="textPrimary">
            {dogDetail.breed_facts}
          </Typography>

          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Height:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {`From ${dogDetail.min_height} to ${dogDetail.max_height} inches`}
            </Typography>
          </Box>
          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Weight:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {`From ${dogDetail.min_weight} to ${dogDetail.max_weight} pounds`}
            </Typography>
          </Box>
          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Level of obey:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {`${dogDetail.level_of_obey}`}
            </Typography>
          </Box>
          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Recommended for:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {`${dogDetail.recommended_for}`}
            </Typography>
          </Box>
          <Box my={1} />
        </Box>
      </Card>
    </Box>
  );
};

export default TabDetailDog;
