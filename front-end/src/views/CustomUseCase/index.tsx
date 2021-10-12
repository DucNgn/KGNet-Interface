import React, { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto";
import { Box, InputAdornment, SvgIcon, TextField } from "@material-ui/core";
import Header from "./Header";
import Page from "../../components/Page";
import { HTTPCustomResponse } from "src/models/responses";
import axios from "src/utils/axios";
import DataTable from "../../components/MyTable";
import SearchIcon from "@material-ui/icons/Search";
import useDebounce from "src/hooks/useDebounce";

const CustomUseCaseRunner: React.FunctionComponent = () => {
	// States
	const [useCaseList, setUseCaseList] = useState<any>([]);
	const [keyWord, setKeyWord] = useState("");
	const debouncedKeyWord = useDebounce(keyWord, 500);
	// event handlers

	const findUdf = useCallback(() => {
		// fetch original db
		let originalList: any[];
		let response = [];
		let dataFetched = localStorage.getItem("originalUseCaseList");
		if (dataFetched !== null) {
			originalList = JSON.parse(dataFetched); // satisfy TypeScript type check
			// find key word match by name
			if (debouncedKeyWord === "" || debouncedKeyWord === undefined) {
				//restore the list
				setUseCaseList(originalList);
			} else {
				// check for the keyword
				const lowerCaseKeyWord = debouncedKeyWord.toLowerCase();
				response = originalList.filter((el) => el.usecase_name.toLowerCase().includes(lowerCaseKeyWord));
				setUseCaseList(response);
			}
		}
	}, [debouncedKeyWord]);

	useEffect(() => {
		findUdf()
	}, [findUdf])

	const loadUseCase = useCallback(async () => {
		const data2 = { query: "" };
		try {
			const res: HTTPCustomResponse = await axios.post("/KGNet/searchUsecasesCatalogue", data2);
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

				localStorage.setItem("originalUseCaseMap", JSON.stringify(map)); // store the original list for future search
				localStorage.setItem("originalUseCaseList", JSON.stringify(list)); // store the original list for future search
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
		<Page title="Execute custom use cases">
			<Box>
				<Header />
				<Box my={2} />
				<TextField
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SvgIcon fontSize="small" color="action">
									<SearchIcon />
								</SvgIcon>
							</InputAdornment>
						),
					}}
					placeholder="UDF name ..."
					variant="outlined"
					onChange={(e) => setKeyWord(e.target.value)}
				/>

				<Box my={2} />
				<DataTable data={useCaseList} />
			</Box>
		</Page>
	);
};

export default CustomUseCaseRunner;
