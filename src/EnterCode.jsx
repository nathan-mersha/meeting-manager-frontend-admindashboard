
import { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import useAuth from './hooks/useAuth';
import { IoIosArrowDropright } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

function EnterCode() {
    const  navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(null);
    const { signIn, signUp } = useAuth();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data) => {   
    //   await enterCode(data.email, data.password);
       enterCode();
    }
  
    useEffect(() => {
      
      setData(watch('code'));
    
      return () => {
        return null;
      }
    }, [watch('code')]);
    
    
    const  enterCode = ()=>{
      navigate('/ChangePassword',{state:{"code":data, "email":location.state.email}});
    };
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
    <h1 className=" text-xl font-semibold ">Enter Code</h1>
    <div className='bg-blue-500 w-12 h-1 rounded-xl'></div>
    </div>
    <p className=" text-md">We've emailed a reset code to your email. Please
enter the code below</p>
      <div className="space-y-4  ">
        <label className="inline-block w-full">
          <input
            type="text"
            placeholder="code"
            className="input"
            onChange={(e)=>{
               console.log(e.target.value);    
                setData(e.target.value);
            
            
            }}
            {...register('code', { required: true })}
          />
          {errors.code && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a valid code.
            </p>
          )}
        </label>
      
      </div>
      <div className='flex items-center justify-between'>
      <button
        className={ `flex items-center justify-between rounded-2xl  ${data ? "bg-blue-500" :"bg-amber-700"}  p-3 text-white font-semibold`}
        type="submit"
      >
        <IoIosArrowDropright className="text-white w-5 h-5 mx-2"/>
        Proceed
      </button>

     

      </div>
    
     
    </form>
  </div>
  )
}

export default EnterCode