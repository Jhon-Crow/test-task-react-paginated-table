import {useState} from "react";
import {UsersList} from "../entities/User/UsersList/ui/UsersList.tsx";
import {PaginationMy} from "../features/Pagination/ui/PaginationMy.tsx";
import {UserForm} from "../features/UserForm/ui/UserForm.tsx";

function App() {
    const [page, setPage] = useState(1);
  return (
    <div>
        <UserForm actionType={'add'} triggerStyle={
            {position: 'fixed', bottom: '20px', right: '20px'}
        }/>
        <UsersList page={page} />
        <PaginationMy  page={page} setPage={setPage}/>
    </div>
  )
}

export default App
