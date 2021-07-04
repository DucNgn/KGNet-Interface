import { Box } from '@material-ui/core';
import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/sparql/sparql.js');

const QueryTab = ({ query, queryKeywords }) => {
  return (
    <Box mb={7} style={{ height: '500px' }}>
      {/* {query} */}
      <CodeMirror
        value={query}
        options={{
          mode: 'sparql',
          theme: 'material',
          lineNumbers: true
        }}
        onChange={(editor, data, value) => {
          // Place to add actions when code is modified
        }}
      />
    </Box>
  );
};

export default QueryTab;
