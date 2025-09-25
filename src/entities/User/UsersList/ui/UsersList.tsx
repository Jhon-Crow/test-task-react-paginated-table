import {useGetUsersQuery} from "../../../../app/redux/mockApi.ts";
import {ErrorAlert} from "../../../../shared/ErrorAlert/ui/ErrorAlert.tsx";
import {Avatar, Card, CardContent, Skeleton, Typography} from "@mui/material";
import type {User} from "../../../../shared/types/user.ts";

export const UsersList = ({page = 1}) => {
    const {data = [], isLoading, error} = useGetUsersQuery(page);
    if (error) { // @ts-ignore
        return <ErrorAlert text={`${error.status} ${error.data}`}/>;
    }
    if (isLoading) {
        return (
            <div>
                {[...Array(10)].map((_, i) => <Card key={i} sx={{margin: '10px'}}>
                    <CardContent>
                        <Typography variant="h6">
                            <Skeleton animation="pulse" height={30} width="100%"/>
                        </Typography>
                        <Avatar src="" alt=""/>
                        <Typography variant="body2">
                            <Skeleton animation="pulse" height={20} width="100%"/>
                        </Typography>
                        <Typography variant="body2">
                            <Skeleton animation="pulse" height={20} width="100%"/>
                        </Typography>
                    </CardContent>
                </Card>)}
            </div>
        );
    }
    return (
        <div>
            {data.map((user: User) => <Card key={user.id} sx={{margin: '10px'}}>
                <CardContent>
                    <Typography variant="h6">{user.name}</Typography>
                    <Avatar src={user.avatar} alt={user.name}/>
                    <Typography variant="body2">Created at: {user.createdAt}</Typography>
                    <Typography variant="body2">ID: {user.id}</Typography>
                </CardContent>
            </Card>)}
        </div>
    );
};