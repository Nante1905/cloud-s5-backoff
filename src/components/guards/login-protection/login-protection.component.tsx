import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProtectionProps {
  children: React.ReactNode;
}

const LoginProtection = (props: LoginProtectionProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          showMessage: true,
        },
      });
    }
  }, []);

  return <>{props.children}</>;
};

export default LoginProtection;
