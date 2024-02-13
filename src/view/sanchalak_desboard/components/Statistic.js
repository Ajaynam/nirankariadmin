// import React from 'react';
// import { Card } from '../../../components/ui';
// import { useSelector } from 'react-redux';
// import dayjs from 'dayjs';
// import { NumericFormat } from 'react-number-format';

// const StatisticCard = ({ data = {}, label, valuePrefix, startDate, endDate }) => {
//   return (
//     <Card>
//       <h6 className="font-semibold mb-4 text-sm">{label}</h6>
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">
//             <NumericFormat
//               displayType="text"
//               value={data?.value || 0}
//               thousandSeparator
//               prefix={valuePrefix}
//             />
//           </h3>
//           <p>
//             {/* {startDate !== null && dayjs(startDate).format('DD MMM')} prior to{' '} */}
//             {/* <span className="font-semibold">
//               {endDate !== null && dayjs(endDate).format('DD MMM')}
//             </span> */}
//           </p>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const Statistic = ({ data }) => {
//   const startDate = useSelector(
//     (state) => state.salesDashboard.state.startDate
//   );
//   const endDate = useSelector(
//     (state) => state.salesDashboard.state.endDate
//   );

//   // Define dummy data
//   const dummyData = {
//     revenue: {
//       value: 2500,
//     },
//     orders: {
//       value: 50,
//     },
//     pendingAmount: {
//       value: 30,
//     },
//     village: {
//       value: 25,
//     },
//   };

//   //  dummy data for testing
//   if (!data) {
//     data = dummyData;
//   }

//   return (
//     <div className="lg:flex gap-4">
//       <div className="w-full bg-slate-400 lg:w-1/4">
//         <StatisticCard
//           data={data?.revenue}
//           label="Total Event"
//         //   valuePrefix="₹"
//           // startDate={startDate}
//           // endDate={endDate}
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={data?.orders}
//           label="Total Sanchalak"
//           // valuePrefix=""
//           // startDate={startDate}
//           // endDate={endDate}
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={data?.pendingAmount}
//           label="Total Sahayojak"
//         //   valuePrefix="₹"
//           // startDate={startDate}
//           // endDate={endDate}
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={data?.village}
//           label="Total incharge"
//           // valuePrefix=""
//         />
//       </div>
//     </div>
//   );
// };

// export default Statistic;


// import React, { useState, useEffect } from 'react';
// import { Card } from '../../../components/ui';
// import { useSelector } from 'react-redux';
// import dayjs from 'dayjs';
// import { NumericFormat } from 'react-number-format';
// import axios from 'axios';

// const StatisticCard = ({ data = {}, label, valuePrefix, }) => {
//   return (
//     <Card>
//       <h6 className="font-semibold mb-4 text-sm">{label}</h6>
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">
//             <NumericFormat
//               displayType="text"
//               value={data?.value || 0}
//               thousandSeparator
//               prefix={valuePrefix}
//             />
//           </h3>
//           <p>
//             {/* {startDate !== null && dayjs(startDate).format('DD MMM')} prior to{' '} */}
//             {/* <span className="font-semibold">
//               {endDate !== null and dayjs(endDate).format('DD MMM')}
//             </span> */}
//           </p>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const Statistic = () => {
//   // const startDate = useSelector(
//   //   (state) => state.salesDashboard.state.startDate
//   // );
//   // const endDate = useSelector(
//   //   (state) => state.salesDashboard.state.endDate
//   // );

//   // State to hold fetched data
//   const [statisticsData, setStatisticsData] = useState(null);

//   useEffect(() => {
//     // Fetch data from your APIs
//     axios
//       .all([
//         // axios.get('http://localhost:7000/chet_sanch/get_che_sach'),
//         // axios.get('http://localhost:7000/sahayojak/get_sec_sahayojak'),
//         axios.get('http://localhost:7000/incharge/get_inchargeCard_count'),
//       ])
//       .then(
//         axios.spread((sanchalakResponse, sahayojakResponse, inchargeResponse) => {
//           // Calculate data lengths from the responses
//           // const sanchalakLength = sanchalakResponse.data.length;
//           // const sahayojakLength = sahayojakResponse.data.length;
//           const inchargeLength = inchargeResponse;
//           console.log(inchargeLength)
//           // Set the data to the state
//           setStatisticsData({
//             // sanchalak: { value: sanchalakLength },
//             // sahayojak: { value: sahayojakLength },
//             incharge: { value: inchargeLength },
//           });
//         })
//       )
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div className="lg:flex gap-4">
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.sanchalak}
//           label="Total Sanchalak"
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.sahayojak}
//           label="Total Sahayojak"
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.incharge}
//           label="Total incharge"
//         />
//       </div>
//     </div>
//   );
// };

// export default Statistic;
// import React, { useState, useEffect } from 'react';
// import { Card } from '../../../components/ui';
// import { NumericFormat } from 'react-number-format';
// import axios from 'axios';

// const StatisticCard = ({ data = {}, label, valuePrefix }) => {
//   return (
//     <Card>
//       <h6 className="font-semibold mb-4 text-sm">{label}</h6>
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">
//             <NumericFormat
//               displayType="text"
//               value={data?.value || 0}
//               thousandSeparator
//               prefix={valuePrefix}
//             />
//           </h3>
//           {/* Add any additional information or formatting as needed */}
//         </div>
//       </div>
//     </Card>
//   );
// };

// const Statistic = () => {
//   // State to hold fetched data
//   const [statisticsData, setStatisticsData] = useState(null);

//   useEffect(() => {
//     // Fetch data from your incharge API
//     axios
//       .get('http://localhost:7000/incharge/get_inchargeCard_count')
//       .then((response) => {
//         // Extract the incharge count from the response
//         const inchargeCount = response.data.count;
//         console.log(inchargeCount)
//         // Set the data to the state
//         setStatisticsData({
//           incharge: { value: inchargeCount },
//         });
//       })
//       .catch((error) => {
//         console.error('Error fetching incharge data:', error);
//       });
//   }, []);

//   return (
//     <div className="lg:flex gap-4">
//       {/* You can customize the label and valuePrefix as needed */}
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.incharge}
//           label="Total incharge"
//           valuePrefix=""
//         />
//       </div>
//       {/* Add more StatisticCard components for other data if needed */}
//     </div>
//   );
// };

// export default Statistic;
// import React, { useState, useEffect } from 'react';
// import { Card } from '../../../components/ui';
// import { NumericFormat } from 'react-number-format';
// import axios from 'axios';

// const StatisticCard = ({ data = {}, label, valuePrefix }) => {
//   return (
//     <Card>
//       <h6 className="font-semibold mb-4 text-sm">{label}</h6>
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">
//             <NumericFormat
//               displayType="text"
//               value={data?.value || 0}
//               thousandSeparator
//               prefix={valuePrefix}
//             />
//           </h3>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const Statistic = () => {
//   // State to hold fetched data
//   const [statisticsData, setStatisticsData] = useState(null);
//   useEffect(() => {
//     // Fetch data from your APIs
//     axios
//       .all([
//         axios.get('http://localhost:7000/sanchalak/get_sanchalakCard_count'),
//         axios.get('http://localhost:7000/sahayojaks/get_sahayojakCard_count'),
//         axios.get('http://localhost:7000/event/get_eventsCard_count'),
//         axios.get('http://localhost:7000/incharge/get_inchargeCard_count'),
//       ])
//       .then(
//         axios.spread(
//           (sanchalakResponse, sahayojakResponse, inchargeResponse ,eventResponse) => {
//             // Extract counts from the responses
//             const sanchalakCount = sanchalakResponse.data.count;
//             const sahayojakCount = sahayojakResponse.data.count;
//             const inchargeCount = inchargeResponse.data.count;
//             const eventCount = eventResponse.data.count;

//             // Set the data to the state
//             const newData = {
//               sanchalak: { value: sanchalakCount },
//               sahayojak: { value: sahayojakCount },
//               incharge: { value: inchargeCount },
//               event: { value: eventCount },
//             };

//             setStatisticsData(newData);

//             // Store data in localStorage
//             localStorage.setItem('statisticsData', JSON.stringify(newData));
//           }
//         )
//       )
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);


//   return (
//     <div className="lg:flex gap-4">
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.sanchalak}
//           label="Total Sanchalak"
//           valuePrefix=""
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.sahayojak}
//           label="Total Sahayojak"
//           valuePrefix=""
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.incharge}
//           label="Total incharge"
//           valuePrefix=""
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.event}
//           label="Total event"
//           valuePrefix=""
//         />
//       </div>
//     </div>
//   );
// };

// export default Statistic;


// import React, { useState, useEffect } from 'react';
// import { Card } from '../../../components/ui';
// import { NumericFormat } from 'react-number-format';
// import axios from 'axios';

// const StatisticCard = ({ data = {}, label, valuePrefix }) => {
//   return (
//     <Card>
//       <h6 className="font-semibold mb-4 text-sm">{label}</h6>
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">
//             <NumericFormat
//               displayType="text"
//               value={data?.value || 0}
//               thousandSeparator
//               prefix={valuePrefix}
//             />
//           </h3>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const Statistic = () => {
//   const [statisticsData, setStatisticsData] = useState(null);
//   const [upcomingEvents, setUpcomingEvents] = useState(null);

//   useEffect(() => {
//     axios
//       .all([
//         axios.get('http://localhost:7000/sanchalak/get_sanchalakCard_count'),
//         axios.get('http://localhost:7000/sahayojaks/get_sahayojakCard_count'),
//         axios.get('http://localhost:7000/event/get_eventsCard_count'),
//         axios.get('http://localhost:7000/incharge/get_inchargeCard_count'),
//         axios.get('http://localhost:7000/event/get_upcoming_events'),
//       ])
//       .then(
//         axios.spread(
//           (
//             sanchalakResponse,
//             sahayojakResponse,
//             inchargeResponse,
//             eventResponse
//           ) => {
//             const sanchalakCount = sanchalakResponse.data.count;
//             const sahayojakCount = sahayojakResponse.data.count;
//             const inchargeCount = inchargeResponse.data.count;
//             const eventCount = eventResponse.data.count;

//             const newData = {
//               sanchalak: { value: sanchalakCount },
//               sahayojak: { value: sahayojakCount },
//               incharge: { value: inchargeCount },
//               event: { value: eventCount },
//             };

//             setStatisticsData(newData);

//             const upcomingEventsData = eventResponse.data;
//             setUpcomingEvents(upcomingEventsData);

//             localStorage.setItem('statisticsData', JSON.stringify(newData));
//           }
//         )
//       )
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);


//   return (
//     <div className="lg:flex gap-4">
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.sanchalak}
//           label="Total Sanchalak"
//           valuePrefix=""
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.sahayojak}
//           label="Total Sahayojak"
//           valuePrefix=""
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.incharge}
//           label="Total Incharge"
//           valuePrefix=""
//         />
//       </div>
//       <div className="w-full lg:w-1/4">
//         <StatisticCard
//           data={statisticsData?.event}
//           label="Total Event"
//           valuePrefix=""
//         />
//         <h4 className="font-semibold mt-4 text-sm">Upcoming Events</h4>
//         {upcomingEvents ? (
//           <ul>
//             {upcomingEvents.map((event) => (
//               <li key={event.id}>
//                 {event.event_name} - {event.event_date}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No upcoming events</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Statistic;


import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';

const StatisticCard = ({ data = {}, label, valuePrefix }) => {
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
        </div>
      </div>
    </Card>
  );
};

const Statistic = () => {
  const [statisticsData, setStatisticsData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  useEffect(() => {
    axios
      .all([
        axios.get('https://nirankari-backends.onrender.com/sanchalak/get_sanchalakCard_count'),
        // axios.get('https://nirankari-backends.onrender.com/get_sahayojakCard_count'),
        // axios.get('https://nirankari-backends.onrender.com/get_inchargeCard_count'),
        // axios.get('https://nirankari-backends.onrender.com/get_upcoming_events'),
      ])
      .then(
        axios.spread(
          (
            sanchalakResponse,
            // sahayojakResponse,
            // inchargeResponse,
            // upcomingEventsResponse
          ) => {
            const sanchalakCount = sanchalakResponse.data.count;
            // const sahayojakCount = sahayojakResponse.data.count;
            // const inchargeCount = inchargeResponse.data.count;
            // const upcomingEventsData = upcomingEventsResponse.data;

            const newData = {
              sanchalak: { value: sanchalakCount },
              // sahayojak: { value: sahayojakCount },
              // incharge: { value: inchargeCount },
              // event: { value: upcomingEventsData.length }, // Count of upcoming events
              // nextEvent: upcomingEventsData[0] || null, // Next upcoming event
            };
            console.log("sanchalakCount",sanchalakCount)

            setStatisticsData(newData);

            localStorage.setItem('statisticsData', JSON.stringify(newData));
          }
        )
      )
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);



  return (
    <div className="lg:flex gap-4">
      <div className="w-full lg:w-1/4">
        <StatisticCard
          data={statisticsData?.sanchalak}
          label="Total Sanchalak"
          valuePrefix=""
        />
      </div>
      <div className="w-full lg:w-1/4">
        <StatisticCard
          data={statisticsData?.sahayojak}
          label="Total Sahayojak"
          valuePrefix=""
        />
      </div>
      <div className="w-full lg:w-1/4">
        <StatisticCard
          data={statisticsData?.incharge}
          label="Total Incharge"
          valuePrefix=""
        />
      </div>
      <div className="w-full lg:w-1/4">
        <StatisticCard
          data={statisticsData?.event}
          label=" Upcoming Events"
          valuePrefix=""
        />

      </div>
      {/* <div className=''>
       <Card>
       <h4 className="font-semibold mt-4 text-sm"> Upcoming Event</h4>
        {statisticsData?.nextEvent ? (
          <div>
            <p>
              {statisticsData.nextEvent.event_name} -{' '}
              {statisticsData.nextEvent.event_date}
            </p>
          </div>
        ) : (
          <p>No upcoming events</p>
        )}
       </Card>
      </div> */}

    </div>
  );
};

export default Statistic;
