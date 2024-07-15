import React from 'react'
import Footer from '../Nav-Foot/Footer'
import Navbar from '../Nav-Foot/Navbar'
import './Add.css'
const Add = () => {
  return (
    <div >
      <Navbar />
      <div className='add-container'>
        <form className='add-form'>
          <h1>Add New Product</h1>
          <h3>Title</h3>
          <input className='upload-title' type='text' />
          <h3>Image</h3>
          <div className='upload-box'>
            <div className='file-upload'>
              <input className='upload-file' type='file' accept='image/*' />
            </div>
            <button className='upnew-btn'><i class="fa-solid fa-upload"></i> Upload</button>
          </div>
          <h3>Description</h3>
          <textarea type='text' className='description' />
          <div className='new-btn'>
            <button className='upnew-btn'><i class="fa-solid fa-shop"></i> New</button>
            <button className='upnew-btn'>Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Add