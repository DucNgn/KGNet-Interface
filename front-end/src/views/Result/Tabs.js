import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TabDetailCompany from './TabDetailCompany';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import TabDetailDog from './TabDetailDog';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MyTabs({ mode, result }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   *
   * @param {*} mode mode of the use case
   * @param {*} result the response from the API
   * @returns the detail of each card
   */
  const returnTabDetail = (mode, result) => {
    if (mode === 'companies') {
      return result.map((company, idx) => <TabDetailCompany key={idx} companyDetail={company} />);
    }
    if (mode === 'dog') {
      return result.map((dog, idx) => <TabDetailDog key={idx} dogDetail={dog} />);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Results" {...a11yProps(0)} />
          <Tab label="Query" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {returnTabDetail(mode, result)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
        <CodeMirror
          value="<h1>I ♥ react-codemirror2</h1>"
          options={{
            mode: 'xml',
            theme: 'material',
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {}}
        />
      </TabPanel>
    </div>
  );
}
