import {useGetPaginatedUsersQuery} from "../../../../app/redux/mockApi.ts";
import {ErrorAlert} from "../../../../shared/ErrorAlert/ui/ErrorAlert.tsx";
import type {User} from "../../../../shared/types/user.ts";
import {UserCard} from "./UserCard.tsx";
import {UserForm} from "../../../../features/UserForm/ui/UserForm.tsx";
import {Typography} from "@mui/material";

interface Props {
    page: number;
}

export const UsersList = ({page = 1}: Props) => {
    const {data = [], isLoading, error} = useGetPaginatedUsersQuery(page);
    if (isLoading) return (
        [...Array(10)].map((_, i) => <UserCard key={i} isLoading={isLoading}/>)
    )
    if (error) { // @ts-expect-error Property 'status' & 'data' does not exist on type 'FetchBaseQueryError | SerializedError'
        return <ErrorAlert text={`${error.status} ${error.data}`}/>;
    }
    return (
        <div>
            {data.length
                ? data.map((user: User) => <UserCard
                    key={user.id} user={user} isLoading={isLoading}
                    actionButton={
                        <UserForm key={user.id} actionType={'edit'} user={user}/>
                    }/>)
                : <Typography
                variant="h3"
                component="h1"
                sx={{
                    mt: 3,
                    fontWeight: 700,
                    fontSize: {xs: '2rem', md: '2.5rem'},
                    textAlign: 'center'
                }}
            >
                No users found
            </Typography>}
        </div>
    )
};