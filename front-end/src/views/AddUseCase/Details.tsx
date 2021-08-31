import { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, Box, TextField, makeStyles, Button, SvgIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import { HTTPCustomResponse } from 'src/models/responses';
import QueryTab from '../Result/TabDetails/TabQuery';

const useStyles = makeStyles((theme) => ({
  link: {
    [theme.breakpoints.down('md')]: {
      width: 300
    },
    width: 400
  }
}));

const Details = () => {
  // state declaration
  const classes = useStyles();
  const [useCaseName, setUseCaseName] = useState('')
  const [ttlFile, setTtlFile] = useState<File>()
  const [udfFile, setUdfFile] = useState<File>()
  const [udfQuery, setUdfQuery] = useState('')
  const [newEndPoint, setNewEndPoint] = useState('')
  const TtlFileInput = useRef(null)
  const UdfFileInput = useRef(null)
  const { enqueueSnackbar } = useSnackbar();
  const [isDialogOpen, setDialogOpen] = useState(false)
  const handleSubmit = async () => {
    // reset value for all states
    if (udfFile !== undefined && ttlFile !== undefined) {
      const data = new FormData()
      data.append('file', udfFile)
      data.append('ttlFile', ttlFile)
      data.append('name', useCaseName)
      data.append('EmbeddingEndpoint', newEndPoint)

      try {
        const res: HTTPCustomResponse = await axios.post('/KGNet/createCustomUsecase', data);
        if (res.data.code === 200) {
          // success
          enqueueSnackbar(res.data.message, {
            variant: 'success'
          });
        }
        else {
          enqueueSnackbar(res.data.message, {
            variant: 'error'
          });
        }
      } catch (error) {
        console.log(error)
        enqueueSnackbar(`${error.detail[0].msg}: ${error.detail[0].loc[1]} has ${error.detail[0].type}`, {
          variant: 'error'
        });
      }

    }
    else {
      enqueueSnackbar("Files are not uploaded yet", {
        variant: 'error'
      });
    }

  }

  const fileType: { [key: string]: any } = {
    'ttl': {
      inputReference: TtlFileInput,
      setter: setTtlFile
    },
    'udf': {
      inputReference: UdfFileInput,
      setter: setUdfFile
    }
  }

  const handleOnClickUpload = (type: string) => {
    if (fileType[type] !== undefined) {
      fileType[type].inputReference.current.click()
    }
    else console.log("ERROR: THE FILE TYPE IS NOT DEFINED IN THE CODE")
  }

  const handleFileUploaded = (event: any, type: string) => {
    const fileUploaded = event.target.files[0];
    if (fileType[type] !== undefined) {
      fileType[type].setter(fileUploaded)
    }
    else console.log("ERROR: THE FILE TYPE IS NOT DEFINED IN THE CODE")
  }

  return (
    <Box my={2}>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Use case name
            </Typography>
            <Box mx={10} />
            <TextField
              className={classes.link}
              label="Use case name"
              name="use case name"
              variant="outlined"
              value={useCaseName}
              onChange={(e) => setUseCaseName(e.target.value)}
            />
          </Box>
          <Box my={3} />
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              KG data file .ttl
            </Typography>
            <Box mx={10} />
            <Button
              onClick={(e) => handleOnClickUpload('ttl')}
              variant="contained"
              color="primary"
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
              {ttlFile?.name ?? ''}
            </Typography>
            <input type="file" id="image" accept="image/*" ref={TtlFileInput} style={{ display: 'none' }} onChange={(e) => handleFileUploaded(e, 'ttl')} />
          </Box>
          <Box my={3} />
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Custom UDF file (Java/C++)
            </Typography>
            <Box mx={4} />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setDialogOpen(true)}
              startIcon={
                <SvgIcon>
                  <CreateIcon />
                </SvgIcon>
              }
            >
              Create procedure
            </Button>
            <Box mx={2} />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleOnClickUpload('udf')}
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
              {udfFile?.name ?? ''}
            </Typography>
            <input type="file" id="image" ref={UdfFileInput} style={{ display: 'none' }} onChange={(e) => handleFileUploaded(e, 'udf')} />
          </Box>
          <Box my={3} />
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Embedding end point
            </Typography>
            <Box mx={7} />
            <TextField
              className={classes.link}
              onChange={(e) => setNewEndPoint(e.target.value)}
              label="Embedding endpoint"
              name="Embedding endpoint"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
      <Box my={5} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          startIcon={
            <SvgIcon>
              <AddIcon />
            </SvgIcon>
          }
        >
          Create custom use case
        </Button>
      </Box>
      <Dialog
        open={isDialogOpen}
        onClose={(e) => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="simple-dialog-title">Enter query to create the custom precedure</DialogTitle>
          <QueryTab setUserQuery={setUdfQuery} />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary" autoFocus startIcon={
            <SvgIcon>
              <SaveIcon />
            </SvgIcon>
          }>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
};

export default Details;
