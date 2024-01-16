import ApiService from './ApiService'

export async function apiSignUpRequest(data) {
    return ApiService.fetchData({
        url: 'auth/register',
        method: 'post',
        data,
    })
}
export async function apiSignInRequest(data) {
    return ApiService.fetchData({
        url: 'auth/login',
        method: 'post',
        data,
    })
}
export async function apiForgotPasswordRequest(data) {
    return ApiService.fetchData({
        url: 'auth/forgot-password',
        method: 'post',
        data,
    })
}
