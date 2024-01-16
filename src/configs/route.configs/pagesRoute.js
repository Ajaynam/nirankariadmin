import React from 'react'
import { ADMIN, EMPLOYEE, OWNER, SHOP,SANCHALAK , CHETRIYE_SANCHALAK} from '../../constants/roles.constant'

const pagesRoute = [
    {
        key: 'dashboard',
        path: `/dashboard`,
        component: React.lazy(() => import('../../view/sanchalak_desboard')),
        authority: [ADMIN,  SANCHALAK , CHETRIYE_SANCHALAK] ,
    },
    {
        key: 'dashboard',
        path: `/`,
        component: React.lazy(() => import('../../view/sanchalak_desboard')),
        authority: [ADMIN, SANCHALAK , CHETRIYE_SANCHALAK],
    },
  

    {
        key: 'sach.list',
        path: `/sanchalak-table`,
        component: React.lazy(() => import('../../view/employeeList')),
        authority: [ADMIN , CHETRIYE_SANCHALAK],
    },
    {
        key: 'sahayojak.list',
        path: `/sahayojak-list`,
        component: React.lazy(() => import('../../view/sec_sahayojakList')),
        authority: [ADMIN , CHETRIYE_SANCHALAK],
    },
    {
        key: 'sahayojaks.add',
        path: `/new-sahayojaks`,
        component: React.lazy(() => import('../../view/sahayojak')),
        authority: [ADMIN , CHETRIYE_SANCHALAK],
    },
  
   
    {
        key: 'incharge.list',
        path: `/incharge-list`,
        component: React.lazy(() => import('../../view/inchargeList')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'events.list',
        path: `/events-list`,
        component: React.lazy(() => import('../../view/EventList')),
        authority: [ADMIN ,SANCHALAK, CHETRIYE_SANCHALAK],
    },
    {
        key: 'events.attendance',
        path: `/events-attendance`,
        component: React.lazy(() => import('../../view/Attendance')),
        authority: [ADMIN ,SANCHALAK, CHETRIYE_SANCHALAK],
    },
    {
        key: 'unit.list',
        path: `/unit-list`,
        component: React.lazy(() => import('../../view/unitList')),
        authority: [ADMIN , CHETRIYE_SANCHALAK],
    },
    {
        key: 'media.list',
        path: `/media-list`,
        component: React.lazy(() => import('../../view/sec_sahayojakList copy')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },

    {
        key: 'sevadal.list',
        path: `/sevadalGents-list`,
        component: React.lazy(() => import('../../view/sevadalList')),
        authority: [ADMIN , SANCHALAK, CHETRIYE_SANCHALAK],
    },
    {
        key: 'sevadalLadies.list',
        path: `/sevadalLadies-list`,
        component: React.lazy(() => import('../../view/sevadalLadiesList')),
        authority: [ADMIN,SANCHALAK,CHETRIYE_SANCHALAK],
    },
    {
        key: 'employee.details',
        path: `/employee/details1`,
        component: React.lazy(() => import('../../view/employeeDetails')),
        authority: [ADMIN, CHETRIYE_SANCHALAK],
    },
    {
        key: 'access.denied',
        path: `/access-denied`,
        component: React.lazy(() => import('../../view/accessDenied')),
        authority: [ADMIN,CHETRIYE_SANCHALAK ],
    },


   
 
    {
        key: 'employee.new',
        path: `/new-sanchalak`,
        component: React.lazy(() => import('../../view/addEmployee')),
        authority: [ADMIN, CHETRIYE_SANCHALAK],
    },
    {
        key: 'incharg.new',
        path: `/new-incharge`,
        component: React.lazy(() => import('../../view/incharg')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'employee.new',
        path: `/new-sahayojak`,
        component: React.lazy(() => import('../../view/addSahayojak')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'event.new',
        path: `/new-event`,
        component: React.lazy(() => import('../../view/addEvent')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'sevadal.new',
        path: `/new-sevadal`,
        component: React.lazy(() => import('../../view/addSevadal')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'media.new',
        path: `/new-media`,
        component: React.lazy(() => import('../../view/addMedia')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'employee.edit',
        path: `/employee/edit/:employeeId`,
        component: React.lazy(() => import('../../view/editSanchalak')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'employee.edit',
        path: `/incharge/edit/:inchargeId`,
        component: React.lazy(() => import('../../view/editIncharge')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'sahayojak.edit',
        path: `/sahayojak/edit/:sahayojakId`,
        component: React.lazy(() => import('../../view/editSahayojak')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'events.edit',
        path: `/events/edit/:eventId`,
        component: React.lazy(() => import('../../view/editEvent')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },

    // {
    //     key: 'employee.attandance',
    //     path: `/employee/attandance`,
    //     component: React.lazy(() => import('../../view/employeeAttandance')),
    //     authority: [ADMIN],
    // },
    {
        key: 'address.list',
        path: `/address/list`,
        component: React.lazy(() => import('../../view/address')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },

   
    {
        key: 'user.profile',
        path: `/user/profile/:userId`,
        component: React.lazy(() => import('../../view/userProfileSanchalak')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'user.profile',
        path: `/user/sahayojakProfile/:userId`,
        component: React.lazy(() => import('../../view/userProfileSahayojak')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'user.profile',
        path: `/user/inchargeProfile/:userId`,
        component: React.lazy(() => import('../../view/userProfileIncharge')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'user.profile',
        path: `/user/SevadalProfile/:userId`,
        component: React.lazy(() => import('../../view/userProfileSevadal')),
        authority: [ADMIN ,CHETRIYE_SANCHALAK],
    },
    {
        key: 'profile.settings',
        path: `/profile/settings`,
        component: React.lazy(() => import('../../view/MyProfileChetSanch')),
        authority: [ADMIN, SANCHALAK ,CHETRIYE_SANCHALAK ],
    },
]

export default pagesRoute
