import React from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import Page from '../../components/Page';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import Header from './Header';
const Home = () => {
  return (
    <Box>
      <Header />
      <Card>
        <CardHeader title="Home hihihahahahahahahhahah" />
        <CardContent>
          <Typography variant="h1" color="textPrimary">
            KGNET
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
