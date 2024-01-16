import ApiService from "./ApiService";

export async function apiAllEventsList(data) {
    return ApiService.fetchData({
        url: '/event/get_event',
        method: 'get',
        data
    })
}



export async function apiEventsDetailsById(data) {
    return ApiService.fetchData({
        url: 'event/get_event/id',
        method: 'post',
        data
    })
}


export async function apiEventsRegister(data) {
    return ApiService.fetchData({
        url: '/event/new_event',
        method: 'post',
        data
    })
}

export async function apiDeleteEvents(eventId) {
    return ApiService.fetchData({
      url: `/event/remove_event/${eventId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateEventsDetails(eventData) {
    return ApiService.fetchData({
      url: `/event/update_event/${eventData.id}`,
      method: 'put',
      data: eventData,
    });
  }