import React, { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto";
import {
	Box,
	Button,
	Grid,
	InputAdornment,
	SvgIcon,
	TextField,
} from "@material-ui/core";
import { HTTPCustomResponse } from "src/models/responses";
import axios from "src/utils/axios";
import DataTable from "../../components/MyTable";
import SearchIcon from "@material-ui/icons/Search";
import useDebounce from "src/hooks/useDebounce";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const Details: React.FunctionComponent = () => {
	// States
	const [useCaseList, setUseCaseList] = useState<any>([]);
	const [keyWord, setKeyWord] = useState("");
	const debouncedKeyWord = useDebounce(keyWord, 500);
	const history = useHistory();
	// event handlers

	/**
	 * Direct to the add page
	 */
	const handleCreate = () => {
		history.push("/addUdf");
	};

	/**
	 * Search for a usecase when users enter a keyword
	 */
	const findUseCase = useCallback(() => {
		// fetch original db
		let originalList: any[];
		let response = [];
		let dataFetched = localStorage.getItem("originalUdfList");
		if (dataFetched !== null) {
			originalList = JSON.parse(dataFetched); // satisfy TypeScript type check
			// find key word match by name
			if (debouncedKeyWord === "" || debouncedKeyWord === undefined) {
				//restore the list
				setUseCaseList(originalList);
			} else {
				// check for the keyword
				const lowerCaseKeyWord = debouncedKeyWord.toLowerCase();
				response = originalList.filter((el) =>
					el.usecase_name.toLowerCase().includes(lowerCaseKeyWord)
				);
				setUseCaseList(response);
			}
		}
	}, [debouncedKeyWord]);

	useEffect(() => {
		findUseCase();
	}, [findUseCase]);
	console.log(useCaseList)
	const loadUseCase = useCallback(async () => {
		const data2 = { query: "*" };
		try {
			const res: HTTPCustomResponse = await axios.post(
				"/KGNet/searchUDFsCatalogue",
				data2
			);
			if (res.status === 200) {
				const list = res.data.result;
				setUseCaseList(list);

				const map: { [key: string]: any } = {};
				// create a hash map
				for (let i = 0; i < list.length; i++) {
					// making keys based on names, some names contain whitespace and we want to replace it by _
					const key: string = list[i].usecase_name.replace(" ", "_");
					if (map[key] === undefined) {
						// initialize the cell
						map[key] = list[i];
					} else {
						// duplicate name
						map[`${key}_${i}`] = list[i];
					}
				}

				localStorage.setItem("originalUdfMap", JSON.stringify(map)); // store the original list for future search
				localStorage.setItem("originalUdfList", JSON.stringify(list)); // store the original list for future search
			} else {
				throw new Error("Internal error from back-end");
			}
		} catch (error: any) {
			console.log(error.detail || error.message);
		}
	}, []);

	useEffect(() => {
		loadUseCase();
	}, [loadUseCase]);

	return (
			<Box>
				<Box my={2} />
				<Grid
					container
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Grid item>
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
							placeholder='Use-case name ...'
							variant='outlined'
							onChange={(e) => setKeyWord(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<Button variant='contained' color='primary' onClick={handleCreate}
						startIcon={
							<AddIcon/>
						}
						>
							Create
						</Button>
					</Grid>
				</Grid>

				<Box my={2} />
				{/* <DataTable data={useCaseList} /> */}
			</Box>
	);
};

export default Details;
