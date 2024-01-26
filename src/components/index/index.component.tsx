import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IndexComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);
  return <></>;
};

export default IndexComponent;
