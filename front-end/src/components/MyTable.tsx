import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {},
	link: {
		color: "#FFFFFF",
		textDecoration: "none",
		cursor: "pointer",
	},
	header: {
		fontWeight: "bolder",
	},
}));

function createDataForUseCase(
	name: any,
	url: any,
	description: any,
	parameters: any
) {
	let parsedParameters = "";
	if (parameters !== null) {
		Object.keys(parameters).forEach((param) => {
			parsedParameters += `${param} : ${parameters[param]};`;
		});
	}
	return { name, url, parameters: parsedParameters, description };
}

function createDataForUdf(name: any, description: any, parameters: any) {
	let parsedParameters = "";
	if (parameters !== null) {
		Object.keys(parameters).forEach((param) => {
			parsedParameters += `${param} : ${parameters[param]};`;
		});
	}
	return { name, parameters: parsedParameters, description };
}

function fectchData(data: any, mode?: string): Row[] {
	var res: any = {};
	// TODO: May change if backend changes; this component is used by createUDF and createCustomUseCase
	// with two different response
	if (mode === "udf") {
		res = data.map((el: any) =>
			createDataForUdf(el.name, el.Description, el.parameters)
		);
	} else {
		res = data.map((el: any) =>
			createDataForUseCase(
				el.usecase_name,
				el.api_name,
				el.Description,
				el.parameters
			)
		);
	}
	return res;
}

type Row = {
	name: string;
	url: string;
	parameters: string;
	description: string;
};

export default function MyTable({ data, mode }: any) {
	const rows = fectchData(data, mode);
	const classes = useStyles();
	const currLocation = useLocation();
	const history = useHistory();

	const directTo = (name: string) => {
		const path = `${currLocation.pathname}/${name.replace(" ", "_")}`;
		history.push(path);
	};

	return (
		<TableContainer component={Paper}>
			<Box display="flex" justifyContent="center" my={3}>
				<Typography variant="h5">List of available custom use-cases</Typography>
			</Box>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.header}>Name</TableCell>
						{!mode && <TableCell align="left">Endpoint</TableCell>}
						<TableCell align="left">Parameters</TableCell>
						<TableCell align="left">Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row: Row) => (
						<TableRow
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							onClick={(e) => directTo(row.name)}
							hover
							className={classes.link}
						>
							<TableCell scope="row">{row.name}</TableCell>
							{!mode && <TableCell align="left">{row.url}</TableCell>}
							<TableCell align="left">{row.parameters}</TableCell>
							<TableCell align="left">{row.description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
