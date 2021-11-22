import { useEffect, useState } from 'react';
// material
import { Typography, AccordionDetails, AccordionSummary, Accordion } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
// components
import FilterDashboard from '../components/FilterDashboard';
import {
  AS_ASSIGNED,
  AS_BARU,
  AS_DIPROSES,
  AS_DITERIMA,
  AS_ESKALASI,
  AS_SELESAI
} from '../data/aduan-status.data';
//
import './Dashboard.css';

const Dashboard = () => {
  const [totalAduanByStatuses, setTotalAduanByStatuses] = useState([]);

  useEffect(() => {
    let totalTemp = [
      [
        {
          image: 'https://img.lovepik.com/element/45004/4393.png_300.png',
          total: 1200,
          title: AS_BARU.label,
          color: '#ff4400'
        },
        {
          image: 'https://img.lovepik.com/element/45004/4393.png_300.png',
          total: 1010,
          title: AS_ASSIGNED.label,
          color: '#ff8800'
        }
      ],
      [
        {
          image: 'https://img.lovepik.com/element/45004/4393.png_300.png',
          total: 780,
          title: AS_DITERIMA.label,
          color: '#ffaa00'
        },
        {
          image: 'https://img.lovepik.com/element/45004/4393.png_300.png',
          total: 100,
          title: AS_DIPROSES.label,
          color: '#bbbb00'
        }
      ],
      [
        {
          image: 'https://img.lovepik.com/element/45004/4393.png_300.png',
          total: 300,
          title: AS_SELESAI.label,
          color: '#88dd00'
        },
        {
          image: 'https://img.lovepik.com/element/45004/4393.png_300.png',
          total: 5,
          title: AS_ESKALASI.label,
          color: '#44dd00'
        }
      ]
    ];

    let total = 0;
    totalTemp.forEach((item) => {
      total += item[0].total;
      total += item[1].total;
    });

    totalTemp = [
      [
        {
          image: 'https://img.lovepik.com/element/45004/4393.png_300.png',
          total,
          title: 'Seluruh Aduan',
          color: '#666'
        }
      ],
      ...totalTemp
    ];

    setTotalAduanByStatuses(totalTemp);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <FilterDashboard />
      <div className="total-card-wrapper">
        {/* Total Aduan */}
        <div className="total-card">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </div>
          <div className="total">1000</div>
          <div className="title">Total Aduan</div>
        </div>
        {/* Total Saran */}
        <div className="total-card">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </div>
          <div className="total">1000</div>
          <div className="title">Total Saran</div>
        </div>
        {/* Total Kritik */}
        <div className="total-card">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </div>
          <div className="total">1000</div>
          <div className="title">Total Kritik</div>
        </div>
        {/* Total Lembaga */}
        <div className="total-card">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </div>
          <div className="total">1000</div>
          <div className="title">Total Lembaga</div>
        </div>
      </div>
      {/* <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
        </Grid>
      </Container> */}
      <br /> <br />
      <div className="aduan-perlembaga-wrapper">
        <Accordion>
          <AccordionSummary
            expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Aduan Per-Lembaga</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="lembaga-list-buttons">
              <button className="">Semua Lembaga</button>
              <button className="">Lembaga 1</button>
              <button className="">Lembaga 2</button>
              <button className="">Lembaga 3</button>
              <button className="">Lembaga 4</button>
            </div>
            <Typography>
              {totalAduanByStatuses &&
                totalAduanByStatuses.map((item, index) => (
                  <div key={index} className="card-row">
                    {item.map((item2, index2) => (
                      <div
                        key={index2}
                        className="card-wrapper"
                        style={{
                          backgroundColor: item2.color
                        }}
                      >
                        <div className="icon">
                          <div
                            className="image"
                            style={{
                              backgroundImage: `url(${item2.image})`
                            }}
                          />
                        </div>
                        <div className="text">
                          <div className="title">{item2.title}</div>
                          <div className="total">{item2.total}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Dashboard;
