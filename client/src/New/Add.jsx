import React, { useContext } from 'react';
import Footer from '../Nav-Foot/Footer';
import axios from 'axios';
import { RecoveryContext } from '../App';
import Navbar from '../Nav-Foot/Navbar';
import './Add.css';

const Add = () => {
  const { title, setTitle, image, setImage, description, setDescription, video, setVideo } = useContext(RecoveryContext);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]); // Handle video upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('video', video);
  
    try {
      const response = await axios.post('http://localhost:3001/vat/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className='add-container'>
        <form className='add-form' onSubmit={handleSubmit}>
          <h1>Add New Product</h1>
          <h3>Title</h3>
          <input
            className='upload-title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h3>Image</h3>
          <div className='upload-box'>
            <div className='file-upload'>
              <input
                className='upload-file'
                type='file'
                name="image"
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
          </div>
          <h3>Video</h3>
          <div className='upload-box'>
            <div className='file-upload'>
              <input
                className='upload-file'
                type='file'
                name="video"
                accept='video/*'
                onChange={handleVideoChange} // Handle video input
              />
            </div>
          </div>
          <h3>Description</h3>
          <textarea
            type='text'
            className='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className='new-btn'>
            <button className='upnew-btn' type='submit'>
              <i className='fa-solid fa-shop'></i> New
            </button>
            <button className='upnew-btn' type='button' onClick={() => window.history.go(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Add;
