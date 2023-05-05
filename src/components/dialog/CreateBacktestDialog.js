import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from 'react';
import { postBacktest } from 'api/backtestApi';
import { CreateRuleDialog } from 'components/dialog';

export default function CreateBacktestDialog({
    opened,
    onClose
}) {

    const [_startDate, setStartDate] = useState("");
    const [_endDate, setEndDate] = useState("")
    const [_strategy, setStrategy] = useState({rules:[]});
    const [_name, setName] = useState("");
    const [_initBalance, setInitBalance] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [createRuleDialogOpen, setCreateRuleDialogOpen] = useState(false);

    const handleCreateRuleDialogOpen = (event) => {
      setCreateRuleDialogOpen(true);
    }

    const handleCreateRuleDialogClose = () => {
      setCreateRuleDialogOpen(false);
    }

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
                        <TextField
                            fullWidth
                            label="테스트이름"
                            value={_name}
                            onChange={(e) => setName(e.target.value)}
                            />
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
                        <TextField
                            fullWidth
                            label="초기잔고"
                            value={_initBalance}
                            onChange={(e) => setInitBalance(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={15}
                            autoFocus
                            fullWidth
                            value={JSON.stringify(_strategy, null, 4)}
                            InputProps={{startAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreateRuleDialogOpen(true)}>새 규칙 생성</Button>
                                    <Button fullWidth onClick={()=>setStrategy({})}>초기화</Button>
                                </Grid>
                            )}}
                            />
                    </Grid>
                </Grid>

                <CreateRuleDialog
                  opened = {createRuleDialogOpen}
                  onClose = {handleCreateRuleDialogClose}
                  callback = {(v) => { setStrategy(st => ({...st, rules: [...st.rules, v]})); }}
                />
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>닫기</Button>
               <Button onClick={() => doBackTest()}>테스트 시작</Button>
            </DialogActions>
        </Dialog>
    );
}