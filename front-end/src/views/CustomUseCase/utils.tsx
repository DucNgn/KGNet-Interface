import { Box, TextField, Typography } from "@material-ui/core";
import QueryTab from "../Result/TabDetails/TabQuery";

export const getOriginalUseCaseList = () => {
	let originalValue = [];
	let dataFetched = localStorage.getItem("originalUseCaseList");
	if (dataFetched !== null) {
		originalValue = JSON.parse(dataFetched); // satisfy TypeScript type check
	}
	return originalValue;
};

export const generateTextField = ({ className = "", label, setValue }: any) => {
	return (
		<Box m={4}>
			<TextField
				className={className}
				placeholder={`${label}...`}
				id={label}
				variant='outlined'
				onChange={(e) => setValue(e.target.value)}
			/>
		</Box>
	);
};

export const generateImageWithUrl = ({ className = "", label, setUrl, url }: any) => {
	return (
		<Box m={4}>
			<TextField
				className={className}
				onChange={(e) => setUrl(e.target.value)}
				label={label}
				name='Link'
				variant='outlined'
			/>
			<Box my={3} />
			{url === "" ? (
				<Typography variant='caption' color='textSecondary'>
					Nothing to display
				</Typography>
			) : (
				<img height='100%' alt='dog' width='100%' src={url} />
			)}
		</Box>
	);
};

export const generateQueryEditor = (setQuery: any) => {
	return (
		<Box my={2}>
			<QueryTab setUserQuery={setQuery} />
		</Box>
	);
};
