import { Box, Typography, makeStyles, Divider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {},
	image: {
		[theme.breakpoints.up("xs")]: {
			height: "30%",
			width: "30%",
		},
		[theme.breakpoints.up("md")]: {
			height: "20%",
			width: "20%",
		},
		[theme.breakpoints.up("lg")]: {
			height: "15%",
			width: "15%",
		},
	},
	bold: {
		fontWeight: "bold",
	},
	shapImage: {
		[theme.breakpoints.down("sm")]: {
			height: "100%",
			weight: "100%",
		},
		[theme.breakpoints.up("sm")]: {
			height: "80%",
			width: "80%",
		},
	},
}));

type Props = {
	result: any[];
};

const GenericResult: React.FunctionComponent<Props> = ({ result }) => {
	// States
	const classes = useStyles();
	// event handlers

	/* eslint-disable array-callback-return */

	return (
		<Box>
			<Typography variant="h4" color="textPrimary">
				Result for your query:
			</Typography>
			{result.map((res: any, idx: number) => {
				return (
					<Box my={4}>
						<Typography variant="h5" color="textPrimary">
							Result {idx + 1}:
						</Typography>
						{Object.keys(res).map((key: string) => (
							<Box display="flex" alignItems="center" my={2}>
								<Typography variant="body1" color="textPrimary">
									<span className={classes.bold}>{key}:</span>
								</Typography>
								<Box mx={2} />
								{res[key].includes(".jpg") || res[key].includes(".png") ? (
									<img src={`${res[key]}`} alt="URL" className={classes.image} />
								) : (
									<Typography variant="body1" color="textPrimary">
										{res[key]}
									</Typography>
								)}
							</Box>
						))}
						<Box my={2} />
						<Divider />
					</Box>
				);
			})}
		</Box>
	);
};

export default GenericResult;
