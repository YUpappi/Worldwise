import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { useEffect } from "react";
import PropTypes from "prop-types";
import SpinnerFullPage from "../Components/SpinnerFullPage";

function ProtectedRoutes({ children }) {
  const { isAuthenticated, isAuthReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthReady && !isAuthenticated) navigate("/");
  }, [isAuthReady, isAuthenticated, navigate]);

  if (!isAuthReady) return <SpinnerFullPage />;

  return <div>{isAuthenticated ? children : null}</div>;
}

export default ProtectedRoutes;
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
