import React, { useEffect } from 'react'
// import  useQuery from 'react-query'

import CustomerProfile from './components/CustomerProfile'
import PaymentHistory from './components/PaymentHistory'
import CurrentSubscription from './components/CurrentSubscription'
import PaymentMethods from './components/PaymentMethods'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomer } from './store/dataSlice'
import reducer from './store'
import { injectReducer } from '../../store'
import { Container, DoubleSidedImage, Loading } from '../../components/shared'

injectReducer('crmCustomerDetails', reducer)

const CustomerDetail = () => {
    const dispatch = useDispatch()

    // const query = useQuery()

    const data = useSelector(
        (state) => state.crmCustomerDetails.data.profileData
    )
    const loading = useSelector(
        (state) => state.crmCustomerDetails.data.loading
    )

    // useEffect(() => {
    //     fetchData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // const fetchData = () => {
    //     const id = query.get('id')
    //     if (id) {
    //         dispatch(getCustomer({ id }))
    //     }
    // }

    return (
        <Container className="h-full">
            <Loading loading={loading}>
               
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div>
                            <CustomerProfile  />
                        </div>
                        {/* <div className="w-full">
                            <AdaptableCard>
                                <CurrentSubscription />
                                <PaymentHistory />
                                <PaymentMethods data={data.paymentMethod} />
                            </AdaptableCard>
                        </div> */}
                    </div>
              
            </Loading>
           
        </Container>
    )
}

export default CustomerDetail
