import {useState} from "react";
import {UsersList} from "../entities/User/UsersList/ui/UsersList.tsx";

function App() {
    const [page, setPage] = useState(1);
  return (
    <div>
        <UsersList page={page}/>
    </div>
  )
}

export default App
