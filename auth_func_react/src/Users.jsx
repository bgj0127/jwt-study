import { useEffect, useState } from "react";
import { instance } from "./axios";

const Users = () => {
  const [save, setSave] = useState(false);
  const getUsers = async () => {
    await instance
      .get("user/users")
      .then(() => {
        setSave(true);
      })
      .catch(() => setSave(false));
  };

  useEffect(() => {
    const getUsers = async () => {
      await instance
        .get("user/users")
        .then(() => {
          setSave(true);
        })
        .catch(() => setSave(false));
    };
    getUsers();
  }, []);
  return (
    <>
      <div>
        <button onClick={getUsers}>유저 리스트 불러오기</button>
        {save ? <p>성공</p> : <p>실패</p>}
      </div>
    </>
  );
};

export default Users;
