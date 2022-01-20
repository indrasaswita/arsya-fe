import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import { getAllLembaga } from '../actions/user';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'lembaga', label: 'Nama Lembaga', alignRight: false },
  { id: 'role', label: 'Nama Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'verifikasi', label: 'Verifikasi', alignRight: false },
  { id: '' }
];

const Lembaga = () => {
  const [totalRow, setTotalRow] = useState(0);
  const [userItems, setUserItems] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchLembaga = () => {
    getAllLembaga(filterName, page + 1, rowsPerPage, orderBy, order)
      .then((result) => {
        setUserItems(result.data.users);
        setTotalRow(result.data.total);
      })
      .catch((_) => {
        setUserItems([]);
        setTotalRow(0);
      });
  };

  useEffect(() => {
    fetchLembaga();
  }, [filterName, page, rowsPerPage, orderBy, order]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userItems.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Lembaga
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Tambah Lembaga
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userItems.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {userItems.map((row) => {
                    const {
                      id,
                      email,
                      status,
                      verifikasi,
                      lembaga_id: lembagaId,
                      lembaga,
                      role_id: roleId,
                      role
                    } = row;
                    const isItemSelected = selected.indexOf(email) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, email)}
                          />
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">
                          <a href={`/lembaga/${lembagaId}`}>{lembaga}</a>
                        </TableCell>
                        <TableCell align="left">
                          <a href={`/roles/${roleId}`}>{role}</a>
                        </TableCell>
                        <TableCell align="left">{status}</TableCell>
                        <TableCell align="left">{verifikasi ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {userItems.length === 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRow}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default Lembaga;
