import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
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
} from '@mui/material';
// components
import Label from 'components/label';
import Iconify from 'components/iconify';
import Scrollbar from 'components/scrollbar';
// sections
import { getBacktests } from 'api/backtestApi';
import { CreateBacktestDialog } from 'components/dialog';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: '이름', alignRight: false },
  { id: 'status', label: '상태', alignRight: false },
  { id: 'requestDateTime', label: '요청일시', alignRight: false },
  { id: 'startDateTime', label: '시작일시', alignRight: false },
  { id: 'endDateTime', label: '종료일시', alignRight: false },
  { id: 'initialBalance', label: '시작잔고', alignRight: false },
  { id: 'finalBalance', label: '최종잔고', alignRight: false },
  { id: 'Pnl', label: 'Pnl', alignRight: false },
];

// ----------------------------------------------------------------------
export default function BacktestListPage() {
  const [open, setOpen] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const size = 10;
  const [page, setPage] = useState(0);
  const [content, setContent] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
      const fetchUsers = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 users 를 초기화하고
          setError(null);
          setContent([]);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const response = await getBacktests(page, size);
          setContent(response.data.content); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          setError(e);
        }
        console.log(content);
        setLoading(false);
      };

      fetchUsers();
    }, []);


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClick = (event, name) => {

  };

  const handleCreateDialogOpen = (event) => {
    console.log("open");
    setCreateDialogOpen(true);
  }

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  }

  const handleChangePage = (event, newPage) => {
  };

  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * size - content.length) : 0;

  const isNotFound = !content.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> 백테스팅 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            백테스팅 목록
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleCreateDialogOpen}>
            New Test
          </Button>
        </Stack>

        <Card>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                    {TABLE_HEAD.map((cell) => (
                        <TableCell
                            key={cell.id}
                            align={cell.alignRight ? 'right' : 'left'}
                        >
                            {cell.label}
                        </TableCell>
                    ))}
                </TableHead>
                <TableBody>
                  {content.map((row) => {
                    const { id, name, status, requestDateTime, startDateTime, endDateTime, initialBalance, finalBalance, pnl } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left"> {id} </TableCell>
                        <TableCell align="left"> {name} </TableCell>
                        <TableCell align="left"> {status} </TableCell>
                        <TableCell align="left"> {requestDateTime} </TableCell>
                        <TableCell align="left"> {startDateTime} </TableCell>
                        <TableCell align="left"> {endDateTime} </TableCell>
                        <TableCell align="left"> {initialBalance} </TableCell>
                        <TableCell align="left"> {finalBalance} </TableCell>
                        <TableCell align="left"> {pnl} </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={content.length}
            rowsPerPage={size}
            page={page}
            onPageChange={handleChangePage}
          />
        </Card>
      </Container>

      <CreateBacktestDialog
        opened = {createDialogOpen}
        onClose = {handleCreateDialogClose}
      />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
