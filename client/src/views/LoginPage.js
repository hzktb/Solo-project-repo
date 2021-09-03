import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";

function LoginPage(props) {
  const { setSelected } = props;

  useEffect(() => {
    setSelected("login");
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
