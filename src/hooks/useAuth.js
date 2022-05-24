

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})


export const AuthProvider = ({ children }) => {
//   const router = useRouter()
const  navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(false)
  const [loading, setLoading] = useState(false)
//   useEffect(
//     ()=>{

//     }      
      
//       ),
//     []
//   );

  const signUp =  (email, password) => {
    setLoading(true);

    navigate('/',{ replace: true });
    // await createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     setUser(userCredential.user)
    //     router.push('/')
    //     setLoading(false)
    //   })
    //   .catch((error) => alert(error.message))
    //   .finally(() => setLoading(false))
 
    }
  const signIn =  (email, password) => {
    setLoading(true);
    navigate('/',{ replace: true });
    
    // await signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     setUser(userCredential.user)
    //     router.push('/')
    //     setLoading(false)
    //   })
    //   .catch((error) => alert(error.message))
    //   .finally(() => setLoading(false))
  }
  const logout = async () => {
    setLoading(true)
    // await signOut(auth)
    //   .then(() => {
    //     setUser(null)
    //   })
    //   .catch((error) => alert(error.message))
    //   .finally(() => setLoading(false))
  }
  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, error, loading, logout }),
    [user, loading, error]
  )
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}
// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext)
}
