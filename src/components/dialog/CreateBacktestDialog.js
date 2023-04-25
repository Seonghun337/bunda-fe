import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from 'react';
import { postBacktest } from 'api/backtestApi';

export default function CreateBacktestDialog({
    opened,
    onClose
}) {

const [_startDate, setStartDate] = useState("");
const [_endDate, setEndDate] = useState("")
const [_strategy, setStrategy] = useState("");
const [_name, setName] = useState("");
const [_initBalance, setInitBalance] = useState(0);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

    async function doBackTest() {
        const req = {
            name: _name,
            startDate: _startDate,
            endDate: _endDate,
            initialBalance: _initBalance,
            strategy: _strategy
        }

        try {
            setError(null);
            setLoading(true);
            const response = await postBacktest(req);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    return (
        <Dialog
            scroll="paper"
            fullWidth
            maxWidth="lg"
            open={opened}
            onClose={onClose}>

            <Grid container justifyContent="space-between" alignItems="center">
                <DialogTitle>새로운 테스트</DialogTitle>
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
                        <DialogContentText>
                            새로운 백테스팅을 실행합니다.
                        </DialogContentText>
                    </Grid>
                    <Grid item lg={12}>
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
               <Button onClick={() => doBackTest()}>테스트 시작</Button>
            </DialogActions>
        </Dialog>
    );
}