import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Grid,
  Typography,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableHead,
  Paper,
  AccordionDetails,
  AccordionSummary,
  Accordion
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales
} from '../components/_dashboard/app';
//
import USERLIST from '../_mocks_/user';
import './Dashboard.css';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// -------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currBulan, setCurrBulan] = useState(1);
  const [currTahun, setCurrTahun] = useState(2021);

  const onBulanChange = (event) => {
    setCurrBulan(event.target.value);
  };

  const onTahunChange = (event) => {
    setCurrTahun(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <div className="dashboard-wrapper">
      <Box sx={{ minWidth: 120 }}>
        <div className="filter-wrapper">
          {/* FILTER */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bulan</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currBulan}
              label="Age"
              onChange={onBulanChange}
            >
              <MenuItem value={1}>Januari</MenuItem>
              <MenuItem value={2}>Febuari</MenuItem>
              <MenuItem value={3}>Maret</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>Mei</MenuItem>
              <MenuItem value={6}>Juni</MenuItem>
              <MenuItem value={7}>Juli</MenuItem>
              <MenuItem value={8}>Agustus</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>Oktober</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>Desember</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tahun</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currTahun}
              label="Age"
              onChange={onTahunChange}
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined">Filter</Button>
          {/* END OF FILTER */}
        </div>
      </Box>
      <br /> <br />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* Total Aduan */}
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Total Saran */}
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Total Kritik */}
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Total Pengelola */}
            <AppBugReports />
          </Grid>
        </Grid>
      </Container>
      <br /> <br />
      <div className="aduan-perlembaga-wrapper">
        <Accordion>
          <AccordionSummary
            expandIcon={<span>V</span>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Aduan Per-Lembaga</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="card-row">
                <div
                  className="card-wrapper"
                  style={{
                    backgroundColor: '#ff0000'
                  }}
                >
                  <div className="icon">
                    <div
                      className="image"
                      style={{
                        backgroundImage:
                          'url(https://img.lovepik.com/element/45004/4393.png_300.png)'
                      }}
                    />
                  </div>
                  <div className="text">
                    <div className="title">Seluruh Aduan</div>
                    <div className="total">1000</div>
                  </div>
                </div>
              </div>
              <div className="card-row">
                <div
                  className="card-wrapper"
                  style={{
                    backgroundColor: '#ff4400'
                  }}
                >
                  <div className="icon">
                    <div
                      className="image"
                      style={{
                        backgroundImage:
                          'url(https://img.lovepik.com/element/45004/4393.png_300.png)'
                      }}
                    />
                  </div>
                  <div className="text">
                    <div className="title">Aduan Baru</div>
                    <div className="total">1000</div>
                  </div>
                </div>
                <div
                  className="card-wrapper"
                  style={{
                    backgroundColor: '#ffaa00'
                  }}
                >
                  <div className="icon">
                    <div
                      className="image"
                      style={{
                        backgroundImage:
                          'url(https://img.lovepik.com/element/45004/4393.png_300.png)'
                      }}
                    />
                  </div>
                  <div className="text">
                    <div className="title">Assigned</div>
                    <div className="total">1000</div>
                  </div>
                </div>
              </div>
              <div className="card-row">
                <div
                  className="card-wrapper"
                  style={{
                    backgroundColor: '#aaff00'
                  }}
                >
                  <div className="icon">
                    <div
                      className="image"
                      style={{
                        backgroundImage:
                          'url(https://img.lovepik.com/element/45004/4393.png_300.png)'
                      }}
                    />
                  </div>
                  <div className="text">
                    <div className="title">Diterima</div>
                    <div className="total">1000</div>
                  </div>
                </div>
                <div
                  className="card-wrapper"
                  style={{
                    backgroundColor: '#00ff44'
                  }}
                >
                  <div className="icon">
                    <div
                      className="image"
                      style={{
                        backgroundImage:
                          'url(https://img.lovepik.com/element/45004/4393.png_300.png)'
                      }}
                    />
                  </div>
                  <div className="text">
                    <div className="title">Diproses</div>
                    <div className="total">1000</div>
                  </div>
                </div>
              </div>
              <div className="card-row">
                <div
                  className="card-wrapper"
                  style={{
                    backgroundColor: '#00aaaa'
                  }}
                >
                  <div className="icon">
                    <div
                      className="image"
                      style={{
                        backgroundImage:
                          'url(https://img.lovepik.com/element/45004/4393.png_300.png)'
                      }}
                    />
                  </div>
                  <div className="text">
                    <div className="title">Selesai</div>
                    <div className="total">1000</div>
                  </div>
                </div>
                <div
                  className="card-wrapper"
                  style={{
                    backgroundColor: '#0044aa'
                  }}
                >
                  <div className="icon">
                    <div
                      className="image"
                      style={{
                        backgroundImage:
                          'url(https://img.lovepik.com/element/45004/4393.png_300.png)'
                      }}
                    />
                  </div>
                  <div className="text">
                    <div className="title">Eskalasi</div>
                    <div className="total">1000</div>
                  </div>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <br /> <br />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
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
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

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
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
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
                {isUserNotFound && (
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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
