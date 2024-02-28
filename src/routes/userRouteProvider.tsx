import { Navigate, Outlet } from 'react-router-dom'
// import { GetToken } from '../hooks/hooks'


export const UserNoRouteProvider = () => {
    const auth = localStorage.getItem("token")
    return (
        <div>
            {
                auth ? <Navigate to='/messenger' /> : <Outlet />
            }
        </div>
    )
}


const UserRouteProvider = () => {
    // const auth = GetToken()
    const auth = localStorage.getItem("token")

    return (
        <div>
            {
                auth ? <Outlet /> : <Navigate to='/signin' />
                // auth ? <Navigate to='/messages/priest' /> : <Outlet />
            }
        </div>
    )
}

export default UserRouteProvider
