import React from 'react'

function AddUser({ handleClose }) {
  return (
    <div className='ml-8 mt-8 bg-white'>

        <button onClick={()=>handleClose()}>back</button>
    </div>
  )
}

export default AddUser