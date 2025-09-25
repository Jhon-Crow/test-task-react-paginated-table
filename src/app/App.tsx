import {useState} from "react";
import {UsersList} from "../entities/User/UsersList/ui/UsersList.tsx";
import {PaginationMy} from "../features/Pagination/ui/PaginationMy.tsx";

function App() {
    const [page, setPage] = useState(1);
  return (
    <div>
        <UsersList page={page} />
        <PaginationMy  page={page} setPage={setPage}/>
    </div>
  )
}

export default App
