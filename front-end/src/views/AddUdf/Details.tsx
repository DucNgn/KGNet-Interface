import React, { useRef, useState } from "react";
import { Card, CardContent, Box, makeStyles, Button, SvgIcon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "src/utils/axios";
import { useSnackbar } from "notistack";
import { HTTPCustomResponse } from "src/models/responses";
import TextFieldWithTitle, { TextFieldWithTitleProps } from "src/components/TextFieldWithTitle";
import QueryFieldWithPopup, {
	QueryFieldWithPopupProps,
} from "src/components/addCustomUseCase/QueryFieldWithPopup";
import useDebounce from "src/hooks/useDebounce";
import { getSavedQuery, saveQuery } from "src/utils/saveQuery";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	link: {
		[theme.breakpoints.down("md")]: {
			width: 300,
		},
		width: 400,
	},
}));

const Details = ({ setLoading }: any) => {
	// Restore queries if exists
	const previousUdfQuery = getSavedQuery("udfQuery");

	// state declaration
	const classes = useStyles();
	const history = useHistory()
	const { enqueueSnackbar } = useSnackbar();

	// States for udf field
	const [udfQuery, setUdfQuery] = useState(previousUdfQuery);
	const [isDialogOpen, setDialogOpen] = useState(false);

	// debounced states
	const debouncedUdfQuery = useDebounce(udfQuery, 500);

	// Data for sending to the api
	const DATA_FIELDS: { [key: string]: { errorMessage: string; value: any } } = {
		udfQuery: {
			errorMessage: "udf query is missing",
			value: udfQuery,
		}
	};

	// ------- Event handlers ---------
	const handleSubmit = async () => {
		// CONSIDER: reset value for all states

		// validate missing fields
		let hasMissingFields = false;

		try {
			for (const key in DATA_FIELDS) {
				if (DATA_FIELDS[key].value === undefined || DATA_FIELDS[key].value === "") {
					throw new Error(DATA_FIELDS[key].errorMessage);
				}
			}
		} catch (error: any) {
			hasMissingFields = true;
			enqueueSnackbar(error.message, {
				variant: "warning",
			});
		}

		// if no misisng field, send form
		if (!hasMissingFields) {
			//FIXME: remove redundant \n n the string, backend error
			const trimmedUdfQuery = udfQuery.replace(/\\n+/g, " ");

			const data = {
				SQL: trimmedUdfQuery || undefined
			};

			try {
                //TODO: Change if Hussein updates
				setLoading(true);
				const res: HTTPCustomResponse = await axios.post("/KGNet/createVirtuosoProcedure", data);
				setLoading(false);
				if (res.status === 200) {
					// success
					enqueueSnackbar(res.data.result, {
						variant: "success",
					});
					// leave users 2s to read the success message, then go back to the list
					setTimeout(() => {
						history.goBack()
					},2000)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: "error",
					});
				}
			} catch (error: any) {
				console.log(error);
				enqueueSnackbar(`${error}`, {
					variant: "error",
				});
			}
		} else {
			// do nothing
		}
	};

	// Data requires code editor
	const QUERY_FIELDS: { [key: string]: QueryFieldWithPopupProps } = {
		udf: {
			title: "Custom UDF file (Java/C++)",
			setDialog: setDialogOpen,
			isOpen: isDialogOpen,
			getSavedQuery: getSavedQuery,
			queryState: debouncedUdfQuery,
			saveQuery: saveQuery,
			setUserQuery: setUdfQuery,
			storedKey: "udfQuery",
		}
	};

	return (
		<Box my={2}>
			<Card>
				<CardContent>
					<Box my={3} />
					<QueryFieldWithPopup params={QUERY_FIELDS["udf"]} />
				</CardContent>
			</Card>
			<Box my={5} display='flex' justifyContent='center'>
				<Button
					variant='contained'
					onClick={handleSubmit}
					color='primary'
					startIcon={
						<SvgIcon>
							<AddIcon />
						</SvgIcon>
					}
				>
					Create a custom UDF
				</Button>
			</Box>
		</Box>
	);
};

export default Details;
