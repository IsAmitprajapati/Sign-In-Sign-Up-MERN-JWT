import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import UserProfile from '../pages/UserProfile'
import Signin from '../pages/Signin'
import Siginup from '../pages/Siginup'


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "user-profile",
                element : <UserProfile/>
            },
            {
                path : 'sign-in',
                element : <Signin/>
            },
            {
                path : "sign-up",
                element : <Siginup/>
            }
        ]
    }
])

export default router