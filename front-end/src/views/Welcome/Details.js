import React from 'react';
import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  queryField: {
    width: '100%'
  }
}));
const Details = () => {
  const classes = useStyles();
  return (
    <Box mt={4}>
      <Grid container spacing={5} direction="column">
        <Grid item xs={12} md={7}>
          <TextField
            className={classes.queryField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder="Company name ..."
            id="searchBar"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Box display="flex">
            <TextField
              className={classes.selectField}
              label="Criteria"
              name="Criteria"
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
            <Box flexGrow={1} />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Display Explainer and Query"
            />
          </Box>
        </Grid>
      </Grid>

      <Card></Card>
    </Box>
  );
};

export default Details;
