import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { postBacktest } from 'api/backtestApi';
import useCodes from 'hooks/useCodes';
import { CreateOrderRuleDialog } from 'components/dialog';

export default function CreateOrderRulesDialog({
    opened,
    onClose,
    callback
}) {

    const [_orderType, setOrderType] = useState("BUY");
    const [_orders, setOrders] = useState([])

    const [createOrderRuleDialogOpen, setCreateOrderRuleDialogOpen] = useState(false);

    function generateJson() {
        return {
            orderType: _orderType,
            orders: _orders,
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
                <DialogTitle>주문규칙목록</DialogTitle>
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
                            value={_orderType}
                            label="지정가/시장가"
                            onChange={(e) => {setOrderType(e.target.value)}}
                        >
                            <MenuItem key="LIMIT" value="LIMIT">지정가</MenuItem>
                            <MenuItem key="MARKET" value="MARKET">시장가</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_orders, null, 4)}
                            label="주문규칙목록"
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreateOrderRuleDialogOpen(true)}> 추가</Button>
                                    <Button fullWidth onClick={()=>setOrders([])}> 초기화</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                </Grid>

                <CreateOrderRuleDialog
                    opened = {createOrderRuleDialogOpen}
                    onClose = {() => setCreateOrderRuleDialogOpen(false)}
                    callback = {(v) => setOrders((o) => [...o,v])}
                />

            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>취소</Button>
               <Button onClick={() => {callback(generateJson()); onClose(); }}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}