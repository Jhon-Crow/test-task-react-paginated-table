import {Pagination} from "@mui/material";
import {useGetTotalPagesCountQuery} from "../../../app/redux/mockApi.ts";
import {ErrorAlert} from "../../../shared/ErrorAlert/ui/ErrorAlert.tsx";
import {useNavigate} from "react-router-dom";

export interface PaginationMyProps {
    page: number;
}

export const PaginationMy = ({page}: PaginationMyProps) => {
    const navigate = useNavigate();
    const {data, error} = useGetTotalPagesCountQuery();
    // @ts-ignore
    const handleChange = (event, newPage) => {
        navigate(`/users/${newPage}`);
    };
    if (!data) return null;
    if (error) { // @ts-ignore
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