'use client';
import { useEffect, useState } from 'react';
import { Box, Paper, Grid, ThemeProvider, createTheme, Button, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useRouter } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const BentoChartLayout = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);
  const [log, setLog] = useState(true);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function buttonHandle(){
    router.push('/login');
  }
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [growth, setGrowth] = useState(0);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('loggin');
    setLog(storedUser ? true : false);
  }, []);

  const handleProfileClick = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleLogout = async (e) => {
    try {
      await axios.get('/api/users/logout');
      localStorage.removeItem('loggin');
      setLog(false);
      setShowLogoutMenu(false);
      router.push("/login");
    } catch (error) {
      console.log("Logout Error: ", error.message);
      toast.error("Logout Error");
    }
  };


  useEffect(() => {
    // Random data generators
    const generateLineData = () => Array.from({ length: 10 }, (_, i) => ({
      x: i,
      y: Math.floor(Math.random() * 100),
    }));

    const generateBarData = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));

    const generatePieData = () => [
      { id: 0, value: Math.random() * 100, label: 'A' },
      { id: 1, value: Math.random() * 100, label: 'B' },
      { id: 2, value: Math.random() * 100, label: 'C' },
    ];

    const generateScatterData = () => Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));

    // Set data for charts
    setLineData(generateLineData());
    setBarData(generateBarData());
    setPieData(generatePieData());
    setScatterData(generateScatterData());

    // Generate random metrics
    setTotalUsers(Math.floor(Math.random() * 1000));
    setRevenue(Math.floor(Math.random() * 10000));
    setGrowth(Math.floor(Math.random() * 100));
  }, []);

  // Create a dark theme
  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0bec5',
      },
    },
  });

  return (<>
      <Toaster
  toastOptions={{
    success: {
      iconTheme: {
        primary: 'rgb(11, 218, 81)',
        secondary: 'black',
      },
      style: {
        background: 'rgb(11, 218, 81)',
      },
    },
    error: {
        iconTheme: {
            primary: '#ff0033',
            secondary: 'black',
          },
      style: {
        background: '#ff0033',
      },
    },
  }}
/>
    <nav className="flex justify-between items-center p-6 bg-black text-white">
          <a href={'/home'} className="text-xl font-bold">Women Safety</a>
            <ul className="flex space-x-6">
            <li><a href="/aiTry" className="hover:text-gray-400">Law</a></li>
              <li><a href="/policyMail" className="hover:text-gray-400">Policy</a></li>
              <li><a href="/voiceHelp" className="bg-red-500 p-2 border rounded-md hover:text-red-900">SOS</a></li>
            </ul>
            <div className="flex items-center">
              {log ? (
                <>
                  <span className="mr-4">Welcome</span>
                  <div style={{ cursor: "pointer" }} onClick={handleProfileClick} className='bg-gray-700 flex justify-center items-center rounded-full h-12 w-12'>
                    <AccountCircleOutlinedIcon className="scale-150" />
                  </div>
                  {showLogoutMenu && (
                    <div className="absolute bg-black border overflow-hidden border-gray-300 rounded-md mt-2">
                      <button onClick={handleLogout} className="px-3 py-2 text-white hover:bg-gray-800">
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* <button */}
                    {/* onClick={() => setIsSheetOpen(true)}
                    className="px-4 py-2 bg-white text-black rounded-md" */}
                  {/* > */}
                    <Button>Start</Button>
                    
                  {/* </button> */}
                </>
              )}
            </div>
          </nav>


    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, p: 2, background: theme.palette.background.default, minHeight: '100vh', position: 'relative' }}>
        {/* Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Large Teal Oval */}
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-teal-400 opacity-50 rounded-full filter blur-[120px]"></div>

          {/* Smaller Orange Circle */}
          <div className="absolute top-10 right-10 w-[150px] h-[150px] bg-orange-400 opacity-60 rounded-full filter blur-[60px]"></div>

          {/* Large Red Rectangle */}
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[200px] bg-red-500 opacity-40 rounded-lg filter blur-[100px]"></div>

          {/* Purple Triangle-like Shape */}
          <div className="absolute bottom-10 right-1/3 w-[250px] h-[250px] bg-purple-500 opacity-60 transform rotate-45 filter blur-[80px]"></div>

          {/* Small Blue Circle */}
          <div className="absolute bottom-20 left-1/3 w-[100px] h-[100px] bg-blue-400 opacity-80 rounded-full filter blur-[50px]"></div>
        </div>

        <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={1}>
          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                height: 250,
                background: theme.palette.background.paper,
                borderRadius: '16px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <LineChart
                xAxis={[{ data: lineData.map(d => d.x) }]}
                series={[{
                  data: lineData.map(d => d.y),
                  area: true,
                  color: '#2196f3',
                }]}
                height={200}
              />
            </Paper>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                height: 250,
                background: theme.palette.background.paper,
                borderRadius: '16px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <BarChart
                series={[{ data: barData, color: '#4caf50' }]}
                height={200}
              />
            </Paper>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                height: 250,
                background: theme.palette.background.paper,
                borderRadius: '16px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <PieChart
                series={[{
                  data: pieData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30 },
                }]}
                height={200}
              />
            </Paper>
          </Grid>

          {/* Scatter Chart */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                height: 250,
                background: theme.palette.background.paper,
                borderRadius: '16px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <ScatterChart
                series={[{
                  data: scatterData,
                  label: 'Scatter',
                  color: '#9c27b0',
                }]}
                height={200}
              />
            </Paper>
          </Grid>

          {/* Additional Small Metrics */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                height: 120,
                background: theme.palette.background.paper,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>
                {totalUsers}
              </Box>
              <Box sx={{ color: 'text.secondary' }}>Total Users</Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                height: 120,
                background: theme.palette.background.paper,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4caf50' }}>
                ${revenue}
              </Box>
              <Box sx={{ color: 'text.secondary' }}>Revenue</Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                height: 120,
                background: theme.palette.background.paper,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f44336' }}>
                {growth}%
              </Box>
              <Box sx={{ color: 'text.secondary' }}>Growth</Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Learn More Button */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" color="primary">
            Learn more with our chatbot
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
};

export default BentoChartLayout;
