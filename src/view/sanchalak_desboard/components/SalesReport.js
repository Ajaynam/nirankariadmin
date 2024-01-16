import React from 'react';
import { Card } from '../../../components/ui';
import { Chart } from '../../../components/shared';

const SalesReport = ({ className, data }) => {
  // Define dummy data
  const dummyData = {
    series: [
      {
        name: 'Visitors',
        data: [10, 25, 30, 15, 20, 35, 40,45,55,85,28,85],
      },
    ],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',"Aug","Sep","Oct", "Nov","Dec"],
  };

  // Use dummy data for testing
  if (!data) {
    data = dummyData;
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h4>sanchalak Report</h4>
      </div>
      <Chart
        series={data.series}
        xAxis={data.categories}
        height="380px"
        customOptions={{ legend: { show: false } }}
      />
    </Card>
  );
};

export default SalesReport;
