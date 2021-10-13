import React, { useRef, useState } from "react";
import {
	Card,
	CardContent,
	Box,
	makeStyles,
	Button,
	SvgIcon
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "src/utils/axios";
import { useSnackbar } from "notistack";
import { HTTPCustomResponse } from "src/models/responses";
import TextFieldWithTitle, { TextFieldWithTitleProps } from "src/components/TextFieldWithTitle";
import QueryFieldWithPopup, {
	QueryFieldWithPopupProps,
} from "src/components/addCustomUseCase/QueryFieldWithPopup";
import useDebounce from "src/hooks/useDebounce";

export enum FileType{
	udf = "udf",
	cognetive = "cognetive"
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
	// state declaration
	const classes = useStyles();
	const [useCaseName, setUseCaseName] = useState("");
	const [ttlUrl, setTtlUrl] = useState("");

	// States for udf field
	const [udfFile, setUdfFile] = useState<File>();
	const [udfQuery, setUdfQuery] = useState("");
	const [newEndPoint, setNewEndPoint] = useState("");
	const UdfFileInput = useRef(null);
	const { enqueueSnackbar } = useSnackbar();
	const [isDialogOpen, setDialogOpen] = useState(false);

	// states for cognetive query field
	const [isCognetiveQueryOpen, setCognetiveQueryOpen] = useState(false)
	const [cognetiveQuery, setCognetiveQuery] = useState("")

	// debounced states
	const debouncedUdfQuery = useDebounce(udfQuery, 500);
	const debouncedCognetiveQuery = useDebounce(cognetiveQuery, 500);

	// Some maps for less repetitive code
	const FILE_TYPES: { [key: string]: any } = {
		udf: {
			inputReference: UdfFileInput,
			setter: setUdfFile,
		},
		cognetive: {
			inputReference: UdfFileInput,
			setter: setUdfFile,
		}

	};

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

	// Event handlers
	const handleSubmit = async () => {
		// reset value for all states
		if (ttlUrl !== "" && useCaseName !== "" && newEndPoint !== "" && udfQuery !== "") {
			const trimmedUdfQuery = udfQuery.replace(/\s+/g, " ");
			const trimmedCognitiveQuery = cognetiveQuery.replace(/\s+/g, " ");

			const data = {
				file: udfFile ?? "",
				ttlFileUri: ttlUrl ?? "",
				name: useCaseName ?? "",
				EmbeddingEndpoint: newEndPoint ?? "",
				UDF: trimmedUdfQuery ?? "",
				cognitiveQuery: trimmedCognitiveQuery ?? ""
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
			enqueueSnackbar("Some field is missing", {
				variant: "warning",
			});
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

	const saveQuery = (key:string, val: string) => {
		localStorage.setItem(key, val);
	};

	const getSavedQuery = (storedKey:string) => {
		const value = localStorage.getItem(storedKey);
		if (value !== undefined && value !== "" && value !== null) return value;
		else return "";
	};

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
			storedKey: "udfQuery"
		},

		cognetiveQuery: {
			title: "Cognetive query",
			setDialog: setCognetiveQueryOpen,
			isOpen: isCognetiveQueryOpen,
			getSavedQuery: getSavedQuery,
			queryState: debouncedCognetiveQuery,
			saveQuery: saveQuery,
			setUserQuery: setCognetiveQuery,
			storedKey: "cognetiveQuery"
		}
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
					<QueryFieldWithPopup
						title={QUERY_FIELDS["udf"].title}
						setDialog={QUERY_FIELDS["udf"].setDialog}
						isOpen={QUERY_FIELDS["udf"].isOpen}
						onClickUpload={QUERY_FIELDS["udf"].onClickUpload}
						fileState={QUERY_FIELDS["udf"].fileState}
						refUdfFileInput={QUERY_FIELDS["udf"].refUdfFileInput}
						handleFileUploaded={QUERY_FIELDS["udf"].handleFileUploaded}
						saveQuery={QUERY_FIELDS["udf"].saveQuery}
						getSavedQuery={QUERY_FIELDS["udf"].getSavedQuery}
						queryState={QUERY_FIELDS["udf"].queryState}
						setUserQuery={QUERY_FIELDS["udf"].setUserQuery}
						storedKey={QUERY_FIELDS["udf"].storedKey}
					/>
					<Box my={3} />
					<QueryFieldWithPopup
						title={QUERY_FIELDS["cognetiveQuery"].title}
						setDialog={QUERY_FIELDS["cognetiveQuery"].setDialog}
						isOpen={QUERY_FIELDS["cognetiveQuery"].isOpen}
						saveQuery={QUERY_FIELDS["cognetiveQuery"].saveQuery}
						getSavedQuery={QUERY_FIELDS["cognetiveQuery"].getSavedQuery}
						queryState={QUERY_FIELDS["cognetiveQuery"].queryState}
						setUserQuery={QUERY_FIELDS["cognetiveQuery"].setUserQuery}
						storedKey={QUERY_FIELDS["cognetiveQuery"].storedKey}
					/>
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
