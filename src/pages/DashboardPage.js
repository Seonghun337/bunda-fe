import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import useInterval from 'hooks/useInterval';
// components
import { getSummary } from 'api/dashboardApi';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppWidgetDollar,
  AppWidgetPercent
} from '../sections/@dashboard/app';
// utils
import { fPercent, fCurrency } from '../utils/formatNumber';
import Iconify from '../components/iconify';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(10000);
  const [summary, setSummary] = useState({})
  const defaultSummary = {
    totalBalance: 0,
    accumulatedRoe: 0,
    maximumRoe: 0,
    dailyRoe: 0,
    yesterdayRoe: 0,
    dailyMeanRoe: 0
  }
  useEffect(()=>{
    fetchSummary();
  }, []);

  useInterval(
      () => {
        // Your custom logic here
        fetchSummary();
      },
      // Delay in milliseconds or null to stop it
      autoRefresh === 0 ? autoRefresh : null,
    )

  const fetchSummary = async () => {
    try {
      setError(null);
      setSummary({});
      setLoading(true);
      const response = await getSummary();
      setSummary(response.data);
    } catch (e) {
      setError(e);
    }
    console.log(JSON.stringify(summary));
    setLoading(false);
  }


  return (
    <>
      <Helmet>
        <title> 대시보드 </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          대시보드
        </Typography>
        {error && (<Typography variant="h5" color="error">
                    서버와 연결에 실패했습니다.
                  </Typography>
                )}


        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetDollar title="Total Balance" total={summary.totalBalance} color="primary" icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetPercent title="Accumulated ROE" total={summary.accumulatedRoe} color="secondary" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetPercent title="Maximum ROE" total={summary.maximumRoe} color="info" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetPercent title="Daily ROE" total={summary.dailyRoe} color="warning" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetPercent title="Yesterday ROE" total={summary.yesterdayRoe} color="success" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
                <AppWidgetPercent title="Daily Mean ROE" total={summary.dailyMeanRoe} color="primary" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppTrafficBySite
              title=""
              list={[
                {
                  name: 'available',
                  value: fCurrency(12423),
                },
                {
                  name: 'p. margin',
                  value: 44323,
                },
                {
                  name: 'contract',
                  value: '1.2 BTC',
                },
                {
                  name: 'qty',
                  value: 1.2342,
                },
                {
                  name: 'value',
                  value: fCurrency(24212),
                },
                {
                  name: 'entry price',
                  value: fCurrency(44323),
                },
                {
                  name: 'unreal. pnl',
                  value: fPercent(15.6),
                },
                {
                  name: 'liq. price',
                  value: fCurrency(12311),
                },

              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="최근 가격 추이"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: '가격',
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: '자산',
                  type: 'line',
                  fill: 'solid',
                  data: [12, 15, 26, 17, 47, 57, 33, 23, 40, 46, 49],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate
              title="최근 주문내역"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
