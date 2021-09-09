import React from 'react';
import { Box, Grid, TextField, InputAdornment, SvgIcon, makeStyles, Button } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  queryField: {
    width: '100%'
  },
  selectField: {
    width: '100%'
  }
}));
const Details = ({ handleShowResult, setCompanyName, setSimilarityFeature, similarityFeature, companyNameRef }) => {
  const classes = useStyles();

  const handleOnClick = (e) => {
    // let criteria = document.getElementById('criteria').value;
    // let company = document.getElementById('company').value;
    // setCompanyName(company)
    // setSimilarityFeature(criteria)
    handleShowResult()
  };

  return (
    <Box mt={4}>
      <Grid container spacing={5} direction="column">
        <Grid item xs={12} md={7}>
          <TextField
            className={classes.queryField}
            ref={companyNameRef}
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
            onChange={(e) =>  setCompanyName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Box display="flex">
            <Box>
              <TextField
                className={classes.selectField}
                label="Criteria"
                name="Criteria"
                onChange={e => {
                  console.log(e.target.value)
                  //setSimilarityFeature(e.target.value)
                }}
                select
                id="criteria"
                SelectProps={{ native: true }}
                // value={currentCustomer || ''}
                variant="outlined"
                value={similarityFeature}
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
            <ArrowDownwardIcon />
          </SvgIcon>
        </Button>
      </Box>
    </Box>
  );
};

export default Details;
