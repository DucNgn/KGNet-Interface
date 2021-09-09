import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Button, Grid, SvgIcon, Typography, TextField } from '@material-ui/core';
import QueryTab from '../Result/TabDetails/TabQuery';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
    root: {}
}));

type Props = {
    query: string,
    selectedUseCase: string,
    setUseCase: Function,
    useCaseList: string[],
    setQuery: Function,
    setIsChanged: Function,
    isChanged: boolean,
    handleExecute: any,
    className?: string,
}
const Details: React.FunctionComponent<Props> = ({ query, selectedUseCase, setUseCase, useCaseList, setQuery, setIsChanged, isChanged, handleExecute, className, ...rest }) => {
    /* eslint-disable array-callback-return */
    // States
    const classes = useStyles();

    // render
    return (

        <Box className={classes.root} my={2}>
            <TextField
                label="Cutom Use Case"
                name="mode"
                onChange={(e) => setUseCase(e.target.value)}
                select
                SelectProps={{ native: true }}
                variant="outlined"
            >
                {useCaseList.map((useCase: any) => (
                    <option value={useCase.UDF_Name}>{useCase.UDF_Name}</option>
                )
                )}

            </TextField>
            <Box my={2}>
                <QueryTab
                    userQuery={query}
                    setUserQuery={setQuery}
                    setIsChanged={setIsChanged}
                />
            </Box>
            <Box my={2} justifyContent="center">
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExecute}
                        startIcon={
                            <SvgIcon>
                                <PlayCircleOutlineIcon />
                            </SvgIcon>
                        }
                    >
                        Execute
                    </Button>
                    {isChanged ? (
                        <Typography variant="caption" color="textSecondary">
                            Seems like the query has been changed, let's execute it!
                        </Typography>
                    ) : null}
                </Grid>
            </Box>
        </Box>
    );
};

Details.propTypes = {
    className: PropTypes.string
};

export default Details;
