import ApiService from "./ApiService";

export async function apiAllSevadalGentsList(data) {
    return ApiService.fetchData({
        url: '/sevadalGents/get_sevadal_gents',
        method: 'get',
        data
    })
}



export async function apiSevadalGentsDetailsById(data) {
    return ApiService.fetchData({
        url: 'sevadalGents/get_sevadal_gents/id',
        method: 'post',
        data
    })
}


export async function apiSevadalGentsRegister(data) {
    return ApiService.fetchData({
        url: '/sevadalGents/new_sevadal_gents',
        method: 'post',
        data
    })
}

export async function apiDeleteSevadalGents(sevadalGentsId) {
    return ApiService.fetchData({
      url: `/sevadalGents/remove_sevadal_gents/${sevadalGentsId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateSevadalGentsDetails(sevadalGentsData) {
    return ApiService.fetchData({
      url: `/sevadalGents/update_sevadal_gents/${sevadalGentsData.id}`,
      method: 'put',
      data: sevadalGentsData,
    });
  }