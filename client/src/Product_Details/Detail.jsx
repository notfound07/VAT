import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { CartContext } from '../Resources/CartContext';
import { RecoveryContext } from '../App';
import Review from './Review';
import axios from 'axios';
import { Buffer } from 'buffer';

const Detail = () => {
  const [item, setItem] = useState(null);
  const [edit,setEdit]=useState(false);
  const { id } = useParams();
  const {setTitle,setDescription,show,title,description,orders } = useContext(RecoveryContext);

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSaveClick=async()=>{
    try {
      await axios.put(`http://localhost:3001/vat/updateproduct/${id}`,{title,description})
      setEdit(false);
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    const fetchAllResponses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vat/getById/${id}`);
        if (response.status === 200) {
          setItem(response.data);
        }
      } catch (error) {
        console.error("Error fetching All responses:", error);
      }
    };  
    fetchAllResponses()
  }, [id]);
  // const [shuffledProducts, setShuffledProducts] = useState([]);
  // function shuffleArray(array) {
  //     let shuffledArray = array.slice(); // Create a copy of the array
  //     for (let i = shuffledArray.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  //     }
  //     return shuffledArray;
  //   }
  
  //   useEffect(() => {
  //       setShuffledProducts(shuffleArray(orders).slice(0, 3));
  //   }, []);
  const { addToCart } = useContext(CartContext);
  return (
    <div className='detail-page'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <Navbar />
      
      <div className="detail-container">
        <div className="main-column">
          {item && (
            <div className="art-item">
              <div className='art-img-btn'>
                <div className='art-image-detail'>
                  <img 
                    src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data.data).toString('base64')}`} 
                    alt={item.title} 
                  />
                </div>
                {show?(<button className='delete-from-cart-btn'>Delete</button>):( <div className="art-cart-buy-btn">
                  <button className="buy-now-btn" onClick={() => window.location.href = `/Order`}>Buy Now <i className="fa-solid fa-right-long"></i></button>
                  <button className="add-to-cart-btn" onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                </div>)}
              </div>
            </div>
          )}
        </div>
        {item && (
          <div className='art-details-text'>
            {edit ? (
              <div>
                <input 
                  className="art-name" 
                  value={item.title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
                <h3>Description</h3>
                <textarea 
                rows="20"
                  className="description-edit" 
                  value={item.description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
                <button onClick={handleSaveClick} className="add-to-cart-btn">Save</button>
                <button className='delete-from-cart-btn'>Cancel</button>
              </div>
            ) : (
              <div className='art-details-text'>
                <div className='"art-name"'>{item.title}</div>
                <h3>Description</h3>
                <div className="art-description" >{item.description}</div>
                {show?(<button onClick={handleEditClick} className="add-to-cart-btn">Edit</button>):('')}
              </div>
            )}
            <Review />
          </div>
        )}
      </div>
      {/* <div className="side-column">
          <h2>Suggestions</h2>
          <div className='suggestions-container'>
          {shuffledProducts.map((product) => (
            <div className="product-card" key={product.id} onClick={() => window.location.href = `/Details/${product.id}`}>
              <div className="product-image">
              <img src={`data:${product.image.contentType};base64,${Buffer.from(product.image.data).toString('base64')}`}  alt={product.title} />
              </div>
              <h3 className="product-title">{product.title}</h3>
            </div>
          ))}
          </div>
        </div> */}
      <Footer />
    </div>
  );
};

export default Detail;
