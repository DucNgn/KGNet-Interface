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

export enum FileType {
	udf = "udf",
	cognitive = "cognitive",
}

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
	const previousCognitiveQuery = getSavedQuery("cognitiveQuery");

	// state declaration
	const classes = useStyles();
	const [useCaseName, setUseCaseName] = useState("");
	const [ttlUrl, setTtlUrl] = useState("");
	const history = useHistory()

	// States for udf field
	const [udfFile, setUdfFile] = useState<File>();
	const [udfQuery, setUdfQuery] = useState(previousUdfQuery);
	const [newEndPoint, setNewEndPoint] = useState("");
	const UdfFileInput = useRef(null);
	const { enqueueSnackbar } = useSnackbar();
	const [isDialogOpen, setDialogOpen] = useState(false);

	// states for cognitive query field
	const [isCognitiveQueryOpen, setCognitiveQueryOpen] = useState(false);
	const [cognitiveQuery, setCognitiveQuery] = useState(previousCognitiveQuery);

	// debounced states
	const debouncedUdfQuery = useDebounce(udfQuery, 500);
	const debouncedCognitiveQuery = useDebounce(cognitiveQuery, 500);

	// ----- Some maps for less repetitive code ------
	// data for showing as file upload
	const FILE_TYPES: { [key: string]: any } = {
		udf: {
			inputReference: UdfFileInput,
			setter: setUdfFile,
		},
		cognitive: {
			inputReference: UdfFileInput,
			setter: setUdfFile,
		},
	};

	// data for showing as textfield
	const TEXT_FIELDS: { [key: string]: TextFieldWithTitleProps } = {
		use_case_name: {
			placeholder: "Use case name",
			label: "Use case name",
			setter: setUseCaseName,
			value: useCaseName,
		},
		kg_ttl: {
			placeholder: "KG data file .ttl",
			label: "URL for .ttl file",
			setter: setTtlUrl,
			value: ttlUrl,
		},
		embedding_endpoint: {
			placeholder: "Embedding url",
			label: "Embedding endpoint",
			setter: setNewEndPoint,
			value: newEndPoint,
		},
	};

	// Data for sending to the api
	const DATA_FIELDS: { [key: string]: { errorMessage: string; value: any } } = {
		ttlUrl: {
			errorMessage: "ttl URL is missing",
			value: ttlUrl,
		},
		useCaseName: {
			errorMessage: "Use case name is missing",
			value: useCaseName,
		},
		entryPoint: {
			errorMessage: "Endpoint is missing",
			value: newEndPoint,
		},
		udfQuery: {
			errorMessage: "udf query is missing",
			value: udfQuery,
		},
		cognitiveQuery: {
			errorMessage: "cognitive query is missing",
			value: cognitiveQuery,
		},
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
			const trimmedCognitiveQuery = cognitiveQuery.replace(/\\n+/g, " ");

			const data = {
				file: udfFile ?? "",
				ttlFileUri: ttlUrl ?? "",
				name: useCaseName ?? "",
				EmbeddingEndpoint: newEndPoint ?? "",
				UDF: trimmedUdfQuery ?? "",
				cognitiveQuery: trimmedCognitiveQuery ?? "",
			};

			try {
				setLoading(true);
				const res: HTTPCustomResponse = await axios.post("/KGNet/createCustomUsecase", data);
				setLoading(false);
				if (res.data.code === 200) {
					// success
					enqueueSnackbar(res.data.message, {
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

	const handleOnClickUpload = (type: string) => {
		if (FILE_TYPES[type] !== undefined) {
			FILE_TYPES[type].inputReference.current.click();
		} else console.log("ERROR: THE FILE TYPE IS NOT SUPPORTED YET");
	};

	const handleFileUploaded = (event: any, type: string) => {
		const fileUploaded = event.target.files[0];
		if (FILE_TYPES[type] !== undefined) {
			FILE_TYPES[type].setter(fileUploaded);
		} else console.log("ERROR: THE FILE TYPE IS NOT SUPPORTED YET");
	};

	// Data requires code editor
	const QUERY_FIELDS: { [key: string]: QueryFieldWithPopupProps } = {
		udf: {
			title: "Custom UDF file (Java/C++)",
			setDialog: setDialogOpen,
			isOpen: isDialogOpen,
			onClickUpload: handleOnClickUpload,
			fileState: udfFile,
			getSavedQuery: getSavedQuery,
			handleFileUploaded: handleFileUploaded,
			queryState: debouncedUdfQuery,
			refUdfFileInput: UdfFileInput,
			saveQuery: saveQuery,
			setUserQuery: setUdfQuery,
			fileType: FileType.udf,
			storedKey: "udfQuery",
		},

		cognitiveQuery: {
			title: "Cognitive query",
			setDialog: setCognitiveQueryOpen,
			isOpen: isCognitiveQueryOpen,
			getSavedQuery: getSavedQuery,
			queryState: debouncedCognitiveQuery,
			saveQuery: saveQuery,
			setUserQuery: setCognitiveQuery,
			storedKey: "cognitiveQuery",
		},
	};

	return (
		<Box my={2}>
			<Card>
				<CardContent>
					<TextFieldWithTitle
						placeholder={TEXT_FIELDS["use_case_name"].placeholder}
						label={TEXT_FIELDS["use_case_name"].label}
						setter={TEXT_FIELDS["use_case_name"].setter}
						value={TEXT_FIELDS["use_case_name"].value}
						className={classes.link}
					/>
					<Box my={3} />
					<TextFieldWithTitle
						placeholder={TEXT_FIELDS["kg_ttl"].placeholder}
						label={TEXT_FIELDS["kg_ttl"].label}
						setter={TEXT_FIELDS["kg_ttl"].setter}
						value={TEXT_FIELDS["kg_ttl"].value}
						className={classes.link}
					/>
					<Box my={3} />
					<QueryFieldWithPopup params={QUERY_FIELDS["udf"]} />
					<Box my={3} />
					<QueryFieldWithPopup params={QUERY_FIELDS["cognitiveQuery"]} />
					<Box my={3} />
					<TextFieldWithTitle
						placeholder={TEXT_FIELDS["embedding_endpoint"].placeholder}
						label={TEXT_FIELDS["embedding_endpoint"].label}
						setter={TEXT_FIELDS["embedding_endpoint"].setter}
						value={TEXT_FIELDS["embedding_endpoint"].value}
						className={classes.link}
					/>
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
					Create custom use case
				</Button>
			</Box>
		</Box>
	);
};

export default Details;
