import {Avatar, Card, CardActions, CardContent, Skeleton, Typography} from "@mui/material";
import type {User} from "../../../../shared/types/user.ts";
import type {ReactNode} from "react";

export const UserCard = ({user, isLoading, actionButton}: {
    user?: User,
    isLoading: boolean,
    actionButton?: ReactNode
}) => {
    if (isLoading) {
        return (
            <Card sx={{margin: '10px'}}>
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
            </Card>
        );
    }
    if (!user) return null;
    return (
        <Card key={user.id} sx={{margin: '10px', display: 'flex', justifyContent: 'space-between'}}>
            <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Avatar src={user.avatar} alt={user.name}/>
                <Typography variant="body2">Created at: {user.createdAt}</Typography>
                <Typography variant="body2">ID: {user.id}</Typography>
            </CardContent>
            {actionButton ?
                <CardActions>
                    {actionButton}
                </CardActions>
                : null}

        </Card>
    );
};
