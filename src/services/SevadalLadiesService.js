import ApiService from "./ApiService";

export async function apiAllSevadalLadiesList(data) {
    return ApiService.fetchData({
        url: '/sevadalLadies/get_sevadal_ladies',
        method: 'get',
        data
    })
}



export async function apiSevadalLadiesDetailsById(data) {
    return ApiService.fetchData({
        url: 'sevadalLadies/get_sevadal_ladies/id',
        method: 'post',
        data
    })
}


export async function apiSevadalLadiesRegister(data) {
    return ApiService.fetchData({
        url: '/sevadalLadies/new_sevadal_ladies',
        method: 'post',
        data
    })
}

export async function apiDeleteSevadalLadies(sevadalLadiesId) {
    return ApiService.fetchData({
      url: `/sevadalLadies/remove_sevadal_ladies/${sevadalLadiesId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateSevadalLadiesDetails(sevadalLadiesData) {
    return ApiService.fetchData({
      url: `/sevadalLadies/update_sevadal_ladies/${sevadalLadiesData.id}`,
      method: 'put',
      data: sevadalLadiesData,
    });
  }