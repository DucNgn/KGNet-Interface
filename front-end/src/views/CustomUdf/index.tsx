import React from "react";
import {
	Box,
} from "@material-ui/core";
import Header from "./Header";
import Page from "../../components/Page";
import Details from "./Details"

const CustomUdfRunner: React.FunctionComponent = () => {

	return (
		<Page title='Execute custom use cases'>
			<Box>
				<Header />
				<Box my={2} />
				<Details/>
			</Box>
		</Page>
	);
};

export default CustomUdfRunner;
