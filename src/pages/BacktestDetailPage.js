import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableHead,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Grid,
  TextField,
  CardHeader,
  CardContent,
} from '@mui/material';
// components
import Label from 'components/label';
import Iconify from 'components/iconify';
import Scrollbar from 'components/scrollbar';
import DatePicker from 'react-datepicker';
// sections
import { getCandles } from 'api/backtestApi';
import { CreateBacktestDialog } from 'components/dialog';
import Chart from "react-apexcharts";
import useCodes from 'hooks/useCodes';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
export default function BacktestDetailPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [TERM_UNITS] = useCodes('TERM_UNITS');
  const PERIOD_SHORTCUT = [
    {name: "RECENT_HOUR", text: "최근 1시간"},
    {name: "YESTERDAY", text: "어제"},
  ]
  const [_termUnit, setTermUnit] = useState("MINUTE");
  const [_startDateTime, setStartDateTime] = useState(new Date("2023-03-02 00:00:00"));
  const [_endDateTime, setEndDateTime] = useState(new Date("2023-03-02 23:59:59"));

  const [data, setData] = useState([]);

  const handlePeriodShortcut = (e) => {
     const value = e.target.value;
     if (value === "YESTERDAY") {
       console.log("yesterday");
     }
  }

  const options = {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        }
  const series = [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ];

  const convertDateToStr = (date) => {
    return `${date.getYear()}-${date.getMonth()}-${date.getDay()}T${date.getHour()}:${date.getMinute()}:${date.getSecond()}`
  }

//  function search() {
//
//  }

  useEffect(() => {
    const fetch = async () => {
              try {
                setError(null);
                setData([]);
                setLoading(true);
                const response = await getCandles(_termUnit, convertDateToStr(_startDateTime), convertDateToStr(_endDateTime));
                setData(response.data);
              } catch (e) {
                setError(e);
              }
              setLoading(false);
            };

            fetch();
  }, []);

  return (
    <>
      <Helmet>
        <title> 백테스팅 </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {id}
        </Typography>
              <Grid container spacing={3} sx={{mb:5}}>
                <Grid item lg={3}>
                  <TextField
                    select
                    fullWidth
                    value={_termUnit}
                    label="단위시간"
                    onChange={(e)=>{setTermUnit(e.target.value)}}
                  >
                    {TERM_UNITS.map((v)=>(<MenuItem id={v.name} value={v.name}>{v.text}</MenuItem>))}
                  </TextField>
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    select
                    fullWidth
                    value={_termUnit}
                    label="간편선택"
                    onChange={(e)=>{setTermUnit(e.target.value)}}
                  >
                    {PERIOD_SHORTCUT.map((v)=>(<MenuItem key={v.name} value={v.name}>{v.text}</MenuItem>))}
                  </TextField>
                </Grid>
                <Grid item lg={3}>
                  <DatePicker
                    selected={_startDateTime}
                    fullWidth
                    onChange={(date)=>setStartDateTime(date)}
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    customInput={<TextField fullWidth label="시작일자"/>}
                  />
                </Grid>
                <Grid item lg={3}>
                  <DatePicker
                    selected={_endDateTime}
                    fullWidth
                    onChange={(date)=>setEndDateTime(date)}
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    customInput={<TextField fullWidth label="종료일자"/>}
                  />
                </Grid>
                <Grid item lg={9}/>
                <Grid item lg={3}>
                  <Button fullWidth variant="contained" >
                    검색
                  </Button>
                </Grid>
              </Grid>

        <Chart
            options={options}
            series={series}
            type="line"
            height={350}
        />
      </Container>

    </>
  );
}
