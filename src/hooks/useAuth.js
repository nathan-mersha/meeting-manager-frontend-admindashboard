import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, fetchUser } from "../utils/fetchUser";

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
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = fetchToken();
    const user = fetchUser();
    setInitialLoading(false);
    if (!user && !token) {
      navigate("/login", { replace: true });
    } else {
      setUser(user);
      navigate("/", { replace: true });
    }
  }, [fetchToken()]);

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
      headers: { "content-type": "application/json" ,"accept": "application/json"},
      body: JSON.stringify({
        email: email,
        reset_code: code,
        new_password: newPassword
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
    const response = await fetch(
      homeUrl + "server/user/login",
      requestOptions
    )
    
    .then(async (response) => {
      const json = await response.json();
      
      if (json["token"]) {
        localStorage.setItem("token", JSON.stringify(json["token"]));
        localStorage.setItem("user", JSON.stringify(json["user"]));
        setUser(json["user"]);
        navigate("/", { replace: true });
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
      forgotPassword,
      enterCodeAndChangePassword,
    }),
    [user, loading, error]
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
