
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep';
import { getSahayojak, setTableData } from '../store/dataSlice';
import dayjs from 'dayjs';
// import SahayojakEditDialog from './SahayojakEditDialog';
import { useNavigate } from 'react-router-dom';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { toggleDeleteConfirmation } from '../store/stateSlice';
import { setSelectedProduct } from '../store/stateSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { deleteSahayojak } from '../store/dataSlice';

const SahayojakTable = () => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate()

    const handleIDClick = (id) => {
        navigate(`/user/sahayojakProfile/${id}`);
    };

    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()
    
        const onEdit = () => {
               navigate(`/sahayojak/edit/${row.id}`);
               
            // navigate(`/app/sales/product-edit/${row.id}`)
        }
        const onDelete = () => {
            if (window.confirm('Are you sure you want to delete this sahayojak?')) {

              // Dispatch the delete action with the sahayojak ID
              dispatch(deleteSahayojak(row.id));
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
                                <div className="flex items-center cursor-pointer capitalize"  onClick={() => handleIDClick(row.id)}>
                                    {/* Your rendering logic here */}{row.id}
                                </div>
                            );
                        }
                    },

                    {
                        header: 'Photo',
                        accessorKey: 'sahayojak_photo',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row.sahayojak_photo ? (
                                        <img
                                            src={`http://snmsangli.com/api/uploads/${encodeURIComponent(row.sahayojak_photo)}`}
                                            
                                            alt="sahayojak Photo"
                                            width="50"
                                            height="50"
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                            onError={() => console.log("Image load error:", row.sahayojak_photo)}
                                        />
                                    ) : (
                                        'No Photo'
                                    )}
                                </div>
                            );
                        },
                    },

                    {
                        header: 'Name',
                        accessorKey: 'name',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.sahayojak_name}
                                </div>
                            );
                        }
                    },
                    {
                        header: 'Phone',
                        accessorKey: 'mobile',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.sahayojak_mob}
                                </div>
                            );
                        }
                    },  
                 
                    
                    {
                        header: 'Address',
                        accessorKey: 'address',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.sahayojak_address}
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
    const data = useSelector((state) => state.adminSahayojakList.data.sahayojakList);
    const loading = useSelector((state) => state.adminSahayojakList.data.loading);
    const { pageIndex, pageSize, query, total, status } = useSelector((state) => state.adminSahayojakList.data.tableData);

    const fetchData = useCallback(() => {
        // Dispatch the action to fetch sahayojak data from the API
        dispatch(getSahayojak({ pageIndex, pageSize, query, status }));
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
            {/* <SahayojakEditDialog /> */}
        </>
    );
};

export default SahayojakTable;
