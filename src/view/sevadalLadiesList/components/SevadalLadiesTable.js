
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep';
import { getSevadal, setTableData } from '../store/dataSlice';
import dayjs from 'dayjs';
// import SevadalEditDialog from './SevadalEditDialog';
import { useNavigate } from 'react-router-dom';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { toggleDeleteConfirmation } from '../store/stateSlice';
import { setSelectedProduct } from '../store/stateSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { deleteSevadal } from '../store/dataSlice';

const SevadalLadiesTable = () => {
    const dispatch = useDispatch();
   
     
    const navigate = useNavigate()

    const handleIDClick = (id) => {
        navigate(`/user/SevadalProfile/${id}`);
    };


    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onEdit = () => {
            navigate(`/SevadalProfile/edit/${row.id}`);

            // navigate(`/app/sales/product-edit/${row.id}`)
        }
        const onDelete = () => {
            if (window.confirm('Are you sure you want to delete this sevadal?')) {

                // Dispatch the delete action with the sevadal ID
                dispatch(deleteSevadal(row.id));
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
                accessorKey: 'sevadal_photo',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.sevadal_photo ? (
                                <img
                                    src={`http://snmsangli.com/api/uploads/${encodeURIComponent(row.sevadal_photo)}`}
                                    
                                    alt="Sevadal Photo"
                                    width="50"
                                    height="50"
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    onError={() => console.log("Image load error:", row.sevadal_photo)}
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
                            {row?.sevadal_name}
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
                            {row?.sevadal_mob}
                        </div>
                    );
                }
            },
            // {
            //     header: 'Phone',
            //     accessorKey: 'mobile',
            //     cell: (props) => {
            //         const row = props.row.original;
            //         return (
            //             <div className="flex items-center">
            //                 {row?.sevadal_address}
            //             </div>
            //         );
            //     }
            // }, 

            {
                header: 'Address',
                accessorKey: 'address',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row?.sevadal_address}
                        </div>
                    );
                }
            },
            {
                header: ' Unit ',
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
    const data = useSelector((state) => state.adminLadiesSevadalList.data.sevadalList);
    console.log(data)
    const loading = useSelector((state) => state.adminLadiesSevadalList.data.loading);
    const { pageIndex, pageSize, query, total, status } = useSelector((state) => state.adminLadiesSevadalList.data.tableData);

    const fetchData = useCallback(() => {
        // Dispatch the action to fetch sevadal data from the API
        dispatch(getSevadal({ pageIndex, pageSize, query, status }));
    }, [dispatch, pageIndex, pageSize, query, status]);

    useEffect(() => {
        // Fetch data when the component mounts or when pageIndex, pageSize, or query changes
        fetchData();
    }, [fetchData]);
    
    const reversedData = useMemo(() => data.slice().reverse(), [data]);
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
            {/* <SevadalEditDialog /> */}
        </>
    );
};

export default SevadalLadiesTable;
