import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';
import axios from 'axios';
import { Buffer } from 'buffer';
import logo from '../Assets/logo.png';

const Detail = () => {
  const [item, setItem] = useState(null);
  const { orders } = useContext(RecoveryContext);
  const [edit, setEdit] = useState(false);
  const [edittitle, setEditTitle] = useState('');
  const [editdescription, setEditDescription] = useState('');
  const { id } = useParams();
  const { show } = useContext(RecoveryContext);
  const [shuffledItems, setShuffledItems] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;


  const handleEditClick = () => {
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEdit(true);
  };

  const shuffleArray = (array) => {
    const shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Update shuffled items when orders change
  useEffect(() => {
    if (orders.length) {
      setIsLoading(true); // Set loading to true
      setShuffledItems(shuffleArray(orders).slice(0, 4));
      setIsLoading(false); // Set loading to false once items are set
    }
  }, [orders]);

  const handleSaveClick = async () => {
    try {
      await axios.put(`${baseURL}/updateproduct/${id}`, { title: edittitle, description: editdescription });
      setItem({ ...item, title: edittitle, description: editdescription });
      setEdit(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/deleteById/${id}`);
      navigate('/Shopping', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const fetchAllResponses = async () => {
      try {
        const response = await axios.get(`${baseURL}/getById/${id}`);
        if (response.status === 200) {
          setItem(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchAllResponses();
  }, [id, baseURL]);

  return (
    <div className='detail-page'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <Navbar />
      <div className="detail-container">
          {isLoading ? (
            <div className="load-shop">
              <div className="loader-load-shop">
                <img src={logo} alt="Logo" />
              </div>
              <p>Loading...</p>
            </div>
          ) : (
            <div className="main-column">
              {item && (
                <div className="art-item">
                  <div className='art-img-container'>
                    <div className="art-scroll-handle">
                      <div className="thumbnails">
                        <label htmlFor="slide1">
                          {item.image ? (
                            <img className="thumbnail" loading="lazy"
                              src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data.data).toString('base64')}`}
                              alt={item.title}
                            />
                          ) : null}
                        </label>
                        {item.video && (
                          <label htmlFor="slide2">
                            <video className="thumbnail" autoPlay muted loop playsInline loading="lazy">
                              <source
                                src={`data:${item.video.contentType};base64,${Buffer.from(item.video.data.data).toString('base64')}`}
                                type={item.video.contentType}
                              />
                            </video>
                          </label>
                        )}
                      </div>
                      <div className="slider-buttons">
                        <div className="slider-container">
                          <input type="radio" name="slider" id="slide1" checked />
                          {item.video && <input type="radio" name="slider" id="slide2" />}
                          <div className="slides">
                            <div className="slide">
                              {item.image ? (
                                <img className="main-img" loading="lazy"
                                  src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data.data).toString('base64')}`}
                                  alt={item.title}
                                />
                              ) : null}
                            </div>
                            {item.video && (
                              <div className="slide">
                                <video className="main-img" autoPlay muted loop playsInline loading="lazy">
                                  <source
                                    src={`data:${item.video.contentType};base64,${Buffer.from(item.video.data.data).toString('base64')}`}
                                    type={item.video.contentType}
                                  />
                                </video>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          {show ? (
                            <button className='delete-from-cart-btn' onClick={handleDelete}>Delete</button>
                          ) : (
                            <button
                              className="buy-now-btn"
                              onClick={() => window.location.href = `/Contact`}>Order Now <i className="fa-solid fa-right-long"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {item && (
            <div className='art-details-text'>
              {edit ? (
                <div>
                  <input
                    className="art-name"
                    value={edittitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <h3>Description</h3>
                  <textarea
                    rows="20"
                    className="description-edit"
                    value={editdescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <div className='edit-flex-buttons'>
                    <button onClick={handleSaveClick} className="save-from-btn">Save</button>
                    <button className='cancel-to-btn' onClick={() => setEdit(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className='art-details-text'>
                  <div className="art-name">{item.title}</div>
                  <h3>Description</h3>
                  <div className="art-description">{item.description}</div>
                  {show && <button onClick={handleEditClick} className="add-to-cart-btn">Edit</button>}
                </div>
              )}
            </div>
          )}
        <div className='suggetion-display'>
          <div className="suggetion-showcase">
            {isLoading ? (
              <div className="load">
                <div className="loader-load">
                  <img src={logo} alt="Logo" />
                </div>
                <p>Loading...</p>
              </div>
            ) : (
              shuffledItems.map((suggestedItem) => (
                <div
                  className="suggetion-card"
                  key={suggestedItem._id}
                  onClick={() => window.location.href = `/Details/${suggestedItem._id}`}
                  role="button"
                  tabIndex={0}
                  onKeyPress={() => window.location.href = `/Details/${suggestedItem._id}`}
                >
                  <div className="suggetion-image-wrapper">
                    <img
                      src={`data:${suggestedItem.image.contentType};base64,${Buffer.from(suggestedItem.image.data).toString('base64')}`}
                      alt={suggestedItem.title}
                      className="suggetion-image"
                    />
                    <div className="overlay">
                      <button className="suggetion-details-button">View Details</button>
                    </div>
                  </div>
                  <h3 className="suggetion-title">{suggestedItem.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
