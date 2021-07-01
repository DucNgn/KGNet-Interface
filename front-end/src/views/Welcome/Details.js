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
  Checkbox,
  Button
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  queryField: {
    width: '100%'
  },
  selectField: {
    width: '100%'
  }
}));
const Details = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnClick = (e) => {
    let criteria = document.getElementById('criteria').value;
    let company = document.getElementById('company').value;
    console.log(criteria);
    history.push(`/result?mode=companies&company=${company}&criteria=${criteria}`);
  };

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
            id="company"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Box display="flex">
            <Box>
              <TextField
                className={classes.selectField}
                label="Criteria"
                name="Criteria"
                // onChange={handleCustomerChange}
                select
                id="criteria"
                SelectProps={{ native: true }}
                // value={currentCustomer || ''}
                variant="outlined"
              >
                <option value="profits">Profits</option>
                <option value="market_value">Market value</option>
                <option value="sales">Sales</option>
                <option value="assets">Assets</option>
                <option value="Rank">Rank</option>
              </TextField>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box my={2} className={classes.centerItem}>
        <Button variant="contained" color="primary" onClick={handleOnClick}>
          Next
          <SvgIcon>
            <ArrowRightAltIcon />
          </SvgIcon>
        </Button>
      </Box>
    </Box>
  );
};

export default Details;
