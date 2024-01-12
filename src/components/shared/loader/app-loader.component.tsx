import { CircularProgress } from "@mui/material";
import "./app-loader.component.scss";

interface AppLoaderProps {
  loading: boolean;
  children: JSX.Element;
}

const AppLoaderComponent = (props: AppLoaderProps) => {
  return (
    <>
      {props.loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default AppLoaderComponent;
