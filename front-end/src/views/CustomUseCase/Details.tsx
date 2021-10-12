import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Grid, Typography } from '@material-ui/core';
import QueryTab from '../Result/TabDetails/TabQuery';
import ExecuteButton from 'src/components/ExecuteButton';

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
            <Box my={2}>
                <QueryTab
                    setUserQuery={setQuery}
                    setIsChanged={setIsChanged}
                />
            </Box>
            <Box my={2} justifyContent="center">
                <Grid container direction="column" alignItems="center">
                    <ExecuteButton onClickHandler={handleExecute} />
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
