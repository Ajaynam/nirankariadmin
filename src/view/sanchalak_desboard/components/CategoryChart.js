
import React, { useState, useEffect } from 'react';
import { Card, Badge } from '../../../components/ui';
import { Chart } from '../../../components/shared';
import { COLORS } from '../../../constants/chart.constant';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

const CategoryChart = () => {
  const [chartData, setChartData] = useState({ data: [], labels: [], percentages: [] });

  useEffect(() => {
    axios.get('https://nirankari-backends.onrender.com/sevadal/sevadal-chart')
      .then((response) => {
        const data = response.data;
        console.log(data)
        if (!isEmpty(data)) {

          // Fetch unit data to get branch names
          axios.get('https://nirankari-backends.onrender.com/unit/get_unit')
            .then((unitResponse) => {
              const unitData = unitResponse.data;
              console.log(unitData)
              // Create a mapping of branch IDs to branch names
              const branchMapping = {};
              unitData.forEach(unit => {
                branchMapping[unit.id] = unit.unit_name;
              });

              // Map the branch IDs to their names and create labels
              const labels = data.map(item => {
                const branchId = item.sevadal_branchId;
                const branchName = branchMapping[branchId] || `Branch ${branchId}`;
                return `${branchName}`;
              });

              // Calculate percentages
              const totalData = data.reduce((total, item) => total + item.count, 0);
              const percentages = data.map(item => ((item.count / totalData) * 100));

              setChartData({ data: data.map(item => item.count), labels, percentages });
            })
            .catch((error) => {
              console.error('Error fetching unit data:', error);
            });
        } else {
          console.error('No data received from the API.');
        }
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  return (
    <Card>
      <h4>All sevadal <span className='text-sm'>( Ladies & Gents)</span></h4>
      <div className="mt-6">
        {!isEmpty(chartData) && (
          <>
            <Chart
              donutTitle={`${chartData.data.reduce((a, b) => a + b, 0)}`}
              donutText="Total Sevadal "
              series={chartData.data}
              customOptions={{ labels: chartData.labels  , percentages:chartData.percentages}}
              type="donut"
            />
            {chartData.data.length === chartData.labels.length && (
              <div className="mt-6 grid grid-cols-2 gap-5 max-w-[200px] mx-auto">
                {chartData.labels.map((value, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Badge
                      badgeStyle={{
                        backgroundColor: COLORS[index],
                      }}
                    />
                    <span className="font-semibold">{value} {`${chartData.percentages[index]}%`}</span>
                    {/* <span className="font-semibold">{`${chartData.percentages[index]}%`}</span> */}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default CategoryChart;
