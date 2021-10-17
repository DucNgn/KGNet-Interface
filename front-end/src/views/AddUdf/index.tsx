import React, { useState } from "react";
import "@fontsource/roboto";
import Header from "./Header";
import Page from "../../components/Page";
import { Box } from "@material-ui/core";
import Details from "./Details";
import { LinearProgress } from "@material-ui/core";

const AddUdf = () => {
	const [isLoading, setLoading] = useState(false);
	return (
		<Page title='Add custom UDF'>
			<Header />
			<Box my={2}>{isLoading ? <LinearProgress /> : <Details setLoading={setLoading} />}</Box>
		</Page>
	);
};

export default AddUdf;
