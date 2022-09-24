import React, {useEffect,useState} from "react";
import BoardAPI from './api/board';
import UserAPI from './api/user';
import Board from './containers/Board';
import {Routes, Route} from 'react-router-dom';


const App = () => {

  const [columns, updateColumns] = useState();
  const [users, updateUsers] = useState();
  useEffect(() => {
    const getColumns = async () => {
      updateColumns((await BoardAPI.getBoardColumns()).data);
    }
    const getUsers = async () => {
      updateUsers((await UserAPI.getUsers()).data);
    }
    getColumns();
    getUsers();
  }, []);

  return (
    <Routes>
      <Route path="/"
             element={<Board
                         boardColumns={columns}
                         users={users}
                       />}
      />
    </Routes>
  );
}

export default App;
