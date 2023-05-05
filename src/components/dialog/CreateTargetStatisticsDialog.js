import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { postBacktest } from 'api/backtestApi';
import useCodes from 'hooks/useCodes';


export default function CreateCompareRangeDialog({
    opened,
    onClose,
    callback
}) {

const [ STATISTICS_TYPES ] = useCodes('STATISTICS_TYPES');
const [_statisticsType, setStatisticsType] = useState("");
const [_termUnit, setTermUnit] = useState("HOUR")
const [_n, setN] = useState(0.0);
const [_v1, setV1] = useState(0.0);
const [_v2, setV2] = useState(0.0);
const [_v3, setV3] = useState(0.0);

function generateJson() {
    return {
        statisticsType: _statisticsType,
        termUnit: _termUnit,
        n: _n,
        v1: _v1,
        v2: _v2,
        v3: _v3,
    }
}

    return (
        <Dialog
            scroll="paper"
            fullWidth
            maxWidth="xs"
            open={opened}
            onClose={onClose}>

            <Grid container justifyContent="space-between" alignItems="center">
                <DialogTitle>대상통계값</DialogTitle>
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            value={_statisticsType}
                            label="통계값유형"
                            onChange={(e) => {setStatisticsType(e.target.value)}}
                        >
                            {STATISTICS_TYPES.map((v) =>
                                (<MenuItem key={v.name} value={v.name}>{v.text}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_n}
                            label="n"
                            onChange={(e) => {setN(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_v1}
                            label="파라미터1"
                            onChange={(e) => {setV1(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_v2}
                            label="파라미터2"
                            onChange={(e) => {setV2(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_v3}
                            label="파라미터3"
                            onChange={(e) => {setV3(e.target.value)}}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>취소</Button>
               <Button onClick={() => { callback(generateJson()); onClose(); }}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}