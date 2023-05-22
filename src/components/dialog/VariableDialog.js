import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from 'react';
import { postBacktest } from 'api/backtestApi';
import { variableDialog } from 'components/dialog';

export default function CreateBacktestDialog({
    opened,
    onClose,
    callback,
    isNew,
    paramKey,
    paramValue
}) {

    const [_key, setKey] = useState(paramKey);
    const [_value, setValue] = useState(paramValue);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function generateData() {
        return { key: _key ?? paramKey, value: _value ?? paramValue }
    }

    return (
        <Dialog
            scroll="paper"
            fullWidth
            maxWidth="sm"
            open={opened}
            onClose={onClose}>

            <Grid container justifyContent="space-between" alignItems="center">
                <DialogTitle>변수</DialogTitle>
                <DialogActions>
                  <Button onClick={onClose} color="secondary" autoFocus>
                    X
                  </Button>
                </DialogActions>
            </Grid>
            <DialogContent>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-around"
                  alignItems="stretch"
                >
                    <Grid item sm={12}>
                        <DialogContentText>
                            변수 설정 {_key} {_value}
                        </DialogContentText>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="key"
                            defaultValue={paramKey}
                            value={_key}
                            onChange={(e) => setKey(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="value"
                            defaultValue={paramValue}
                            value={_value}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            />
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>닫기</Button>
               <Button onClick={() => {callback(generateData()); onClose();} }>변수 {isNew ? "생성" : "수정"}</Button>
            </DialogActions>
        </Dialog>
    );
}