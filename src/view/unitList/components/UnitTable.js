
import React, { useCallback, useEffect, useMemo ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep';
import { getUnits, setTableData } from '../store/dataSlice';
import dayjs from 'dayjs';
// import UnitsEditDialog from './UnitsEditDialog';
import { useNavigate } from 'react-router-dom';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { toggleDeleteConfirmation } from '../store/stateSlice';
import { setSelectedProduct } from '../store/stateSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { deleteUnits } from '../store/dataSlice';
import PersonalInformation from './addunit/PersonalInformation';
import { Dialog } from '../../../components/ui';
import EditUnit from './editunit/EditUnit';

const UnitsTable = () => {
    const dispatch = useDispatch();
 
    const ActionColumn = ({ row }) => {


        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

    
        const onEdit = () => {
            //    navigate(`/units/edit/${row.id}`);
          
            setinitialData(row); // Set the selected unit's data in the state
            setDialogOpen(true);
        
            };
        
            // Function to close the dialog
          
        const onDelete = () => {
            if (window.confirm('Are you sure you want to delete this units?')) {

              // Dispatch the delete action with the units ID
              dispatch(deleteUnits(row.id));
            }
          };
      
    
        return (
            <div className="flex justify-end text-lg">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <HiOutlinePencil />
                </span>
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
                        header: 'Unit Name',
                        accessorKey: 'name',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.unit_name}
                                </div>
                            );
                        }
                    },
                    {
                        header: 'Unit Number',
                        accessorKey: 'number',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.unit_number}
                                </div>
                            );
                        }
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
    const data = useSelector((state) => state.adminUnitsList.data.unitsList);
    const loading = useSelector((state) => state.adminUnitsList.data.loading);
    const { pageIndex, pageSize, query, total, status } = useSelector((state) => state.adminUnitsList.data.tableData);

    const fetchData = useCallback(() => {
        // Dispatch the action to fetch units data from the API
        dispatch(getUnits({ pageIndex, pageSize, query, status }));
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

    const closeDialog = () => {
        setDialogOpen(false);
    };
    const [initialData, setinitialData] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false); // State variable for dialog visibility


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
             <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog} // Close the dialog when needed
                closable={true} // You can customize this prop
                width= {550}
                height={220}
                // closeTimeoutMS={/* Set the close animation duration */}
                // portalClassName="your-portal-class" // Add your portal class
                // overlayClassName="your-overlay-class" // Add your overlay class
                // contentClassName="your-content-class" // Add your content class
            >
                {/* <CreateUnitsDialog/> */}
                <EditUnit  initialData={initialData}   />
                {/* Add form or content for creating units here */}
            </Dialog>
            {/* <UnitsEditDialog /> */}
        </>
    );
};

export default UnitsTable;
