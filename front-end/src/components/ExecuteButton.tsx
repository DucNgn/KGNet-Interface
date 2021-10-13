import { Button, SvgIcon } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { HTTPCustomResponse } from "src/models/responses";
import axios from "src/utils/axios";
import { useSnackbar } from "notistack";

type Props = {
	onClickHandler?: any;
	paramsMap?: { [key: string]: any };
	endpoint?: string;
	resultSetter?: any;
	setLoading?: any;
};

const ExecuteButton = ({
	onClickHandler,
	paramsMap,
	endpoint,
	resultSetter,
	setLoading,
}: Props) => {
	const { enqueueSnackbar } = useSnackbar();

	const defaultHandler = async (originalMap: Props["paramsMap"], endpoint: Props["endpoint"]) => {
		let isMissingParams = false;
		let paramsMap = { ...originalMap }; // make a copy to re-write data
		const typesTobeTrimmedArr = ["query", "SQL", "cognitiveQuery"];
		// check if there is any empty field
		for (const key in originalMap) {
			if (originalMap[key] === undefined || originalMap[key] === "" || originalMap[key] === null) {
				isMissingParams = true;
			}
		}

		// If there's no missing field, load the data
		if (!isMissingParams) {
			// Prep the data body
			let executeQuery = ''
			for (const key in originalMap) {
				// trim whitespace such as \n to avoid syntax error on server back-end
				if (typesTobeTrimmedArr.includes(key)) {
					console.log('running well!')
					paramsMap[key] = originalMap[key].replace(/\s+/g, " ");
					//TODO: doublecheck if needed or not
					paramsMap[key] = paramsMap[key].replace(/\\n+/g, " ");
					executeQuery = paramsMap[key] // TODO: subject to change if all query params becomes `query`
				}
			}

			const data = paramsMap;
			// TODO: subject to change if params become `query`
			if(endpoint === "executeSparqlQuery" && data["query"] === undefined){
				data["query"] = executeQuery
			}
			
			try {
				setLoading(true);
				const res: HTTPCustomResponse = await axios.post(`/KGNet/${endpoint}`, data);
				setLoading(false);
				if (res.status === 200) {
					// success
					enqueueSnackbar(res.data.message, {
						variant: "success",
					});
					if (res.data !== "" && res.data.result !== undefined) {
						resultSetter(res.data.result);
					} else {
						resultSetter([]); // unvalid response
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
			enqueueSnackbar("Some fields are missing, please double check inputs", {
				variant: "warning",
			});
		}
	};

	const selectHandler = () => {
		// if a handler is presented, use it
		if (onClickHandler !== undefined) {
			onClickHandler();
			console.log("passed handler called");
		}
		// if params are provided, then call the default handler
		else if (
			paramsMap !== undefined &&
			endpoint !== undefined &&
			endpoint !== "" &&
			resultSetter !== undefined &&
			setLoading !== undefined
		) {
			defaultHandler(paramsMap, endpoint);
			console.log("Default handler called");
		} else {
			console.log("No handler called");
			enqueueSnackbar(`This use case is incomplete, please check its properties`, {
				variant: "error",
			});
		}
	};

	return (
		<Button
			variant='contained'
			color='primary'
			onClick={selectHandler}
			startIcon={
				<SvgIcon>
					<PlayCircleOutlineIcon />
				</SvgIcon>
			}
		>
			Execute
		</Button>
	);
};

export default ExecuteButton;
