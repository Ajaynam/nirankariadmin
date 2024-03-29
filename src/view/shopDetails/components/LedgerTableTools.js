import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import { getAllLedgerListByShopId, setFilterData, setTableData } from '../store/dataSlice'
import { Button } from '../../../components/ui'
import LedgerTableFilter from './LedgerTableFilter'
import LedgerForm from './LedgerForm'

const LedgerTableTools = () => {
    const dispatch = useDispatch()

    const tableData = useSelector((state) => state.adminShopDetails.data.tableData)

    // const handleInputChange = (val) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.query = val
    //     newTableData.pageIndex = 1
    //     if (typeof val === 'string' && val.length > 1) {
    //         fetchData(newTableData)
    //     }

    //     if (typeof val === 'string' && val.length === 0) {
    //         fetchData(newTableData)
    //     }
    // }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getAllLedgerListByShopId(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        // inputRef.current.value = ''
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:grid grid-cols-3 gap-3">
            <div className="col-span-2">
                <LedgerForm />
            </div>
            <div className="col-span-1">
                <div className="flex items-center justify-end gap-4 mt-6">
                    <div className="md:flex items-center gap-4 mt-1">
                        <LedgerTableFilter />
                    </div>
                    <div className="mb-4 mt-1">
                        <Button size="sm" onClick={onClearAll}>
                            Clear All
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LedgerTableTools
