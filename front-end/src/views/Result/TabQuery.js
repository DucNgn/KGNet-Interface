import { Box, Card } from "@material-ui/core";
import React from "react";

const QueryTab = ({ query, queryKeywords }) => {
  return (
    <Box mb={7}>
      <Card>{query}</Card>
    </Box>
  );
};

export default QueryTab;
