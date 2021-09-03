import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Button, Grid, SvgIcon, Typography, TextField } from '@material-ui/core';
import QueryTab from '../Result/TabDetails/TabQuery';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useState } from 'react';
import axios from 'src/utils/axios';
import { HTTPCustomResponse } from 'src/models/responses';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useEffect } from 'react';


const useStyles = makeStyles(() => ({
    root: {}
}));

type Props = {
    className?: string,
}
const Details: React.FunctionComponent<Props> = ({ className, ...rest }) => {
    /* eslint-disable array-callback-return */

    // States
    const classes = useStyles();
    const [isChanged, setIsChanged] = useState(false)
    const [query, setQuery] = useState('')
    const [useCaseList, setUseCaeList] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const [selectedUseCase, setUseCase] = useState('')
    const [result, setResult] = useState()

    // event handlers
    const handleOnClick = async () => {
        if (query !== undefined) {
            const data = { query: query }
            try {
                const res: HTTPCustomResponse = await axios.post('/KGNet/executeSparqlQuery', data);
                if (res.status === 200) {
                    // success
                    enqueueSnackbar(res.data.message, {
                        variant: 'success'
                    });
                    setResult(res.data.result)
                }
                else {
                    enqueueSnackbar(res.data.message, {
                        variant: 'error'
                    });
                }
            } catch (error: any) {
                console.log(error)
                enqueueSnackbar(`${error.detail[0].msg}: ${error.detail[0].loc[1]} has ${error.detail[0].type}`, {
                    variant: 'error'
                });
            }

        }
        else {
            enqueueSnackbar("Query is empty", {
                variant: 'warning'
            });
        }

    }

    const loadUseCase = useCallback(async () => {
        const data2 = { query: '*' }
        try {
            const res: HTTPCustomResponse = await axios.post('/KGNet/searchKGNET_APIsCatalogue', data2);
            if (res.status === 200) {
                setUseCaeList(res.data.result)
            }
            else throw new Error('Internal error from back-end');

        } catch (error: any) {
            console.log(error.detail || error.message)
        }
    }, [])

    useEffect(() => {
        loadUseCase()
    }, [loadUseCase])

    // render
    return (

        <Box className={classes.root} my={2}>
            <TextField
                label="Cutom Use Case"
                name="mode"
                value={selectedUseCase}
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
                        onClick={handleOnClick}
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
            <Box my={2}>
                {result}
            </Box>
        </Box>
    );
};

Details.propTypes = {
    className: PropTypes.string
};

export default Details;
