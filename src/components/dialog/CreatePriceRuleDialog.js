import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { postBacktest } from 'api/backtestApi';
import useCodes from 'hooks/useCodes';
import { CreateTargetStatisticsDialog } from 'components/dialog';

export default function CreateCompareRangeDialog({
    opened,
    onClose,
    callback
}) {

const [OPERATOR_TYPES] = useCodes('OPERATOR_TYPES');
const [_isNowPrice, setIsNowPrice] = useState("");
const [_targetStatistics, setTargetStatistics] = useState({})
const [_operatorType, setOperatorType] = useState("");
const [_operationValue, setOperationValue] = useState(0.0);

const [createTargetStatisticsDialogOpen, setCreateTargetStatisticsDialogOpen] = useState(false);

function generateJson() {
    return {
        isNowPrice: _isNowPrice,
        targetStatistics: _targetStatistics,
        operatorType: _operatorType,
        operationValue: _operationValue,
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
                <DialogTitle>가격규칙</DialogTitle>
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
                            label="기준값 유형"
                            onChange={(e) => {setIsNowPrice(e.target.value === "NOW_PRICE")}}
                        >
                            <MenuItem key="NOW_PRICE" value="NOW_PRICE">현재가 기준</MenuItem>
                            <MenuItem key="STATISTICS" value="STATISTICS">통계값 기준</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            multiline
                            rows={4}
                            disabled={_isNowPrice}
                            autoFocus
                            fullWidth
                            label="대상통계값"
                            value={JSON.stringify(_targetStatistics, null, 4)}
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth disabled={_isNowPrice}
                                        onClick={()=>setCreateTargetStatisticsDialogOpen(true)}>수정</Button>
                                    <Button fullWidth disabled={_isNowPrice}
                                        onClick={()=>setTargetStatistics({})}>삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            select
                            fullWidth
                            value={_operatorType}
                            label="연산유형"
                            onChange={(e) => {setOperatorType(e.target.value)}}
                        >
                            {OPERATOR_TYPES.map((v)=> {
                                return (<MenuItem key={v.name} value={v.name}>{v.text}</MenuItem>);
                            })}
                        </TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_operationValue}
                            label="연산값"
                            onChange={(e) => {setOperationValue(e.target.value)}}
                        />
                    </Grid>
                </Grid>

                <CreateTargetStatisticsDialog
                    opened = {createTargetStatisticsDialogOpen}
                    onClose = {() => setCreateTargetStatisticsDialogOpen(false)}
                    callback = {(v) => setTargetStatistics(v)}
                />

            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>취소</Button>
               <Button onClick={() => {callback(generateJson()); onClose(); }}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}