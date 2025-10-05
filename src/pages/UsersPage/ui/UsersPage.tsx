import {UserForm} from "../../../features/UserForm/ui/UserForm.tsx";
import {UsersList} from "../../../entities/User/UsersList/ui/UsersList.tsx";
import {PaginationMy} from "../../../features/Pagination/ui/PaginationMy.tsx";
import {useParams} from "react-router-dom";

export const UsersPage = () => {
    const {page} = useParams();
    return (
        <div>
            <UserForm actionType={'add'} triggerStyle={
                {position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999}
            }/>
            <UsersList page={page ? Number(page) : 1}/>
            <PaginationMy page={page ? Number(page) : 1}/>
        </div>
    );
};