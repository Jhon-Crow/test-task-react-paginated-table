import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {useAddUserMutation, useUpdateUserMutation} from "../../../app/redux/mockApi.ts";
import {TextareaAutosize} from "@mui/material";

export function UserForm({actionType, id, triggerStyle}: {actionType: 'add' | 'edit', id?: string, triggerStyle?: object}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [details, setDetails] = useState('');

    const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation();
    const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (actionType === 'add') {
            addUser({name, avatar, details});
        } else if (actionType === 'edit' && id) {
            updateUser({id, name, avatar, details});
        }
        handleClose();
    };

    return (
        <>
            <Button
                style={triggerStyle}
                disabled={isAddUserLoading || isUpdateUserLoading}
                variant="contained" color={actionType === 'add' ? 'success' : 'secondary'} onClick={handleClickOpen}>
               {actionType === 'add' ? 'Add user' : 'Edit user' }
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
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
                    <Button type="submit" form="subscription-form" disabled={isAddUserLoading || isUpdateUserLoading}>
                        {actionType === 'add' ? 'Add user' : 'Edit user' }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
