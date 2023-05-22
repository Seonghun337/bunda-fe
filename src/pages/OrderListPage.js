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
import { getOrders } from 'api/historyApi';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'orderId', label: '주문번호' },
  { id: 'bybitOrderId', label: '바이비트주문번호' },
  { id: 'orderType', label: '유형' },
  { id: 'side', label: '롱/숏' },
  { id: 'status', label: '주문상태' },
  { id: 'bybitStatus', label: '바이비트주문상태' },
  { id: 'openPrice', label: '주문가격' },
  { id: 'qty', label: '수량' },
  { id: 'stopLoss', label: 'SL' },
  { id: 'takeProfit', label: 'TP' },
  { id: 'requestedDateTime', label: '요청일시' },
  { id: 'openedDateTime', label: '주문일시' },
  { id: 'filledDateTime', label: '체결일시' },
  { id: 'closedDateTime', label: '종결일시' },
  { id: 'closeType', label: '종결유형' },
  { id: 'reduceOnly', label: '시장가종결여부' },
];

// ----------------------------------------------------------------------
export default function OrderListPage() {
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
        const response = await getOrders(page, size);
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
        <title> 주문목록 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            주문 목록
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
                    const { id, bybitOrderId, orderType, side, status, bybitStatus, openPrice, qty, stopLoss,
                     takeProfit, requestedDateTime, openedDateTime, filledDateTime, closedDateTime, closeType, reduceOnly } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left"> {id} </TableCell>
                        <TableCell align="left"> {bybitOrderId} </TableCell>
                        <TableCell align="left"> {orderType} </TableCell>
                        <TableCell align="left"> {side} </TableCell>
                        <TableCell align="left"> {status} </TableCell>
                        <TableCell align="left"> {bybitStatus} </TableCell>
                        <TableCell align="left"> {openPrice} </TableCell>
                        <TableCell align="left"> {qty} </TableCell>
                        <TableCell align="left"> {stopLoss} </TableCell>
                        <TableCell align="left"> {takeProfit} </TableCell>
                        <TableCell align="left"> {requestedDateTime} </TableCell>
                        <TableCell align="left"> {openedDateTime} </TableCell>
                        <TableCell align="left"> {filledDateTime} </TableCell>
                        <TableCell align="left"> {closedDateTime} </TableCell>
                        <TableCell align="left"> {closeType} </TableCell>
                        <TableCell align="left"> {reduceOnly} </TableCell>
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
