import React from 'react';
import '@fontsource/roboto';
import { Box } from '@material-ui/core';
import Header from './Header';
import Page from '../../components/Page';
import Details from './Details';

const CustomUseCaseRunner: React.FunctionComponent = () => {

    return (
        <Page title="Execute custom use cases">
            <Box>
                <Header />
                <Details />
                <Box my={3} />
            </Box>
        </Page>
    );
};

export default CustomUseCaseRunner;
