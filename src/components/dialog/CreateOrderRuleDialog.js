import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { postBacktest } from 'api/backtestApi';
import { CreateQtyRuleDialog, CreatePriceRuleDialog } from 'components/dialog';

export default function CreateOrderRuleDialog({
    opened,
    onClose,
    callback
}) {

    const STATISTICS_TYPES = [];
    const [_side, setSide] = useState("BUY");
    const [_qtyRule, setQtyRule] = useState({})
    const [_priceRule, setPriceRule] = useState({});
    const [_tpPriceRule, setTpPriceRule] = useState({});
    const [_slPriceRule, setSlPriceRule] = useState({});

    const [createQtyRuleDialogOpen, setCreateQtyRuleDialogOpen] = useState(false);
    const [createPriceRuleDialogOpen, setCreatePriceRuleDialogOpen] = useState(false);
    const [createTpPriceRuleDialogOpen, setCreateTpPriceRuleDialogOpen] = useState(false);
    const [createSlPriceRuleDialogOpen, setCreateSlPriceRuleDialogOpen] = useState(false);

    function generateJson() {
        return {
            side: _side,
            qtyRule: _qtyRule,
            priceRule: _priceRule,
            tpPriceRule: _tpPriceRule,
            slPriceRule: _slPriceRule
        }
    }

    return (
        <Dialog
            scroll="paper"
            fullWidth
            maxWidth="sm"
            open={opened}
            onClose={onClose}>

            <Grid container justifyContent="space-between" alignItems="center">
                <DialogTitle>주문규칙</DialogTitle>
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
                        <TextField
                            select
                            fullWidth
                            value={_side}
                            label="매수/매도"
                            onChange={(e) => {setSide(e.target.value)}}
                        >
                            <MenuItem id="BUY" value="BUY">매수</MenuItem>
                            <MenuItem id="SELL" value="SELL">매도</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_qtyRule, null, 4)}
                            label="수량 규칙"
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreateQtyRuleDialogOpen(true)}> 수정</Button>
                                    <Button fullWidth onClick={()=>setQtyRule({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_priceRule, null, 4)}
                            label="가격 규칙"
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreatePriceRuleDialogOpen(true)}> 수정</Button>
                                    <Button fullWidth onClick={()=>setPriceRule({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_tpPriceRule, null, 4)}
                            label="TP 가격 규칙"
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreateTpPriceRuleDialogOpen(true)}> 수정</Button>
                                    <Button fullWidth onClick={()=>setTpPriceRule({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_slPriceRule, null, 4)}
                            label="SL 가격 규칙"
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreateSlPriceRuleDialogOpen(true)}> 수정</Button>
                                    <Button fullWidth onClick={()=>setSlPriceRule({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                </Grid>

                <CreateQtyRuleDialog
                    opened = {createQtyRuleDialogOpen}
                    onClose = {() => setCreateQtyRuleDialogOpen(false)}
                    callback = {(v) => setQtyRule(v)}
                />
                <CreatePriceRuleDialog
                    opened = {createPriceRuleDialogOpen}
                    onClose = {() => setCreatePriceRuleDialogOpen(false)}
                    callback = {(v) => setPriceRule(v)}
                />
                <CreatePriceRuleDialog
                    opened = {createTpPriceRuleDialogOpen}
                    onClose = {() => setCreateTpPriceRuleDialogOpen(false)}
                    callback = {(v) => setTpPriceRule(v)}
                />
                <CreatePriceRuleDialog
                    opened = {createSlPriceRuleDialogOpen}
                    onClose = {() => setCreateSlPriceRuleDialogOpen(false)}
                    callback = {(v) => setSlPriceRule(v)}
                />
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>취소</Button>
               <Button onClick={() => {callback(generateJson()); onClose(); }}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}