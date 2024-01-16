import ApiService from "./ApiService";

export async function apiAllSevadalList(data) {
    return ApiService.fetchData({
        url: '/sevadal/get_sevadal',
        method: 'get',
        data
    })
}

// export async function apiAllSevadalList({ data, branchId }) {
//   return ApiService.fetchData({
//       url: `/sevadal/get_sevadal?branchId=${branchId}`, // Include branchId in the URL
//       method: 'get',
//       data,
//   });
// }


export async function apiSevadalDetailsBySevadalId(employeeId) {
    return ApiService.fetchData({
      url: `/sevadal/get_sevadal/${employeeId}`,
      method: 'get',
        
    })
}



export async function apiSevadalRegister(data) {
    return ApiService.fetchData({
        url: '/sevadal/new_sevadal',
        method: 'post',
        data
    })
}

export async function apiDeleteSevadal(employeeId) {
    return ApiService.fetchData({
      url: `/sevadal/remove_sevadal/${employeeId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateSevadalDetails(employeeData) {
    return ApiService.fetchData({
      url: `/sevadal/update_sevadal/${employeeData.id}`,
      method: 'put',
      data: employeeData,
    });
  }