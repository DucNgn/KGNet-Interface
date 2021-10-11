import React, { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto";
import {
	Box,
	InputAdornment,
	LinearProgress,
	SvgIcon,
	TextField,
	Typography,
} from "@material-ui/core";
import Header from "./Header";
import Page from "../../components/Page";
import Details from "./Details";
import { HTTPCustomResponse } from "src/models/responses";
import { useSnackbar } from "notistack";
import axios from "src/utils/axios";
import GenericResult from "./GenericResult";
import DataTable from "../../components/MyTable";
import SearchIcon from "@material-ui/icons/Search";
import { getOriginalUseCaseList } from "./utils";

const CustomUseCaseRunner: React.FunctionComponent = () => {
	// States
	const [isChanged, setIsChanged] = useState(false);
	const [query, setQuery] = useState("");
	const [useCaseList, setUseCaseList] = useState<any>([]);
	const [selectedUseCase, setUseCase] = useState("");
	const [result, setResult] = useState<any>();
	const { enqueueSnackbar } = useSnackbar();
	const [isLoading, setLoading] = useState(false);
	const [keyWord, setKeyWord] = useState("");
	// event handlers
	const handleExecute = async () => {
		if (query !== "") {
			const trimmedQuery = query.replace(/\s+/g, " ");
			const data = { query: trimmedQuery };
			try {
				setLoading(true);
				const res: HTTPCustomResponse = await axios.post("/KGNet/executeSparqlQuery", data);
				setLoading(false);
				if (res.status === 200) {
					// success
					enqueueSnackbar(res.data.message, {
						variant: "success",
					});
					if (res.data !== "" && res.data.result !== undefined) {
						setResult(res.data.result);
					} else {
						setResult([]); // unvalid response
					}
				} else {
					// internal error
					enqueueSnackbar(res.data.message, {
						variant: "error",
					});
				}
			} catch (error: any) {
				console.log(error);
				enqueueSnackbar(`Internal error from server`, {
					variant: "error",
				});
			}
		} else {
			enqueueSnackbar("Query is empty", {
				variant: "warning",
			});
		}
	};

	const handleOnChange = (e: any) => {
		const value = e.target.value;
		if (value === "") {
			setUseCaseList(getOriginalUseCaseList())
		}
		else setKeyWord(value)
	};

	const findUdf = (e: any) => {
		// prevent refresh
		e.preventDefault();
		console.log("Inside");
		// fetch original db
		let originalValue: any[];
		let response = [];
		let dataFetched = localStorage.getItem("originalUseCaseList");
		if (dataFetched !== null) {
			originalValue = JSON.parse(dataFetched); // satisfy TypeScript type check
			// find key word match by name
			if (keyWord === "" || keyWord === undefined) {
				//reset
				setUseCaseList(originalValue);
			} else {
				const lowerCasedList = originalValue.map((el) =>{
					el.name = el.name.toLowerCase()
					return el
				});
				const lowerCaseKeyWord = keyWord.toLowerCase()
				response = lowerCasedList.filter((el) => el.name.includes(lowerCaseKeyWord));
				console.log("RESPONSE");
				console.log(response);
				setUseCaseList(response);
			}
		}
	};

	const loadUseCase = useCallback(async () => {
		const data2 = { query: "" };
		try {
			const res: HTTPCustomResponse = await axios.post("/KGNet/searchUsecasesCatalogue", data2);
			if (res.status === 200) {
				const list = res.data.result
				setUseCaseList(list);
				
				const map:{[key:string]:any}={}
				// create a hash map
				for(let i = 0; i < list.length ; i++){
					const key:string = list[i].usecase_name.replace(" ", "_") //lower case the name
					if(map[key] === undefined){
						// initialize
						map[key] = list[i]
					}
					else{ // duplicate name
						map[`${key}_${i}`] = list[i]
					}
				}

				localStorage.setItem("originalUseCaseMap", JSON.stringify(map)); // store the original list for future search
				localStorage.setItem("originalUseCaseList", JSON.stringify(list)); // store the original list for future search
			} else throw new Error("Internal error from back-end");
		} catch (error: any) {
			console.log(error.detail || error.message);
		}
	}, []);

	useEffect(() => {
		loadUseCase();
	}, [loadUseCase]);

	return (
		<Page title='Execute custom use cases'>
			<Box>
				<Header />
				<Box my={2} />
				<form onSubmit={(e) => findUdf(e)}>
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SvgIcon fontSize='small' color='action'>
										<SearchIcon />
									</SvgIcon>
								</InputAdornment>
							),
						}}
						placeholder='UDF name ...'
						variant='outlined'
						onChange={(e) => handleOnChange(e)}
					/>
				</form>

				<Box my={2} />
				<DataTable data={useCaseList} />
				<Details
					query={query}
					selectedUseCase={selectedUseCase}
					setUseCase={setUseCase}
					useCaseList={useCaseList}
					setQuery={setQuery}
					setIsChanged={setIsChanged}
					isChanged={isChanged}
					handleExecute={handleExecute}
				/>
				<Box my={3} />
				{isLoading && <LinearProgress />}
				{!isLoading && result !== undefined && result.length > 0 && (
					<GenericResult result={result} />
				)}
				{!isLoading && result !== undefined && result.length === 0 && (
					<Typography variant='h4' color='textPrimary'>
						No result found; please check your query syntax
					</Typography>
				)}
			</Box>
		</Page>
	);
};

export default CustomUseCaseRunner;
