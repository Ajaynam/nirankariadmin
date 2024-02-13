import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/shared'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import CategoryChart from './CategoryChart'
// import dummyData from './SalesByCategories'
import TopProduct from './TopProduct'
import { getChartData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import LatestLedger from './LatestLedger'
import axios from 'axios'
// import CheckinAndOut from './CheckinAndOut'

const DashboardBody = () => {

    const [piechartData, setpieChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Make an API request to fetch the chart data
    axios.get('https://nirankari-backends.onrender.com/chet_sanch/sanchalak-chart') // Replace with your API endpoint
      .then((response) => {
        // Process the data from the response
        const chartData = {
          labels: response.data.map((item) => `Branch ${item.sanchalak_branchId}`),
          datasets: [
            {
              label: 'Number of Sanchalak',
              data: response.data.map((item) => item.count),
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set your desired background color
              borderColor: 'rgba(75, 192, 192, 1)', // Set your desired border color
              borderWidth: 1,
            },
          ],
        };
        // console.log(chartData)

        setpieChartData(chartData);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

    

    const dummyData = {
        data: [40, 50, 20], // An array representing sales data for different categories
        labels: ['Sangali', 'Tasgaon', 'Jath'], // Labels for the categories
    };

    const dispatch = useDispatch();

    const {
        statisticData,
        salesReportData,
        topProductsData,
        ledgerData,
        salesByCategoriesData,
    } = useSelector((state) => state.salesDashboard.dashboardData) || {};

    // const loading = useSelector((state) => state.salesDashboard.loading);
    const chartData = useSelector((state) => state.salesDashboard.chartData); // Get the chart data from the store
    // console.log('chartData:', chartData);
    const loading = useSelector((state) => state.salesDashboard.loading);
    useEffect(() => {
        fetchData();
    }, []);

   

    const fetchData = () => {
        // console.log('Dispatching getChartData action'  ); 
        dispatch(getChartData())
    }

    return (
        <Loading loading={loading}>
            <Statistic data={statisticData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* <CheckinAndOut /> */}
                {/* <SalesReport data={salesReportData} className="col-span-2" /> */}
                <CategoryChart  />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* <LatestLedger data={ledgerData} className="lg:col-span-2" /> */}
                {/* <TopProduct data={topProductsData} /> */}
            </div>
        </Loading>
    )
}

export default DashboardBody
