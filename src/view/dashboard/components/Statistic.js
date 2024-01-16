import React from 'react';
import { Card } from '../../../components/ui';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { NumericFormat } from 'react-number-format';

const StatisticCard = ({ data = {}, label, valuePrefix, startDate, endDate }) => {
  return (
    <Card>
      <h6 className="font-semibold mb-4 text-sm">{label}</h6>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">
            <NumericFormat
              displayType="text"
              value={data?.value || 0}
              thousandSeparator
              prefix={valuePrefix}
            />
          </h3>
          <p>
            {startDate !== null && dayjs(startDate).format('DD MMM')} prior to{' '}
            <span className="font-semibold">
              {endDate !== null && dayjs(endDate).format('DD MMM')}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

const Statistic = ({ data }) => {
  const startDate = useSelector(
    (state) => state.salesDashboard.state.startDate
  );
  const endDate = useSelector(
    (state) => state.salesDashboard.state.endDate
  );

  // Define dummy data
  const dummyData = {
    revenue: {
      value: 2500,
    },
    orders: {
      value: 50,
    },
    pendingAmount: {
      value: 30,
    },
    village: {
      value: 25,
    },
  };

  // Use dummy data for testing
  if (!data) {
    data = dummyData;
  }

  return (
    <div className="lg:flex gap-4">
      <div className="w-full bg-slate-400 lg:w-1/4">
        <StatisticCard
          data={data?.revenue}
          label="Total Event"
        //   valuePrefix="₹"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="w-full lg:w-1/4">
        <StatisticCard
          data={data?.orders}
          label="Total Sanchalak"
          valuePrefix=""
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="w-full lg:w-1/4">
        <StatisticCard
          data={data?.pendingAmount}
          label="Total Sahayojak"
        //   valuePrefix="₹"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="w-full lg:w-1/4">
        <StatisticCard
          data={data?.village}
          label="Total sikshak"
          valuePrefix=""
        />
      </div>
    </div>
  );
};

export default Statistic;
