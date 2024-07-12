import React from 'react'
import Footer from '../Nav-Foot/Footer'
import Navbar from '../Nav-Foot/Navbar'
import './Add.css'
const Add = () => {
  return (
    <div >
      <Navbar />
      <form className='add-form'>
        <h2 className=''>Add New Product</h2>
        <label>Title</label>
        <input className='upload' type='text' />
        <label>Image</label>
        <div className='file-upload'>
          <input type='file' accept='image/*' />
        </div>
        <button>Upload</button>
        <label>Description</label>
        <textarea type='text' />
        <button>New</button>
        <button>Cancel</button>
      </form>
      <Footer />
    </div>
  )
}

export default Add