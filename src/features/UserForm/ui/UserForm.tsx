import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useAddUserMutation, useUpdateUserMutation} from "../../../app/redux/mockApi.ts";
import {TextareaAutosize} from "@mui/material";
import {userFormActions, userFormSelectors} from "../model/slice/userFormSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {User} from "../../../shared/types/user.ts";

export function UserForm({actionType, triggerStyle, user}: {
    actionType: 'add' | 'edit',
    triggerStyle?: object,
    user?: User
}) {
    const dispatch = useDispatch();
    const {open, name, avatar, details, id} = useSelector(userFormSelectors.formState);

    const setName = (name: string) => dispatch(userFormActions.setName(name));
    const setAvatar = (avatar: string) => dispatch(userFormActions.setAvatar(avatar));
    const setDetails = (details: string) => dispatch(userFormActions.setDetails(details));


    const [addUser, {isLoading: isAddUserLoading}] = useAddUserMutation();
    const [updateUser, {isLoading: isUpdateUserLoading}] = useUpdateUserMutation();


    const handleClickOpen = () => {
        dispatch(userFormActions.resetForm());
        if (user) {
            dispatch(userFormActions.setName(user.name));
            dispatch(userFormActions.setAvatar(user.avatar));
            dispatch(userFormActions.setDetails(user.details));
            dispatch(userFormActions.setId(user.id));
        }
        dispatch(userFormActions.openForm());
    };

    const handleClose = () => {
        dispatch(userFormActions.closeForm());
        dispatch(userFormActions.resetForm());
    };

    const editHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateUser({id, name, avatar, details});
        handleClose();
    };

    const addHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addUser({name, avatar, details});
        handleClose();
    };
    return (
        <>
            <Button
                style={triggerStyle}
                disabled={isAddUserLoading || isUpdateUserLoading}
                variant="contained" color={actionType === 'add' ? 'success' : 'secondary'}
                onClick={handleClickOpen}>
                {actionType === 'add' ? 'Add user' : 'Edit user'}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{!id ? `Add user ${name}` : `Edit ${name}`}</DialogTitle>
                <DialogContent>
                    <form onSubmit={!id ? addHandler : editHandler} id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="avatar"
                            name="avatar"
                            label="Avatar image URL"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <TextareaAutosize
                            autoFocus
                            minRows={4}
                            id="details"
                            name="details"
                            placeholder="User details"
                            style={{width: '100%', marginTop: '.5rem'}}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form"
                            disabled={isAddUserLoading || isUpdateUserLoading}>
                        {!id ? 'Add user' : 'Edit user'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};