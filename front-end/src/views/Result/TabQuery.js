import React from 'react';
import { Box } from '@material-ui/core';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/sparql/sparql.js');

export default function QueryTab({ userQuery, setUserQuery, queryKeywords, setIsChanged }) {
  return (
    <Box mb={7}>
      <CodeMirror
        value={userQuery}
        options={{
          mode: 'sparql',
          theme: 'material',
          lineNumbers: true
        }}
        onChange={(editor, data, value) => {
          setUserQuery(value);
          setIsChanged(true);
        }}
      />
    </Box>
  );
}
