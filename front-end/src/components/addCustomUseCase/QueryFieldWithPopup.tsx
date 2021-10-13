import {
	Box,
	Button,
	Typography,
	SvgIcon,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Grid,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import QueryTab from "src/views/Result/TabDetails/TabQuery";
import SaveIcon from "@material-ui/icons/Save";
import { FileType } from "src/views/AddUseCase/Details";

export type QueryFieldWithPopupProps = {
	title: string;
	setDialog: any;
	isOpen: any;
	onClickUpload?: any;
	fileState?: any;
	refUdfFileInput?: any;
	handleFileUploaded?: any;
	saveQuery: any;
	getSavedQuery: any;
	queryState: any;
	setUserQuery: any;
	fileType?: FileType;
    storedKey: string
};

const QueryFieldWithPopup = (params:QueryFieldWithPopupProps) => {
	return (
		<Box display='flex' alignItems='center' justifyContent='flex-start'>
			<Grid xs={12} md={3}>
				<Typography variant='body1' color='textPrimary' gutterBottom>
					{params.title}
				</Typography>
			</Grid>
			<Grid xs={12} md={10}>
				<Grid container justifyContent='flex-start' alignItems='center'>
					<Grid xs={12} md={2} item>
						<Button
							variant='contained'
							color='primary'
							onClick={(e) => params.setDialog(true)}
							startIcon={
								<SvgIcon>
									<CreateIcon />
								</SvgIcon>
							}
						>
							Write
						</Button>
					</Grid>
					{params.refUdfFileInput !== undefined && (
						<Grid xs={12} md={3} item>
							<Button
								variant='contained'
								color='primary'
								onClick={(e) => params.onClickUpload("udf")}
								startIcon={
									<SvgIcon>
										<CloudUploadIcon />
									</SvgIcon>
								}
							>
								Upload
							</Button>
							<Box mx={1} />
							<Typography variant='caption' color='textPrimary'>
								{params.fileState?.name ?? ""}
							</Typography>
							<input
								type='file'
								id='image'
								ref={params.refUdfFileInput}
								style={{ display: "none" }}
								onChange={(e) => params.handleFileUploaded(e, params.fileType)}
							/>
						</Grid>
					)}
				</Grid>
			</Grid>

			<Dialog
				open={params.isOpen}
				onClose={(e) => params.setDialog(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogContent>
					<DialogTitle id='simple-dialog-title'>Enter SPARQL query for {params.title}</DialogTitle>
					<QueryTab userQuery={params.getSavedQuery(params.storedKey)} setUserQuery={params.setUserQuery} />
				</DialogContent>
				<DialogActions>
					<Button onClick={(e) => params.setDialog(false)} color='primary'>
						Cancel
					</Button>
					<Button
						color='primary'
						autoFocus
						startIcon={
							<SvgIcon>
								<SaveIcon />
							</SvgIcon>
						}
						onClick={(e) => {
							params.saveQuery(params.storedKey, params.queryState);
							params.setDialog(false);
						}}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default QueryFieldWithPopup;
