import {Pagination} from "@mui/material";
import {ErrorAlert} from "../../../shared/ErrorAlert/ui/ErrorAlert.tsx";
import {useNavigate} from "react-router-dom";
import type {SerializedError} from "@reduxjs/toolkit";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export interface PaginationMyProps {
    page: number;
    data?: number;
    error?: FetchBaseQueryError | SerializedError;
}

export const PaginationMy = ({page, data, error}: PaginationMyProps) => {
    const navigate = useNavigate();
    // @ts-expect-error event is never be used
    const handleChange = (event, newPage) => {
        navigate(`/users/${newPage}`);
    };
    if (!data) return null;
    if (error) { // @ts-expect-error Property 'status' & 'data' does not exist on type 'FetchBaseQueryError | SerializedError'
        return <ErrorAlert text={`${error.status} ${error.data}`}/>;
    }
    return (
        <div>
            <Pagination
                count={data}
                page={page}
                variant="outlined"
                color="primary"
                onChange={handleChange}
            />
        </div>
    );
};