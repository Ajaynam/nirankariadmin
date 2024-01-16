import ApiService from "./ApiService";

export async function apiAllMediaList(data) {
    return ApiService.fetchData({
        url: '/media/get_media',
        method: 'get',
        data
    })
}



export async function apiMediaDetailsByMediaId(data) {
    return ApiService.fetchData({
        url: 'media/id',
        method: 'post',
        data
    })
}


export async function apiMediaRegister(data) {
    return ApiService.fetchData({
        url: '/media/new_media',
        method: 'post',
        data
    })
}

export async function apiDeleteMedia(employeeId) {
    return ApiService.fetchData({
      url: `/media/remove_media/${employeeId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateMediaDetails(employeeData) {
    return ApiService.fetchData({
      url: `/media/update_media/${employeeData.id}`,
      method: 'put',
      data: employeeData,
    });
  }