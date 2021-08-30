import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Button, Grid, SvgIcon, Typography } from '@material-ui/core';
import QueryTab from '../Result/TabDetails/TabQuery';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
    root: {}
}));

type Props = {
    className?: string,
}
const Details: React.FunctionComponent<Props> = ({ className, ...rest }) => {
    const classes = useStyles();
    const [isChanged, setIsChanged] = useState(false)
    const [query, setQuery] = useState('')
    return (
        <Box className={classes.root}>
            <Box>
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
                        // onClick={handleOnClick}
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
