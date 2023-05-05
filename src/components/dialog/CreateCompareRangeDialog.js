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

const [COMPARE_RANGE_TYPES] = useCodes('COMPARE_RANGE_TYPES');
const [compareRangeType, setCompareRangeType] = useState("");
const [_n, setN] = useState(0)
const [_m, setM] = useState(0);

function generateJson() {
    if (compareRangeType === "") {
        alert.error("");
        return {};
    }

    return {
        type: compareRangeType,
        n: _n,
        m: _m
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
                <DialogTitle>비교규칙</DialogTitle>
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
                    <Grid item lg={12}>
                        <TextField
                            select
                            fullWidth
                            value={compareRangeType}
                            label="비교유형"
                            onChange={(e) => {setCompareRangeType(e.target.value)}}
                        >
                            {COMPARE_RANGE_TYPES.map((v)=> {
                                return (<MenuItem id={v.name} value={v.name}>{v.text}</MenuItem>);
                            })}
                        </TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_n}
                            label="n"
                            onChange={(e) => {setN(e.target.value)}}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_m}
                            label="m"
                            onChange={(e) => {setM(e.target.value)}}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>취소</Button>
               <Button onClick={() => {callback(generateJson()); onClose(); }}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}