import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { postBacktest } from 'api/backtestApi';
import useCodes from 'hooks/useCodes';
import { CreateConditionDialog, CreateOrderRulesDialog } from 'components/dialog';

export default function CreateRuleDialog({
    opened,
    onClose,
    callback
}) {

    const [ TERM_UNITS ] = useCodes('TERM_UNITS');
    const [_frequency, setFrequency] = useState("")
    const [_openConditions, setOpenConditions] = useState([]);
    const [_openOrderRules, setOpenOrderRules] = useState({});
    const [_closeConditions, setCloseConditions] = useState([]);
    const [_closeOrderRules, setCloseOrderRules] = useState({});
    const [_cancelConditions, setCancelConditions] = useState([]);

    const [createOpenConditionsDialogOpen, setCreateOpenConditionsDialogOpen] = useState(false);
    const [createCloseConditionsDialogOpen, setCreateCloseConditionsDialogOpen] = useState(false);
    const [createCancelConditionsDialogOpen, setCreateCancelConditionsDialogOpen] = useState(false);
    const [createOpenOrderRulesDialogOpen, setOpenOrderRulesDialogOpen] = useState(false);
    const [createCloseOrderRulesDialogOpen, setCloseOrderRulesDialogOpen] = useState(false);

    function generateJson() {
        if (_frequency === "") {
            alert.error("");
            return {};
        }

        return {
            frequency: _frequency,
            openConditions: _openConditions,
            openOrderRules: _openOrderRules,
            closeConditions: _closeConditions,
            closeOrderRules: _closeOrderRules,
            cancelConditions: _cancelConditions
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
                <DialogTitle>규칙</DialogTitle>
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
                            value={_frequency}
                            label="주기"
                            onChange={(e) => {setFrequency(e.target.value)}}
                        >
                            {TERM_UNITS.map((v)=> {
                                return (<MenuItem key={v.name} value={v.name}>{v.text}</MenuItem>);
                            })}
                        </TextField>
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_openConditions, null, 4)}
                            label="주문 Open 조건"
                            InputProps={{endAdornment: (
                                <Grid>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setCreateOpenConditionsDialogOpen(true)}> 추가</Button>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setOpenConditions([])}> 초기화</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_openOrderRules, null, 4)}
                            label="주문 Open 규칙"
                            onChange={(e) => {setOpenOrderRules(e.target.value)}}
                            InputProps={{endAdornment: (
                                <Grid>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setOpenOrderRulesDialogOpen(true)}> 생성</Button>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setOpenOrderRules({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_closeConditions, null, 4)}
                            label="주문 Close 조건"
                            InputProps={{endAdornment: (
                                <Grid>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setCreateCloseConditionsDialogOpen(true)}> 추가</Button>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setCloseConditions([])}> 초기화</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_closeOrderRules, null, 4)}
                            label="주문 Close 규칙"
                            InputProps={{endAdornment: (
                                <Grid>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setCloseOrderRulesDialogOpen(true)}> 생성</Button>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setCloseOrderRules({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_cancelConditions, null, 4)}
                            label="주문 취소 조건"
                            InputProps={{endAdornment: (
                                <Grid>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setCreateCancelConditionsDialogOpen(true)}> 추가</Button>
                                    <Button fullWidth sx={{alignSelf: "start"}} onClick={()=>setCancelConditions([])}> 초기화</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={6}/>
                </Grid>
                <CreateConditionDialog
                    opened = {createOpenConditionsDialogOpen}
                    onClose = {() => setCreateOpenConditionsDialogOpen(false)}
                    callback = {(v) => setOpenConditions(c => [...c, v])}
                />
                <CreateConditionDialog
                    opened = {createCloseConditionsDialogOpen}
                    onClose = {() => setCreateCloseConditionsDialogOpen(false)}
                    callback = {(v) => setCloseConditions(c => [...c, v])}
                />
                <CreateConditionDialog
                    opened = {createCancelConditionsDialogOpen}
                    onClose = {() => setCreateCancelConditionsDialogOpen(false)}
                    callback = {(v) => setCancelConditions(c => [...c, v])}
                />
                <CreateOrderRulesDialog
                    opened = {createOpenOrderRulesDialogOpen}
                    onClose = {() => setOpenOrderRulesDialogOpen(false)}
                    callback = {(v) => setOpenOrderRules(v)}
                />
                <CreateOrderRulesDialog
                    opened = {createCloseOrderRulesDialogOpen}
                    onClose = {() => setCloseOrderRulesDialogOpen(false)}
                    callback = {(v) => setCloseOrderRules(v)}
                />

            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>취소</Button>
               <Button onClick={() => {callback(generateJson()); onClose(); }}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}