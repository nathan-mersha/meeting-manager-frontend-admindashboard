import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, fetchUser } from "../utils/fetchUser";
import { getConfig } from "./useConfig";

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }) => {
  //   const router = useRouter()
  const homeUrl = "https://mmserver.ml/";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = fetchToken();
    const user = fetchUser();
    setInitialLoading(false);
    if (!user || !token) {
      navigate("/login", { replace: true });
    } else {
      setUser(user);
      setToken(token);
      // navigate("/", { replace: true });
    }
  }, [fetchToken()]);

  useEffect(() => {
    // if(isMount.current)     return;
    if (!token) return;
    const configGet = async () => {
      const configData = await getConfig();
      if (configData) {
        setConfig(configData);
        // const configUpdate= await updateConfig(configData);
      } else {
        logout();
      }
    };

    configGet();
    // isMount.current=true;
  }, [token]);

  const addUser = async (user) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json", token: token },
      body: JSON.stringify(user),
    };
    return fetch(homeUrl + "server/user/admin/create", requestOptions)
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json["companyName"]) {
          return "done";
        } else {
          return "error";
          // alert(json["detail"]);
        }
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const updateUser = async (user) => {
    setLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: { "content-type": "application/json", token: token },
      body: JSON.stringify(user),
    };
    return fetch(
      homeUrl + "server/user/admin/update_user/" + user.id,
      requestOptions
    )
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json["message"]) {
          return "done";
        } else {
          return "error";
          // alert(json["detail"]);
        }
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signUp = (email, password) => {
    setLoading(true);

    navigate("/", { replace: true });
    // localStorage.setItem('user' ,JSON.stringify(response.profileObj));

    // await createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     setUser(userCredential.user)
    //     router.push('/')
    //     setLoading(false)
    //   })
    //   .catch((error) => alert(error.message))
    //   .finally(() => setLoading(false))
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email }),
    };
    await fetch(homeUrl + "server/user/forgot_password", requestOptions)
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json["message"]) {
          navigate("/EnterCode", { state: { email } });
        } else {
          console.log(json);

          alert(json["detail"]);
        }
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const enterCodeAndChangePassword = async (email, code, newPassword) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: "" + email,
        reset_code: "" + code,
        new_password: "" + newPassword,
      }),
    };
    await fetch(homeUrl + "server/user/reset_password", requestOptions)
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json["message"]) {
          navigate("/Login");
        } else {
          console.log(json);

          alert(json["detail"]);
        }
      })

      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const signIn = async (email, password) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ emailOrPhoneNumber: email, password: password }),
    };
    await fetch(homeUrl + "server/user/login", requestOptions)
      .then(async (response) => {
        const json = await response.json();

        if (json["token"]) {
          if (json["user"]["userType"] === "user") {
            alert("You are not authorized to login to this admin panel");
          } else {
            localStorage.setItem("token", JSON.stringify(json["token"]));
            localStorage.setItem("user", JSON.stringify(json["user"]));
            setUser(json["user"]);
            navigate("/", { replace: true });
          }
        } else {
          console.log(json);

          alert(json["detail"]);
        }
      })

      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const logout = async () => {
    setLoading(true);
    localStorage.clear();
    setLoading(false);
  };
  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      error,
      loading,
      logout,
      token,
      forgotPassword,
      config,
      updateUser,
      addUser,
      enterCodeAndChangePassword,
    }),
    [user, token, loading, error, config]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};
// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
