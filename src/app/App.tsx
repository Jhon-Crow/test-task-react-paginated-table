import {Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "../pages/UsersPage/ui/UsersPage.tsx";
import {UserDetailsPage} from "../pages/UserDetailsPage/ui/UserDetailsPage.tsx";
import {Layout} from "../features/Layout/ui/Layout.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Navigate to="/users/1" replace/>}/>
                    <Route index path={'/users/:page'} element={<UsersPage/>}/>
                    <Route path={'user/:id'} element={<UserDetailsPage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
