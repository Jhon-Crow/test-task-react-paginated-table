import {UserForm} from "../../../features/UserForm/ui/UserForm.tsx";
import {UsersList} from "../../../entities/User/UsersList/ui/UsersList.tsx";
import {PaginationMy} from "../../../features/Pagination/ui/PaginationMy.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useGetTotalPagesCountQuery} from "../../../app/redux/mockApi.ts";
import {useLayoutEffect} from "react";

export const UsersPage = () => {
    const navigate = useNavigate();
    let {page} = useParams();
    const {data, error} = useGetTotalPagesCountQuery();
    useLayoutEffect(() => {
        if (data && (Number(page) > data || isNaN(Number(page)))) navigate("/users/1", {replace: true});
    },[data, page]);
    return (
        <div>
            <UserForm actionType={'add'} triggerStyle={
                {position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999}
            }/>
            <UsersList page={page ? Number(page) : 1}/>
            <PaginationMy page={page ? Number(page) : 1} data={data} error={error}/>
        </div>
    );
};