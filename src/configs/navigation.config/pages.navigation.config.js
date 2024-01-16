import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM
} from '../../constants/navigation.constant'
import { ADMIN, EMPLOYEE, SHOP, OWNER,RESEPTIONIST ,SANCHALAK ,CHETRIYE_SANCHALAK} from '../../constants/roles.constant'

const pagesNavigationConfig = [
    {
        key: 'pages',
        path: '',
        title: 'PAGES',
        translateKey: 'nav.pages',
        icon: 'pages',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [EMPLOYEE, ADMIN, RESEPTIONIST, SANCHALAK ,CHETRIYE_SANCHALAK],
        subMenu: [
            {
                key: 'dashboard',
                path: `/dashboard/sanchalak_dashboard`,
                title: 'Dashboard',
                translateKey: 'nav.dashboard',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [SANCHALAK ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
            {
                key: 'unit.list',
                path: `/unit-list`,
                title: 'unit',
                translateKey: 'nav.unit',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [CHETRIYE_SANCHALAK ],
                subMenu: [],
            },
            {
                key: 'sach.list',
                path: `/sanchalak-table`,
                title: ' sanchalak',
                translateKey: 'nav.che_sach.list',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
       
           
            {
                key: 'sahayojak',
                path: `/sahayojak-list`,
                title: 'sector sahayojak',
                translateKey: 'nav.sayayojak',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
            {
                key: 'incharge',
                path: `/incharge-list`,
                title: 'Incharge',
                translateKey: 'nav.ichARGE',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
            {
                key: 'sevadalGents.list',
                path: `/sevadalGents-list`,
                title: 'sevadal (Gents)',
                translateKey: 'nav.sevadalGents',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [SANCHALAK ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
            
            {
                key: 'sevadalLadies.list',
                path: `/sevadalLadies-list`,
                title: 'sevadal (Ladies)',
                translateKey: 'nav.sevadalLadies',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [SANCHALAK ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
            {
                key: 'events.list',
                path: `/events-list`,
                title: 'Event',
                translateKey: 'nav.events',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [SANCHALAK ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
            {
                key: 'events.attendance',
                path: `/events-attendance`,
                title: 'Event Attendance',
                translateKey: 'nav.attendance',
                icon: 'list',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [SANCHALAK ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
          
          
            {
                key: 'media.list',
                path: `/media-list`,
                title: 'Media',
                translateKey: 'nav.media',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
        
            {
                key: 'product.new',
                path: '/profile/settings',
                title: 'Profile',
                translateKey: 'nav.product.new',
                icon: 'product',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN ,SANCHALAK ,CHETRIYE_SANCHALAK],
                subMenu: [],
            },
            
        ],
    },
]

export default pagesNavigationConfig
