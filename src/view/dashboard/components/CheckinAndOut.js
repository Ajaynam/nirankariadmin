import React from 'react'
// import { Button } from '../../../components/ui'

function CheckinAndOut() {
    return (
        <div>
            <div>
                <span>Please tap on button to check in</span>
                <div>
                <button
                        className="mt-4 bg-blue-500 text-white py-4 px-8 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                        // onClick={handlePrint}
                    >
                     Visitor Check-In
                    </button> <br/>
                    <button
                        className="mt-4 bg-red-500 text-white py-4 px-8 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                      Visitor Check-Out    
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckinAndOut