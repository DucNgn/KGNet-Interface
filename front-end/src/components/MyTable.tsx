import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(() => ({
	root: {},
	link: {
		color: "#FFFFFF",
		textDecoration: "none",
	},
	header: {
		fontWeight: "bolder",
	},
}));

function createData(name: any, url: any, description: any, parameters: any) {
	let parsedParameters = "";
	if (parameters !== null) {
		Object.keys(parameters).forEach((param) => {
			parsedParameters += `${param} : ${parameters[param]};`;
		});
	}
	return { name, url, parameters:parsedParameters, description };
}

function fectchData(data: any): Row[] {
	var res = data.map((el: any) => createData(el.usecase_name, el.api_name, el.Description, el.parameters));
	return res;
}

type Row = {
	name: string;
	url: string;
	parameters: string;
	description: string;
};

export default function MyTable({ data }: any) {
	const rows = fectchData(data);
	console.log(rows)
	const classes = useStyles();
    const currLocation = useLocation()

	return (
		<TableContainer component={Paper}>
			<Box display='flex' justifyContent='center' my={3}>
				<Typography variant='h5'>List of available custom use-cases</Typography>
			</Box>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell className={classes.header}>Use-case name</TableCell>
						<TableCell align='left'>Endpoint</TableCell>
						<TableCell align='left'>Parameters</TableCell>
						<TableCell align='left'>Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row: Row) => (
						<TableRow
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							component={Link}
							to={`${currLocation.pathname}/${row.name.replace(" ","_")}`}
							hover
							className={classes.link}
						>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell align='left'>{row.url}</TableCell>
							<TableCell align='left'>{row.parameters}</TableCell>
							<TableCell align='left'>{row.description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
