
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep';
import { getEvents, setTableData } from '../store/dataSlice';
import dayjs from 'dayjs';
// import EventsEditDialog from './EventsEditDialog';
import { useNavigate } from 'react-router-dom';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { toggleDeleteConfirmation } from '../store/stateSlice';
import { setSelectedProduct } from '../store/stateSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { deleteEvents } from '../store/dataSlice';

const EventsTable = () => {
    const dispatch = useDispatch();
    const branchIdToName = {
        1: 'Sangali',
        2: 'Tasgaon',
        3: 'Jath',
      };

    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()
    
        const onEdit = () => {
               navigate(`/events/edit/${row.id}`);
               
            // navigate(`/app/sales/product-edit/${row.id}`)
        }
        const onDelete = () => {
            if (window.confirm('Are you sure you want to delete this events?')) {

              // Dispatch the delete action with the events ID
              dispatch(deleteEvents(row.id));
            }
          };
      
    
        return (
            <div className="flex justify-end text-lg">
                {/* <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <HiOutlinePencil />
                </span> */}
                <span
                    className="cursor-pointer p-2 hover:text-red-500 " 
                  onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </div>
        )
    }

    const columns = useMemo(
                () => [
                    {
                        header: 'ID',
                        accessorKey: 'id',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center capitalize">
                                    {/* Your rendering logic here */}{row.id}
                                </div>
                            );
                        }
                    },
                    {
                        header: 'Event Name',
                        accessorKey: 'name',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.event_name}
                                </div>
                            );
                        }
                    },
                    {
                        header: 'Date',
                        accessorKey: 'date',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.event_date}
                                </div>
                            );
                        }
                    },  
             
                    
                    {
                        header: 'Purpuse',
                        accessorKey: 'purpose',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.event_purpuse}
                                </div>
                            );
                        }
                    },  
                    {
                        header: 'Descrption',
                        accessorKey: 'marritial_Status',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.event_description}
                                </div>
                            );
                        }
                    }, 
                    {
                        header: 'event Unit ',
                        accessorKey: 'unit_name',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.unit_name}
                                </div>
                            );
                        },
                    },
                 
                    {
                        header: 'Action',
                        id: 'action',
                        cell: (props) => <ActionColumn row={props.row.original} />,
                    },
                    // Add more columns as needed
                ],
                []
            );

    // Replace this with your actual data from the Redux store
    const data = useSelector((state) => state.adminEventsList.data.eventsList);
    const loading = useSelector((state) => state.adminEventsList.data.loading);
    const { pageIndex, pageSize, query, total, status } = useSelector((state) => state.adminEventsList.data.tableData);

    const fetchData = useCallback(() => {
        // Dispatch the action to fetch events data from the API
        dispatch(getEvents({ pageIndex, pageSize, query, status }));
    }, [dispatch, pageIndex, pageSize, query, status]);

    useEffect(() => {
        // Fetch data when the component mounts or when pageIndex, pageSize, or query changes
        fetchData();
    }, [fetchData]);
const reversedData = useMemo (() => data.slice().reverse(),[data]);
    const tableData = useMemo(() => ({ pageIndex, pageSize, query, total }), [pageIndex, pageSize, query, total]);

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageIndex = page;
        dispatch(setTableData(newTableData));
    };

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageSize = Number(value);
        newTableData.pageIndex = 1;
        dispatch(setTableData(newTableData));
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={reversedData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageIndex, pageSize, query, total, status }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
            {/* <EventsEditDialog /> */}
        </>
    );
};

export default EventsTable;
