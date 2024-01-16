import ApiService from "./ApiService";

export async function apiAllInchargeList(data) {
    return ApiService.fetchData({
        url: '/incharge/get_incharge',
        method: 'get',
       
        data,
    })
   
}





export async function apiinchargeDetailsByinchargeId(employeeId) {
  return ApiService.fetchData({
    url: `/incharge/get_incharge/${employeeId}`,
    method: 'get',
      
  })
}

export async function apiInchargeRegister(data) {
    return ApiService.fetchData({
        url: '/incharge/new_incharge',
        method: 'post',
        data
    })
}

export async function apiDeleteIncharge(inchargeId) {
    return ApiService.fetchData({
      url: `/incharge/remove_incharge/${inchargeId}`, // Use the appropriate URL to delete an incharge by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateInchargeDetails(inchargeData) {
    return ApiService.fetchData({
      url: `/incharge/update_incharge/${inchargeData.id}`,
      method: 'put',
      data: inchargeData,
    });
  }