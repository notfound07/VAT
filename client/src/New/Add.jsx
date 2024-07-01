import React from 'react'
import Footer from '../Nav-Foot/Footer'
const Add = () => {
  return (
    <div>
        <h2 className=''>Add New Product</h2>
       <form>
        <label>Title</label>
        <input type='text'/>
        <label>Image</label>
        <input type='file'/>
        <button>Upload</button>
        <label>Description</label>
        <textarea type='text'/>
        <button>New</button>
        <button>Cancel</button>
       </form>
       <Footer/> 
    </div>
  )
}

export default Add