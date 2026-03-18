import { useEffect, useReducer } from "react";
import { authContext } from "../utils/useAuth";
import PropTypes from "prop-types";
import supabase from "../services/supabase";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthReady: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "auth/loaded":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: Boolean(action.payload),
        isAuthReady: true,
      };
    case "logout/user":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isAuthReady: true,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isAuthReady }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (error) {
        dispatch({ type: "auth/loaded", payload: null });
        return;
      }
      dispatch({ type: "auth/loaded", payload: data?.session?.user ?? null });
    }

    loadSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch({ type: "auth/loaded", payload: session?.user ?? null });
    });

    return () => {
      isMounted = false;
      data?.subscription?.unsubscribe();
    };
  }, []);

  async function logOut() {
    await supabase.auth.signOut();
    dispatch({ type: "logout/user" });
  }

  return (
    <authContext.Provider
      value={{ user, isAuthenticated, isAuthReady, logOut }}
    >
      {children}
    </authContext.Provider>
  );
}

export { AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
