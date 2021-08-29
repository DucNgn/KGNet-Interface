import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, SvgIcon, Typography, Grid, makeStyles } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TabDetailCompany from './TabDetails/TabDetailCompany';
import TabDetailDog from './TabDetails/TabDetailDog';
import QueryTab from './TabDetails/TabQuery';
import { ICompany } from 'src/models/company.model';
import { IDogInfo } from 'src/models/dogInfo.model';
import TabPanel from 'src/components/TabPanel';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  shapImage: {
    width: '100%',
    height: '100%'
  }
}));

type MyTabProps = {
  mode: string;
  result: any;
  query: any;
  queryKeywords: string;
  shapOriginalImage: string;
  shapDescription: string | string[];
  setUserQuery?: any;
};
const MyTabs: React.FunctionComponent<MyTabProps> = ({
  mode,
  result,
  query,
  queryKeywords,
  shapOriginalImage,
  shapDescription
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const history = useHistory();
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleOnClick = () => {
    history.push('/result?mode=dogSimilarity');
  };

  /**
   * return a data entry in the details tab
   * @param {*} mode mode of the use case
   * @param {*} result the response from the API
   * @returns the detail of each card
   */
  const returnTabDetail = (mode: string, result: any) => {
    if (mode === 'companies') {
      return result.map((company: ICompany, idx: number) => <TabDetailCompany key={idx} companyDetail={company} />);
    }
    if (mode === 'dogInfo' || mode === 'dogSimilarity') {
      return result.map((dog: IDogInfo, idx: number) => <TabDetailDog mode={mode} key={idx} dogDetail={dog} />);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Overall" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Query" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box>
          <Typography variant="h5" color="textPrimary">
            Here is how we identify the results
          </Typography>
          <Box m={3}>
            <img src={`${shapOriginalImage}`} alt="shap explanation" className={classes.shapImage} />
            <Box display="flex" justifyContent="center">
              <Typography variant="caption" color="textSecondary">
                {shapDescription}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" color="textPrimary">
            {`We found ${result.length} result(s).`}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {`The top three are: `}
          </Typography>
          <ol>
            {result !== undefined
              ? result.map((el: any, idx: number) => {
                if (mode === 'companies' && idx < 3) return <li key={el.name}>{el.name}</li>;
                else if (idx < 3) return <li key={el.breed_class}>{el.breed_class}</li>;
              })
              : null}
          </ol>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {returnTabDetail(mode, result)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box>
          <QueryTab
            userQuery={query}
            queryKeywords={queryKeywords}
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
      </TabPanel>
    </div>
  );
};

export default MyTabs;
