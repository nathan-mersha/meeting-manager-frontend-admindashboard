
import { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import useAuth from './hooks/useAuth';
import { FaSave } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

function ChangePassword() {
    const  navigate = useNavigate();
  const [login, setLogin] = useState(false)
  const location = useLocation();

  const [newPassword, setNewPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const {  enterCodeAndChangePassword } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
      if(data.ChangePassword!== data.ConfirmPassword){
        alert("Password and Confirm Password doesn't match")
        return ;
      }

      
    console.log(location.state.email,location.state.code, data.newPassword)
    await enterCodeAndChangePassword(location.state.email,location.state.code, data.password);
    
  }

useEffect(() => {
    
    setNewPassword(watch('newPassword'));
    setConfirmPassword(watch('confirmPassword'));

  return () => {
    return null;
  }
}, [watch('newPassword'),watch('confirmPassword')]);
  return (
    <div className=" flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
     
     
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="  mt-24 space-y-8 rounded  py-10 px-6 md:mt-0 md:max-w-md md:px-14"
    >
      <div className='flex items-center justify-center'>

      <img
      src="https://www.carlogos.org/logo/MG-logo-red-2010-1920x1080.png"
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
  <h1 className=" text-xl font-semibold ">Set new password</h1>
  <div className='bg-blue-500 w-20 h-1 rounded-xl'></div>
  </div>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <input
            type="password"
            placeholder="New Password"
            className="input"
            {...register('newPassword', { required: true })}
          />
          {errors.newPassword && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Your password must contain between 4 and 60 characters.
            </p>
          )}
        </label>
        <label className="inline-block w-full">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            {...register('confirmPassword', { required: true } )}
          />

          {errors.confirmPassword && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Your password must be the same.
            </p>
          )}
        </label>
      </div>
      <div className='flex items-center justify-between'>
      <button
        className={` flex items-center justify-between rounded-2xl ${newPassword && confirmPassword ?"bg-blue-500":"bg-amber-700"} p-3 text-white font-semibold`}
        onClick={() => setLogin(true)}
      >
        <FaSave className="text-white w-5 h-5 mx-2"/>
        save
      </button>

    

      </div>
    
     
    </form>
  </div>
  )
}

export default ChangePassword