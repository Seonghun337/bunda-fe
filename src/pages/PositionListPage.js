import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Link,
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
  CardHeader,
} from '@mui/material';
// components
import Label from 'components/label';
import Iconify from 'components/iconify';
import Scrollbar from 'components/scrollbar';
// sections
import { getPositions } from 'api/historyApi';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'createdDateTime', label: 'createdDateTime' },
  { id: 'availableBalance', label: 'availableBalance' },
  { id: 'longPositionSize', label: 'longPositionSize' },
  { id: 'shortPositionSize', label: 'shortPositionSize' },
  { id: 'longEntryPrice', label: 'longEntryPrice' },
  { id: 'shortEntryPrice', label: 'shortEntryPrice' },
  { id: 'nowPrice', label: 'nowPrice' },
  { id: 'longPositionMargin', label: 'longPositionMargin' },
  { id: 'shortPositionMargin', label: 'shortPositionMargin' },
  { id: 'longUnrealizedPnl', label: 'longUnrealizedPnl' },
  { id: 'shortUnrealizedPnl', label: 'shortUnrealizedPnl' },
  { id: 'longActiveOrderCount', label: 'longActiveOrderCount' },
  { id: 'shortActiveOrderCount', label: 'shortActiveOrderCount' },
  { id: 'longLiquidPrice', label: 'longLiquidPrice' },
  { id: 'shortLiquidPrice', label: 'shortLiquidPrice' },
];

// ----------------------------------------------------------------------
export default function PositionListPage() {
  const size = 10;
  const [page, setPage] = useState(0);
  const [content, setContent] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setContent([]);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await getPositions(page, size);
        setContent(response.data.content);
        setTotalCount(response.data.total);
        console.log(response.data.total);
      } catch (e) {
        setError(e);
      }
      console.log(content);
      setLoading(false);
  }

  useEffect(() => {
      fetchData();
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = size - content.length;

  return (
    <>
      <Helmet>
        <title> 포지션목록 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            포지션 목록
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 2000 }}>
              <Table>
                <TableHead sx={{ overflow: 'auto' }}>
                    {TABLE_HEAD.map((cell) => (
                        <TableCell
                            key={cell.id}
                            align='left'
                        >
                            {cell.label}
                        </TableCell>
                    ))}
                </TableHead>
                <TableBody>
                  {content.map((row) => {
                    const { createdDateTime, availableBalance, longPositionSize, shortPositionSize, longEntryPrice, shortEntryPrice, nowPrice, longPositionMargin, shortPositionMargin,
                     longUnrealizedPnl, shortUnrealizedPnl, longActiveOrderCount, shortActiveOrderCount, longLiquidPrice, shortLiquidPrice } = row;

                    return (
                      <TableRow hover key={createdDateTime} tabIndex={-1}>
                        <TableCell align="left"> {createdDateTime} </TableCell>
                        <TableCell align="left"> {availableBalance} </TableCell>
                        <TableCell align="left"> {longPositionSize} </TableCell>
                        <TableCell align="left"> {shortPositionSize} </TableCell>
                        <TableCell align="left"> {longEntryPrice} </TableCell>
                        <TableCell align="left"> {shortEntryPrice} </TableCell>
                        <TableCell align="left"> {nowPrice} </TableCell>
                        <TableCell align="left"> {longPositionMargin} </TableCell>
                        <TableCell align="left"> {shortPositionMargin} </TableCell>
                        <TableCell align="left"> {longUnrealizedPnl} </TableCell>
                        <TableCell align="left"> {shortUnrealizedPnl} </TableCell>
                        <TableCell align="left"> {longActiveOrderCount} </TableCell>
                        <TableCell align="left"> {shortActiveOrderCount} </TableCell>
                        <TableCell align="left"> {longLiquidPrice} </TableCell>
                        <TableCell align="left"> {shortLiquidPrice} </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={totalCount}
            rowsPerPage={size}
            page={page}
            onPageChange={handleChangePage}
          />
        </Card>
      </Container>

    </>
  );
}
