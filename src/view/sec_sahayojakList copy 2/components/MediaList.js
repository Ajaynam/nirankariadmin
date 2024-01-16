
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep';
import { getMedia, setTableData } from '../store/dataSlice';
import dayjs from 'dayjs';
// import MediaEditDialog from './MediaEditDialog';
import { useNavigate } from 'react-router-dom';
import useThemeClass from '../../../utils/hooks/useThemeClass';
import { toggleDeleteConfirmation } from '../store/stateSlice';
import { setSelectedProduct } from '../store/stateSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { deleteMedia } from '../store/dataSlice';

const MediaList = () => {
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
               navigate(`/media/edit/${row.id}`);
               
            // navigate(`/app/sales/product-edit/${row.id}`)
        }
        const onDelete = () => {
            if (window.confirm('Are you sure you want to delete this media?')) {

              // Dispatch the delete action with the media ID
              dispatch(deleteMedia(row.id));
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

                    // {
                    //     header: 'Photo',
                    //     accessorKey: 'media_photo',
                    //     cell: (props) => {
                    //         const row = props.row.original;
                    //         return (
                    //             <div className="flex items-center">
                    //                 {row.media_photo ? (
                    //                     <img
                    //                         src={`http://localhost:7000/uploads/${encodeURIComponent(row.media_photo)}`}
                                            
                    //                         alt="media Photo"
                    //                         width="50"
                    //                         height="50"
                    //                         style={{ maxWidth: '100%', maxHeight: '100%' }}
                    //                         onError={() => console.log("Image load error:", row.media_photo)}
                    //                     />
                    //                 ) : (
                    //                     'No Photo'
                    //                 )}
                    //             </div>
                    //         );
                    //     },
                    // },
                    
                    {
                        header: 'Video',
                        accessorKey: 'media_video',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row.media_video ? (
                                        <video
                                            src={`http://snmsangli.com/api/uploads/${encodeURIComponent(row.media_video)}`}
                                            
                                            alt="media Video"
                                            width="50"
                                            height="50"
                                            style={{ maxWidth: '50%', maxHeight: '50%' }}
                                            onError={() => console.log("Image load error:", row.media_video)}
                                        />
                                    ) : (
                                        'No Video'
                                    )}
                                </div>
                            );
                        },
                    },

                    {
                        header: 'Title',
                        accessorKey: 'title',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.media_title}
                                </div>
                            );
                        }
                    },
                    {
                        header: 'Description',
                        accessorKey: 'description',
                        cell: (props) => {
                            const row = props.row.original;
                            return (
                                <div className="flex items-center">
                                    {row?.media_description}
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
    const data = useSelector((state) => state.adminMediaList.data.mediaList);
    const loading = useSelector((state) => state.adminMediaList.data.loading);
    const { pageIndex, pageSize, query, total, status } = useSelector((state) => state.adminMediaList.data.tableData);

    const fetchData = useCallback(() => {
        // Dispatch the action to fetch media data from the API
        dispatch(getMedia({ pageIndex, pageSize, query, status }));
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
            {/* <MediaEditDialog /> */}
        </>
    );
};

export default MediaList;
