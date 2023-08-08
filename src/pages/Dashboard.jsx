import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TransactionServices from '../services/transactionSevices';
import TransactionsFilter from '../components/TransactionsFilter';
import CustomBarChart from '../components/CustomBarChart';
import AreaBarGraph from '../components/AreaBarGraph';
import PieGraph from '../components/PieGraph';
import Chart from '../components/Chart';
import AddTransaction from '../components/AddTransaction';
import LineChartComponent from '../components/LineChart';

function Dashboard() {
  const userId = useSelector((state) => state.user.user.Id);
  const [barChartData, setBarChartData] = useState([]);
  const categories = useSelector((state) => state.category.categories);
  const defaultTheme = createTheme();
  const handleFilterChange = async (filterDetails) => {
    console.log(filterDetails);
    const startDate = new Date(filterDetails.startDate);
    const endDate = new Date(filterDetails.endDate);
    const selectedCategories = [...filterDetails.selectedCategories];
    const requestData = {
      userId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      selectedCategories,
    };
    try {
      const res = await TransactionServices.filterTransactionsDashboard(
        requestData,
      );
      console.log(res);
      setBarChartData(res);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const lastYearDate = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    lastYearDate.setHours(0, 0, 0, 0);
    const defFilterData = {
      userId,
      startDate: lastYearDate.toISOString(),
      endDate: new Date().toISOString(),
      selectedCategories: [...categories],
    };

    handleFilterChange(defFilterData);
    console.log("hello",barChartData);
  }, []);

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Accordion
            sx={{
              top: '0px',
              position: 'sticky',
              backgroundColor: '#4291d8',
              margin: '10px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Add Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TransactionsFilter onFilterChange={handleFilterChange} />
            </AccordionDetails>
          </Accordion>
        </div>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f5f5f5',
                    height: 400,
                    padding: '30px',
                  }}
                >
                  <AddTransaction />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f5f5f5',
                    height: '300px',
                  }}
                >
                  <PieGraph />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f5f5f5',
                    height: '300px',
                  }}
                >
                  <AreaBarGraph />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f5f5f5',
                    height: '500px',
                  }}
                >
                  <CustomBarChart data={barChartData} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f5f5f5',
                    height: '500px',
                  }}
                >
                    <LineChartComponent data={barChartData}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Dashboard;
