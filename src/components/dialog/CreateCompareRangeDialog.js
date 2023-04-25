import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from 'react';
import { postBacktest } from 'api/backtestApi';
import COMPARE_RANGE_TYPES from 'enums/enums';

export default function CreateCompareRangeDialog({
    opened,
    onClose,
    callback
}) {

const [compareRangeType, setCompareRangeType] = useState("");
const [n, setN] = useState(0)
const [m, setM] = useState(0);

function generateJson() {
    if (compareRangeType == "") {
        alert.error("");
        return;
    }

    return {
        type: compareRangeType,
        n: n,
        m: m
    }
}

    return (
        <Dialog
            scroll="paper"
            fullWidth
            maxWidth="lg"
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
                        <Select
                            value={compareRangeType}
                            label="비교유형"
                            onChange={handleChange}
                        >
                        {COMPARE_RANGE_TYPES.map((v)=>{
                            <MenuItem id={v.name} value={v.name}>{v.text}</MenuItem>
                        })}
                        </Select>
                        <TextField fullWidth label="테스트이름" value={_name}/>
                    </Grid>
                    <Grid item lg={6}>
                        <DatePicker
                          selected={_startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="yyyy-MM-dd"
                          customInput={<TextField
                            fullWidth
                            label="시작일자"
                            />}
                          />
                    </Grid>
                    <Grid item lg={6}>
                      <DatePicker
                        selected={_endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        customInput={<TextField
                          fullWidth
                          label="종료일자"
                          />}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField fullWidth label="초기잔고" value={_initBalance}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={30}
                            autoFocus
                            fullWidth
                            value={_strategy}
                            />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>닫기</Button>
               <Button onClick={() => callback()}>테스트 시작</Button>
            </DialogActions>
        </Dialog>
    );
}