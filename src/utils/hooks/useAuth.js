import { useSelector, useDispatch } from 'react-redux'
import appConfig from '../../configs/app.config'
import { REDIRECT_URL_KEY } from '../../constants/app.constant'
import { apiForgotPasswordRequest, apiSignInRequest } from '../../services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from '../../store/auth/sessionSlice'
import { initialState, setUser } from '../../store/auth/userSlice'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'


function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)



    const signIn = async (values) => {
        try {
            const resp = await apiSignInRequest(values)
            console.log(resp)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data?.data) {
                    dispatch(
                        setUser(
                            { ...resp.data.data, authority: resp.data.authority } || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : (appConfig.authenticatedEntryPath)
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }


    const forgotPassword = async (values) => {
        try {
            const resp = await apiForgotPasswordRequest(values)
            console.log(resp);
            return
            // if (resp.data) {
            //     const redirectUrl = query.get(REDIRECT_URL_KEY)
            //     navigate(
            //         redirectUrl ? redirectUrl : (appConfig.authenticatedEntryPath)
            //     )
            //     return {
            //         status: 'success',
            //         message: response?.data?.message || errors.toString(),
            //     }
            // }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }


    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        handleSignOut()
    }

// role = 
//
//

    return {
        authenticated:  token && signedIn,
        // authenticated: true,
        signIn,
        forgotPassword,
        signOut
    }
}

export default useAuth
