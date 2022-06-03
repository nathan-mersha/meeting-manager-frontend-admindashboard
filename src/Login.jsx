
import { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import useAuth from './hooks/useAuth';
import { FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
function Login() {
const  navigate = useNavigate();
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (login) {
       await signIn(data.email, data.password)
    } else {
      // await signUp(data.email, data.password)
    }
  }
const  forgotPassword = ()=>{
  navigate('/ForgotPassword');
};
useEffect(() => {
    
  setEmail(watch('email'));
  setPassword(watch('password'));

  return () => {
    return null;
  }
}, [watch('email'),watch('password')]);
  return (
    <div className=" flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
     
     
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  mt-24 space-y-8 rounded  py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <div className='flex items-center justify-center'>

        <img
        src="../arrange_BLUE_logo.svg"
        className=" cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        alt="sa"
        height={150}
      />
        </div>
   
      <div className='flex flex-col items-end'>
        <div className='bg-blue-500 w-40 h-2 rounded-xl'></div>
      <h1 className=" text-2xl  font-bold">Arrange control board</h1>
      </div>
      <div className='space-y-1'>
    <h1 className=" text-xl font-semibold ">Log In</h1>
    <div className='bg-blue-500 w-10 h-1 rounded-xl'></div>
    </div>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true })}
            />

            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <div className='flex items-center justify-between'>
        <button
            type="submit"
          className={` flex items-center justify-between rounded-2xl ${email && password ?"bg-blue-500":"bg-amber-700"} p-3 text-white font-semibold`}
          onClick={() => setLogin(true)}
        >
          <FiLogIn className="text-white w-5 h-5 mx-2"/>
          Login
        </button>

        <div className="text-[gray] pl-4 ">
         
          <button
            className="text-blue-800 hover:underline"
            onClick={() => forgotPassword()}
          >
            {' '}
            Forgot Password?
          </button>
        </div>

        </div>
      
       
      </form>
    </div>
  )
}

export default Login
