import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";

const SelectBox = ({mode, onSwitchMode}) => {
  return (
    <Grid item>
      <FormControl>
        <InputLabel shrink>Search Mode</InputLabel>
        <Select id="change-mode" value={mode} onChange={onSwitchMode}>
          <MenuItem value={"company"}>Company Similarity</MenuItem>
          <MenuItem value={"image"}>Image Recognition</MenuItem>
        </Select>
        <FormHelperText>Select the type of search</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default SelectBox;
