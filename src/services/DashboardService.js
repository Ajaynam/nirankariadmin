import ApiService from "./ApiService";

export async function apiChartData(data) {
    return ApiService.fetchData({
        url: 'chet_sanch/sanchalak-chart',
        method: 'get',
        data
    })
}
