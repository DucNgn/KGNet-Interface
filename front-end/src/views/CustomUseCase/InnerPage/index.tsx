import React, { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { generateImageWithUrl, generateQueryEditor, generateTextField } from "../utils";
import Page from "src/components/Page";
import { Box, Typography } from "@material-ui/core";

type Data = {
	Description: string;
	URL: string;
	name: string;
	parameters: { [key: string]: string };
};

const UseCaseDetail = () => {
	// States
	const [description, setDescription] = useState("");
	const [url, setUrl] = useState("");
	const [name, setName] = useState("");
	const [params, setParams] = useState<Data["parameters"]>();
	const [keyValueMap, setMap] = useState<any>();
	// Extra states for params
	const [state1, setState1] = useState();
	const [state2, setState2] = useState();
	const [state3, setState3] = useState();

	const currLocation = useLocation().pathname;

	const getUseCaseName = () => {
		// get from the current address
		let useCaseName = "";
		const idx = currLocation.indexOf("customUseCase");
		if (idx >= 0) {
			useCaseName = currLocation.substring(idx + 14);
		}
		return useCaseName;
	};

	const getUseCaseInfo = () => {
		const searchKey = getUseCaseName().toLowerCase();
		const response = localStorage.getItem("originalUseCaseMap");
		let dataMap: { [key: string]: any } = {};
		let result: Data = {
			Description: "",
			URL: "",
			name: "",
			parameters: {},
		};

		if (response !== null) {
			dataMap = JSON.parse(response);
			result = dataMap[searchKey];

			// set the states
			setDescription(result.Description);
			setName(result.name);
			setUrl(result.URL);
			setParams(result.parameters);
		}
	};

	// useCallback and useEffect with dependency = [] to call only once

	const loadData = useCallback(() => {
		getUseCaseInfo();
	}, []);

	useEffect(() => {
		loadData();
	}, []);

	const generateParams = () => {
		let extraSetterArr = [setState1, setState2, setState3];
		let extraStaterArr = [state1, state2, state3];
		let response = [];
		let map: { [key: string]: any } = {};

		for (const key in params) {
			// make sure enough free states
			if (extraSetterArr.length > 0) {
				// return code editor
				if (key === "query" || key === "SQL") {
					response.push(generateQueryEditor(extraSetterArr.shift()));
					map[key] = extraStaterArr.shift();
				}
				// return text box
				else if (params[key] === "STRING") {
					response.push(generateTextField({ label: key, setValue: extraSetterArr.shift() }));
					map[key] = extraStaterArr.shift();
				}
				// return textbox with image
				else if (params[key] === "URL") {
					const val = extraStaterArr.shift();
					response.push(
						generateImageWithUrl({ label: key, setUrl: extraSetterArr.shift(), url: val })
					);
					map[key] = val;
				}
			} else throw new Error("NOT ENOUGH FREE STATES, please add more!");
		}

		return <div>{response}</div>;
	};

    const generateSubmitButton = () => {}
	// dynamic rendering

	return (
		<Page title={name}>
			<Header useCaseName={getUseCaseName()} />
			<Box my={4} />
			<Typography variant='body1' color='primary'>
				{description}
			</Typography>
			<Box my={4} />
			{generateParams()}
			<Box my={4}>

            </Box>
		</Page>
	);
};

export default UseCaseDetail;
