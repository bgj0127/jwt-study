import { instance } from "./axios";
import { Cookies } from "react-cookie";

const Login = () => {
  const loginTest = async () => {
    const cookies = new Cookies();
    await instance
      .get("/auth/login")
      .then((res) => {
        cookies.set("accessToken", res.data.accessToken, { maxAge: 60 * 60 });
        cookies.set("refreshToken", res.data.refreshToken, { maxAge: 60 * 60 * 24 * 14 });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <button onClick={loginTest}>로그인하기</button>
      </div>
    </>
  );
};

export default Login;
