/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { getAllAduan } from '../actions/aduan';
// components
import FilterDashboard from '../components/FilterDashboard';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  AduanListHead,
  AduanListToolbar,
  AduanMoreMenu
} from '../components/_dashboard/aduan/index';
import './AduanList.css';

const TABLE_HEAD = [
  { id: 'user_email', label: 'Pelapor', alignRight: false },
  { id: 'lembaga_id', label: 'Lembaga', alignRight: false },
  { id: 'role_id', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'body', label: 'Detail', alignRight: false },
  { id: '' }
];

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

const AduanList = () => {
  const [aduanItems, setAduanItems] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [source, setSource] = useState(null);

  const longDateOption = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const fetchAduanList = (currFilterName = null, currPage = -1, currRowsPerPage = 0) => {
    if (currPage === -1) {
      currPage = page;
    }
    if (currRowsPerPage === 0) {
      currRowsPerPage = rowsPerPage;
    }
    if (currFilterName === null) {
      currFilterName = filterName;
    }

    if (source) {
      source.cancel();
    }

    getAllAduan(currFilterName, currPage + 1, currRowsPerPage, (value) => {
      setSource(value);
    })
      .then((response) => {
        setAduanItems(response.data.aduan);
        setTotalRow(response.data.total);

        setSource(null);
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  useEffect(() => {
    // constructor
    fetchAduanList();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = aduanItems.map((n) => n.name);
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
    fetchAduanList(filterName, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowPerPage);
    setPage(0);
    fetchAduanList(filterName, 0, newRowPerPage);
  };

  const handleFilterByName = (event) => {
    const newFilterName = event.target.value;
    setFilterName(newFilterName);
    fetchAduanList(newFilterName, 0, rowsPerPage);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - aduanItems.length) : 0;

  // const filteredAduans = applySortFilter(aduanItems, getComparator(order, orderBy), filterName);

  // const isAduanNotFound = filteredAduans.length === 0;

  return (
    <div className="aduanlist-wrapper">
      <FilterDashboard />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Aduan
          </Typography>
        </Stack>

        <Card>
          <AduanListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AduanListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={aduanItems.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {aduanItems
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        user_email,
                        kategori,
                        aduan_kategori_id,
                        status,
                        role_nama,
                        isian,
                        jawaban,
                        waktu,
                        lembaga_nama
                      } = row;
                      const isItemSelected = selected.indexOf(user_email) !== -1;

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
                              onChange={(event) => handleClick(event, user_email)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <span
                                className={`aduan-category ${aduan_kategori_id === 1 ? 's' : 'k'}`}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {user_email}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{lembaga_nama}</TableCell>
                          <TableCell align="left">{role_nama}</TableCell>
                          <TableCell align="left">{status}</TableCell>
                          <TableCell align="left">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            &nbsp;
                            {new Date(waktu).toLocaleDateString('en-US', longDateOption)}
                            <br />
                            Q: {isian} <br />
                            A: {jawaban || <i>belum di respon</i>}
                          </TableCell>

                          <TableCell align="right">
                            <AduanMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
                {aduanItems.length === 0 && (
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
    </div>
  );
};

export default AduanList;
