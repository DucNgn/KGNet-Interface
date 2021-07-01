import React from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import Page from '../../components/Page';
import { Card, CardHeader, CardContent, Box } from '@material-ui/core';

const About = () => {
  return (
    <Page title="About KGNET">
      <Header />
      <Box my={2}>
        <Card>
          <CardHeader title="About KGNET" />
          <CardContent>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              KGNet - CoDS created by Hussien
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

export default About;
