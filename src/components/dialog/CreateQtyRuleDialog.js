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

const [ QTY_TYPES ] = useCodes('QTY_TYPES');
const [ MARGIN_TYPES ] = useCodes('MARGIN_TYPES');

const [_qtyType, setQtyType] = useState("");
const [_marginType, setMarginType] = useState("")
const [_qtyValue, setQtyValue] = useState(0);

function generateJson() {
    return {
        qtyType: _qtyType,
        marginType: _marginType,
        qtyValue: _qtyValue,
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
                <DialogTitle>수량규칙</DialogTitle>
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
                            value={_qtyType}
                            label="수량타입"
                            onChange={(e) => {setQtyType(e.target.value)}}
                        >
                            {QTY_TYPES.map((v)=> {
                                return (<MenuItem id={v.name} value={v.name}>{v.text}</MenuItem>);
                            })}
                        </TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            select
                            fullWidth
                            value={_marginType}
                            disabled = {_qtyType === "FIXED"}
                            label="가격 기준"
                            onChange={(e) => {setMarginType(e.target.value)}}
                        >
                            {MARGIN_TYPES.map((v)=> {
                                return (<MenuItem id={v.name} value={v.name}>{v.text}</MenuItem>);
                            })}
                        </TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_qtyValue}
                            label="값"
                            onChange={(e) => {setQtyValue(e.target.value)}}
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