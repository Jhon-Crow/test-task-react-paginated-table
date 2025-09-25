import {Pagination} from "@mui/material";
import {useGetTotalPagesCountQuery} from "../../../app/redux/mockApi.ts";
import {ErrorAlert} from "../../../shared/ErrorAlert/ui/ErrorAlert.tsx";

export interface PaginationMyProps {
    page: number;
    setPage: (page: number) => void;
}

export const PaginationMy = ({page, setPage}: PaginationMyProps) => {

    const {data, error} = useGetTotalPagesCountQuery();
    // @ts-ignore
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
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