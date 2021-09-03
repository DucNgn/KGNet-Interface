import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box } from '@material-ui/core';
import Header from './Header';
import Page from '../../components/Page';
import Details from './Details';
import { HTTPCustomResponse } from 'src/models/responses';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';

const CustomUseCaseRunner: React.FunctionComponent = () => {
    // States
    const [isChanged, setIsChanged] = useState(false)
    const [query, setQuery] = useState('')
    const [useCaseList, setUseCaeList] = useState([])
    const [selectedUseCase, setUseCase] = useState('')
    const [result, setResult] = useState()
    const { enqueueSnackbar } = useSnackbar();

    // event handlers
    const handleExecute = async () => {
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

    return (
        <Page title="Execute custom use cases">
            <Box>
                <Header />
                <Details query={query}
                    selectedUseCase={selectedUseCase}
                    setUseCase={setUseCase}
                    useCaseList={useCaseList}
                    setQuery={setQuery}
                    setIsChanged={setIsChanged}
                    isChanged={isChanged}
                    handleExecute={handleExecute} />
                <Box my={3} />
                {result}
            </Box>
        </Page>
    );
};

export default CustomUseCaseRunner;
