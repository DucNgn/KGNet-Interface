import { Box } from '@material-ui/core';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/sparql/sparql.js');

type Props = {
  userQuery?: string;
  setUserQuery?: any;
  queryKeywords?: string;
  setIsChanged?: any;
};
export default function QueryTab({ userQuery, setUserQuery, queryKeywords, setIsChanged }: Props) {
  return (
    <Box mb={7}>
      <CodeMirror
        value={userQuery}
        options={{
          mode: 'sparql',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true
        }}
        onChange={(editor, data, value) => {
          //if (setIsChanged !== undefined) setIsChanged(true);
          if (setUserQuery !== undefined) setUserQuery(value)
        }}
      />
    </Box>
  );
}
