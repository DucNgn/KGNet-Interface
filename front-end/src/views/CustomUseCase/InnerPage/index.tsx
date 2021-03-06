import React, { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { generateImageWithUrl, generateQueryEditor, generateTextField } from "../utils";
import Page from "src/components/Page";
import { Box, LinearProgress, Typography } from "@material-ui/core";
import ExecuteButton from "src/components/ExecuteButton";
import GenericResult from "./GenericResult";
import useDebounce from "src/hooks/useDebounce";

type Data = {
	Description: string;
	usecase_name: string;
	api_name: string;
	parameters: { [key: string]: string };
};

const UseCaseDetail = () => {
	// States
	const [description, setDescription] = useState("");
	const [endpoint, setEndpoint] = useState("");
	const [name, setName] = useState("");
	const [params, setParams] = useState<Data["parameters"]>({});
	const [result, setResult] = useState<any>();
	const [isLoading, setLoading] = useState<Boolean>();

	// Extra states for params
	const [state1, setState1] = useState();
	const [state2, setState2] = useState();
	const [state3, setState3] = useState();

	// debounced the extra states for better performance
	const debouncedState1 = useDebounce(state1, 500);
	const debouncedState2 = useDebounce(state2, 500);
	const debouncedState3 = useDebounce(state3, 500);

	const currLocation = useLocation().pathname;

	const getUseCaseSearchKey = useCallback(() => {
		let useCaseName = "";
		const idx = currLocation.indexOf("customUseCase");
		if (idx >= 0) {
			useCaseName = currLocation.substring(idx + 14); // `customUseCase`.length is 14
		}
		return useCaseName;
	}, [currLocation]);

	const loadData = useCallback(() => {
		const searchKey = getUseCaseSearchKey();
		const response = localStorage.getItem("originalUseCaseMap");
		let dataMap: { [key: string]: any } = {};
		let result: Data = {
			Description: "",
			api_name: "",
			usecase_name: "",
			parameters: {},
		};

		if (response !== null) {
			dataMap = JSON.parse(response);
			result = dataMap[searchKey];

			// TODO: validate the data
			if (result.api_name === "" || result.api_name === undefined) {
				setEndpoint("executeSparqlQuery");
			} else {
				setEndpoint(result.api_name);
			}

			// set the states
			setDescription(result.Description);
			setName(result.usecase_name);
			//setEndpoint(result.api_name);
			setParams(result.parameters);
		}
	}, [getUseCaseSearchKey]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	/**
	 * Generate the components for inputs based on the given parameters
	 * extra states are for storing the input values.
	 * Most use-case only requires two at the moment. Will increase if need to.
	 * @returns
	 */
	const generateParams = (params: Data["parameters"]) => {
		let extraSetterArr = [setState1, setState2, setState3];
		let extraStaterArr = [debouncedState1, debouncedState2, debouncedState3];
		let response = [];
		let map: { [key: string]: any } = {};

		const keysNeedEditorArr = ["query", "SQL", "cognitiveQuery"];

		// TODO: Remove this when backend gives parameter `cognitiveQuery` for custom-usecase
		let hasEmptyParamBody = Object.keys(params).length < 1 ? true : false;

		if (!hasEmptyParamBody) {
			for (const key in params) {
				// make sure enough free states
				if (extraSetterArr.length > 0) {
					// return code editor
					if (keysNeedEditorArr.includes(key)) {
						// TODO: will delete if backend changes
						if (key === "cognitiveQuery" && params[key] === "") {
							// do nothing, don't render
						} else {
							response.push(generateQueryEditor(extraSetterArr.shift(), params[key]));
							map[key] = extraStaterArr.shift();
						}
					}
					// return textbox with image
					else if (key.includes("url")) {
						const val = extraStaterArr.shift();
						response.push(
							generateImageWithUrl({ label: key, setUrl: extraSetterArr.shift(), url: val })
						);
						map[key] = val;
					}
					// return text box
					else if (params[key] === "STRING") {
						response.push(generateTextField({ label: key, setValue: extraSetterArr.shift() }));
						map[key] = extraStaterArr.shift();
					} else throw new Error("The data type is not supported yet, please check");
				} else throw new Error("NOT ENOUGH FREE STATES, please add more!");
			}
		} else {
			// TODO: remove this after backend sends cognitiveQuery in parameter
			// generate a code-editor for empty body
			response.push(generateQueryEditor(extraSetterArr.shift()));
			map["cognitiveQuery"] = extraStaterArr.shift();
		}

		// Generate submit button || May have repetitive loop
		response.push(
			<Box display='flex' justifyContent='center'>
				<ExecuteButton
					paramsMap={map}
					endpoint={endpoint}
					resultSetter={setResult}
					setLoading={setLoading}
				/>
			</Box>
		);
		return <div>{response}</div>;
	};

	// dynamic rendering
	const generateResult = () => (
		<Box justifyContent='center'>
			{!isLoading && result !== undefined && result.length > 0 && <GenericResult result={result} />}
			{!isLoading && result !== undefined && result.length === 0 && (
				<Typography variant='h4' color='textPrimary'>
					No result found; please check your query syntax or input
				</Typography>
			)}
		</Box>
	);

	return (
		<Page title={name}>
			<Header useCaseName={name} />
			<Box my={4} />
			<Typography variant='body1' color='primary'>
				{description}
			</Typography>
			<Box my={4} />
			{generateParams(params)}
			<Box my={4}></Box>
			{generateResult()}
			{isLoading && <LinearProgress />}
		</Page>
	);
};

export default UseCaseDetail;
