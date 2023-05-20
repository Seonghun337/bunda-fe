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
import { getVariables, updateVariable, createVariable, deleteVariable } from 'api/variableApi';
import { VariableDialog } from 'components/dialog'

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'key', label: 'KEY' },
  { id: 'value', label: 'VALUE' },
  { id: 'update', label: ' ' },
];

// ----------------------------------------------------------------------
export default function VariableSettingPage() {
  const size = 10;
  const [page, setPage] = useState(0);
  const [content, setContent] = useState([]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState();
  const [selectedValue, setSelectedValue] = useState();

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
          const response = await getVariables(page, size);
          setContent(response.data.content); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          setError(e);
        }
        console.log(content);
        setLoading(false);
      };

      fetchUsers();
    }, []);


  const handleChangePage = (event, newPage) => {
  };

  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * size - content.length) : 0;

  return (
    <>
      <Helmet>
        <title> 변수설정 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            변수 목록
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setCreateDialogOpen(true)}>
            새 변수
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
                            align='left'
                        >
                            {cell.label}
                        </TableCell>
                    ))}
                </TableHead>
                <TableBody>
                  {content.map((row) => {
                    const { key, value } = row;

                    return (
                      <TableRow hover key={key} tabIndex={-1}>
                        <TableCell align="left"> {key} </TableCell>
                        <TableCell align="left"> {value} </TableCell>
                        <TableCell width="200" align="left">
                            <Button onClick={() => {  setSelectedValue(value); setSelectedKey(key); setUpdateDialogOpen(true);}}>
                                수정
                            </Button>
                            <Button onClick={() => { deleteVariable(key); }}>삭제</Button>
                        </TableCell>
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
            count={content.length}
            rowsPerPage={size}
            page={page}
            onPageChange={handleChangePage}
          />
        </Card>

        <VariableDialog
          opened = {createDialogOpen}
          onClose = {() => setCreateDialogOpen(false)}
          callback = {(v) => { createVariable(v); }}
          isNew
          paramKey = ""
          paramValue = ""
        />
        <VariableDialog
          opened = {updateDialogOpen}
          onClose = {() => setUpdateDialogOpen(false)}
          callback = {(v) => { updateVariable(v); }}
          isNew={false}
          paramKey = {selectedKey}
          paramValue = {selectedValue}
        />
      </Container>

    </>
  );
}
