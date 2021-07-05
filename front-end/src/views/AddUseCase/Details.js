import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, Box, TextField, makeStyles, Button, SvgIcon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  link: {
    [theme.breakpoints.down('md')]: {
      width: 300
    },
    width: 400
  }
}));

const Details = () => {
  const classes = useStyles();
  return (
    <Box my={2}>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Use case name
            </Typography>
            <Box mx={10} />
            <TextField
              className={classes.link}
              // onChange={(e) => handleOnchange(e.target.value)}
              label="Use case name"
              name="use case name"
              variant="outlined"
            />
          </Box>
          <Box my={3} />
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              KG data file .ttl
            </Typography>
            <Box mx={10} />
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <SvgIcon>
                  <CloudUploadIcon />
                </SvgIcon>
              }
            >
              Upload
            </Button>
          </Box>
          <Box my={3} />
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Custom UDF file (Java/C++)
            </Typography>
            <Box mx={4} />
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <SvgIcon>
                  <CloudUploadIcon />
                </SvgIcon>
              }
            >
              Upload
            </Button>
          </Box>
          <Box my={3} />
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Embedding end point
            </Typography>
            <Box mx={7} />
            <TextField
              className={classes.link}
              // onChange={(e) => handleOnchange(e.target.value)}
              label="Embedding endpoint"
              name="Embedding endpoint"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
      <Box my={5} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <SvgIcon>
              <AddIcon />
            </SvgIcon>
          }
        >
          Create custom use case
        </Button>
      </Box>
    </Box>
  );
};

export default Details;
