import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import Header from './Header';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import { useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Details from './Details';

const CustomUseCaseRunner: React.FunctionComponent = () => {
    const location = useLocation();
    const history = useHistory();
    const [companyName, setCompanyName] = useState('');
    const [criteria, setCriteria] = useState('');
    const [result, setResult] = useState([]);
    let params = queryString.parse(location.search);

    return (
        <Page title="Execute custom use cases">
            {result ? (
                <Box>
                    <Header mode={`${params.mode}`} />
                    <Details />
                    <Box my={3} />
                </Box>
            ) : (
                <LinearProgress />
            )}
        </Page>
    );
};

export default CustomUseCaseRunner;
