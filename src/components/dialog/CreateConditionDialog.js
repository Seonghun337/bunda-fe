import PropTypes from 'prop-types';
// @mui
import { Grid, Dialog, MenuItem, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Checkbox, TextField, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from 'react';
import { postBacktest } from 'api/backtestApi';
import useCodes from 'hooks/useCodes';
import { CreateCompareRangeDialog, CreateTargetStatisticsDialog } from 'components/dialog';

export default function CreateConditionDialog({
    opened,
    onClose,
    callback
}) {
    const [COMPARE_TYPES] = useCodes('COMPARE_TYPES')
    const [_targetStatistics, setTargetStatistics] = useState({});
    const [_compareRange, setCompareRange] = useState({});
    const [_threshold, setThreshold] = useState("");
    const [_compareType, setCompareType] = useState("");

    const [createTargetStatisticsDialogOpen, setCreateTargetStatisticsDialogOpen] = useState(false);
    const [createCompareRangeDialogOpen, setCreateCompareRangeDialogOpen] = useState(false);

    function generateJson() {
        return {
            targetStatistics: _targetStatistics,
            compareRange: _compareRange,
            threshold: _threshold,
            compareType: _compareType
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
                <DialogTitle>새 조건 추가</DialogTitle>
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
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_targetStatistics, null, 4)}
                            label="대상값"
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreateTargetStatisticsDialogOpen(true)}> 수정</Button>
                                    <Button fullWidth onClick={()=>setTargetStatistics({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={JSON.stringify(_compareRange, null, 4)}
                            label="비교범위"
                            InputProps={{endAdornment: (
                                <Grid sx={{alignSelf: "start"}}>
                                    <Button fullWidth onClick={()=>setCreateCompareRangeDialogOpen(true)}> 수정</Button>
                                    <Button fullWidth onClick={()=>setCompareRange({})}> 삭제</Button>
                                </Grid>
                            )}}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            onFocus={(e) => e.target.select()}
                            value={_threshold}
                            label="임계값"
                            onChange={(e) => setThreshold(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            select
                            fullWidth
                            value={_compareType}
                            label="비교유형"
                            onChange={(e) => setCompareType(e.target.value)}
                        >
                            {COMPARE_TYPES.map((v) =>
                                (<MenuItem key={v.name} value={v.name}>{v.text}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>
                </Grid>

                <CreateCompareRangeDialog
                    opened = {createCompareRangeDialogOpen}
                    onClose = {() => setCreateCompareRangeDialogOpen(false)}
                    callback = {(v) => setCompareRange(v)}
                />
                <CreateTargetStatisticsDialog
                    opened = {createTargetStatisticsDialogOpen}
                    onClose = {() => setCreateTargetStatisticsDialogOpen(false)}
                    callback = {(v) => setTargetStatistics(v)}
                />
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>닫기</Button>
               <Button onClick={() => {callback(generateJson()); onClose(); }}>조건 생성</Button>
            </DialogActions>
        </Dialog>
    );
}