


import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep';
import { getEmployee, setTableData } from '../store/dataSlice';
import dayjs from 'dayjs';
import EmployeeEditDialog from './EmployeeEditDialog';
import { useNavigate } from 'react-router-dom';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { toggleDeleteConfirmation } from '../store/stateSlice';
import { setSelectedProduct } from '../store/stateSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { deleteEmployee } from '../store/dataSlice';

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const branchIdToName = {
        1: 'Sangali',
        2: 'Tasgaon',
        3: 'Jath',
    };

    const navigate = useNavigate()

    const handleIDClick = (id) => {
        navigate(`/user/profile/${id}`);
    };


    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()



        const onEdit = () => {
            navigate(`/employee/edit/${row.id}`);

            // navigate(`/app/sales/product-edit/${row.id}`)
        }
        const onDelete = () => {
            if (window.confirm('Are you sure you want to delete this employee?')) {

                // Dispatch the delete action with the employee ID
                dispatch(deleteEmployee(row.id));
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
                        <div className="flex items-center cursor-pointer hover:font-bold hover:text-blue-800 capitalize" onClick={() => handleIDClick(row.id)}>

                            {/* Your rendering logic here */}{row.id}
                        </div>
                    );
                }
            },


            {
                header: 'Photo',
                accessorKey: 'sanchalak_photo',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.sanchalak_photo ? (
 
                                <img
                                    className="h-auto w-28 mx-auto"
                                    width="50"
                                    // height="50"
                                    style={{ maxWidth: '50%', maxHeight: '50%', }}
                                    src={`data:image/png;base64,${row.sanchalak_photo}`}
                                    alt=""
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
                            {row?.sanchalak_name}
                        </div>
                    );
                }
            },
            // {
            //     header: 'Date of birth',
            //     accessorKey: 'date',
            //     cell: (props) => {
            //         const row = props.row.original;
            //         return (
            //             <div className="flex items-center">
            //                 {row?.sanchalak_dob}
            //             </div>
            //         );
            //     }
            // }, 
            // {
            //     header: 'Date of order',
            //     accessorKey: 'date',
            //     cell: (props) => {
            //         const row = props.row.original;
            //         return (
            //             <div className="flex items-center">
            //                 {row?.sanchalak_doj}
            //             </div>
            //         );
            //     }
            // },
            {
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row?.sanchalak_email}
                        </div>
                    );
                }
            }, {
                header: 'Phone',
                accessorKey: 'mobile',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row?.sanchalak_mob}
                        </div>
                    );
                }
            }, {
                header: 'Address',
                accessorKey: 'address',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row?.sanchalak_address}
                        </div>
                    );
                }
            },
            // {
            //     header: 'Unit ',
            //     accessorKey: 'branchId',
            //     cell: (props) => {
            //         const row = props.row.original;
            //         const branchName = branchIdToName[row.sanchalak_branchId];
            //         return (
            //             <div className="flex items-center">
            //                 {branchName}
            //             </div>
            //         );
            //     },
            // },
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

    const data = useSelector((state) => state.adminEmployeeList.data.employeeList);
    const loading = useSelector((state) => state.adminEmployeeList.data.loading);
    const { pageIndex, pageSize, query, total, status } = useSelector((state) => state.adminEmployeeList.data.tableData);

    const fetchData = useCallback(() => {
        dispatch(getEmployee({ pageIndex, pageSize, query, status }));
    }, [dispatch, pageIndex, pageSize, query, status]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Reverse the data array to show the last entry first
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
                data={reversedData} // Use the reversed data array
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageIndex, pageSize, query, total, status }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
            <EmployeeEditDialog />
        </>
    );
};

export default EmployeeTable;
