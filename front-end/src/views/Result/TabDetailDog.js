import { Box, Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    [theme.breakpoints.down("sm")]: {
      height: "50%",
      weight: "50%",
    },
    [theme.breakpoints.up("sm")]: {
      height: "35%",
      width: "35%",
    },
  },
  bold: {
    fontWeight: "bold",
  },
}));
const TabDetailDog = ({ mode, key, dogDetail }) => {
  const classes = useStyles();

  return (
    <Box mb={7}>
      <Card>
        <Box p={3}>
          <img
            src={`${dogDetail.dog_image}`}
            alt="Dog Breed"
            className={classes.image}
          />
          <Box my={1} />
          <Typography variant="h4" color="textPrimary">
            {dogDetail.breed_class}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            Overview
          </Typography>
          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              {dogDetail.breed_overview}
            </Typography>
          </Box>
          <Typography variant="h5" color="textPrimary">
            Facts
          </Typography>
          <Box my={1} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              {dogDetail.breed_facts}
            </Typography>
          </Box>
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
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              <span className={classes.bold}>Recommended for:</span>
            </Typography>
            <Box mx={2} />
            <Typography variant="body1" color="textPrimary">
              {`${dogDetail.recommended_for}`}
            </Typography>
          </Box>
          {mode === "dogSimilarity" ? (
            <Box display="flex" alignItems="center">
              <img
                src={`${dogDetail.SHAPFigure}`}
                alt="SHAP Explainer"
                className={classes.image}
              />
            </Box>
          ) : null}
        </Box>
      </Card>
    </Box>
  );
};

export default TabDetailDog;
