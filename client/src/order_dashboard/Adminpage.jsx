import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import './adminpage.css';
import Select from 'react-select';
import Adminnavbar from './Adminnavbar';
import DataFinder from '../apis/DataFinder';
function Adminpage() {
  const [entries, setEntries] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState();
  const [branchOptions, setBranchOptions] = useState([]);
  const [filteredDatas, setFilteredData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [show,setShow]=useState();
  useEffect(() => {
    const fetchAllResponses = async () => {
      try {
        const response = await DataFinder.get("/");
        if (response.status === 200) {
          // Return the array of feedback responses
          setEntries(response.data);
          localStorage.setItem('AllResponses', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching All responses:", error);
      }
    };
    const cachedRecords = localStorage.getItem('AllResponses');
    if (cachedRecords) {
      // If cached records exist, parse and set them into state
      setEntries(JSON.parse(cachedRecords));
    } else {
      // If no cached records, fetch them
      fetchAllResponses();
    }
    const interval = setInterval(() => {
      fetchAllResponses()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    let newBranchOptions = [];
    if (selectedOption) {
      switch (selectedOption.value) {
        case "Aslam Chicken":
          newBranchOptions = [
            { value: "ChandniChowk", label: "Chandni Chowk" },
            { value: "BatlaHouse", label: "Batla House" }
          ];
          break;
        case "Bukhara":
          newBranchOptions = [
            { value: "ITCMaurya", label: "ITC Maurya" }
          ];
          break;
        case "Gulati":
          newBranchOptions = [
            { value: "Pandara", label: "Pandara" }
          ];
          break;
        case "Karim's":
          newBranchOptions = [
            { value: "GreenPark", label: "Green Park" },
            { value: "Jasola", label: "Jasola" },
            { value: "Nizamuddin", label: "Nizamuddin" },
            { value: "DLFAvenue", label: "DLF Avenue, Saket" },
            { value: "JamaMasjid", label: "Jama Masjid" }
          ];
          break;
        case "Rajender Da Dhaba":
          newBranchOptions = [
            { value: "Safdarjung", label: "Safdarjung Enclave" }
          ];
          break;
        case "Sagar Ratna":
          newBranchOptions = [
            { value: "DefenceColony", label: "Defence Colony" },
            { value: "PreetVihar", label: "Preet Vihar" },
            { value: "MasjidMoth", label: "Masjid Moth" },
            { value: "NarainaVihar", label: "Naraina Vihar" },
            { value: "PaschimVihar", label: "Paschim Vihar" }
          ];
          break;
        case "Sandoz":
          newBranchOptions = [
            { value: "ConnaughtPlace", label: "Connaught Place" },
            { value: "KarolBagh", label: "Karol Bagh" },
            { value: "LajpatNagar", label: "Lajpat Nagar" },
            { value: "RajouriGarden", label: "Rajouri Garden" },
            { value: "Jasola", label: "Jasola" }
          ];
          break;
        case "Varq":
          newBranchOptions = [
            { value: "TajMahal", label: "Taj Mahal Hotel" }
          ];
          break;
        default:
          newBranchOptions = [];
      }
    }
    setBranchOptions(newBranchOptions);
    setSelectedBranch(null);
  };

  const handleBranchChange = (selectedBranch) => {
    setSelectedBranch(selectedBranch);
  };
  const handleFilter = () => {
    const filterData=filtered.filter(item=>{
      return item.Restraunt.includes(selectedOption.value) && 
      item.BranchName.includes(selectedBranch.value)
    })
    setFilteredData(filterData);
    setShow(true);
  };
  const filtered = (selectedOption && selectedBranch)
      ? entries.filter(item =>
          item.Restraunt.includes(selectedOption.value) &&
          item.BranchName.includes(selectedBranch.value)
        ):filteredItems
  //filter by date
  const handleDate = () => {
    const today = new Date();
    const filteredItemsByDate = filtered.filter(item => {
      const itemDate = new Date(item.date);
      return today.getFullYear() === itemDate.getFullYear() &&
      today.getMonth() === itemDate.getMonth() &&
      today.getDate() === itemDate.getDate();
    });
    setFilteredItems(filteredItemsByDate);
    setShow(false);
  };
  useEffect(() => {
    handleFilter(); // Apply restaurant and branch filter
    handleDate();   // Apply date filter
  }, []);
  return (
    <div>
      <Adminnavbar />
      <br />
      <h1 style={{ marginTop: 70, textAlign: 'center' }} >Order Details</h1>
      <div className='fliter'>
      <Select
          className='search-bar'
          value={selectedOption}
          onChange={handleSelectChange}
          options={[
            { value: "Aslam Chicken", label: "Aslam Chicken" },
            { value: "Bukhara", label: "Bukhara" },
            { value: "Gulati", label: "Gulati" },
            { value: "Karim's", label: "Karim's" },
            { value: "Rajender Da Dhaba", label: "Rajender Da Dhaba" },
            { value: "Sagar Ratna", label: "Sagar Ratna" },
            { value: "Sandoz", label: "Sandoz" },
            { value: "Varq", label: "Varq" }
          ]}
          placeholder="Search Restaurants..."
        />
        <Select
          className='search-bar'
          value={selectedBranch}
          onChange={handleBranchChange}
          options={branchOptions}
          placeholder="Search Branch..."
        />
                <button onClick={handleFilter} className='search_today'>Filter</button>
        <button onClick={handleDate} className='search_today'>Today</button>
      </div>
      <div>
        <ul class="order-recipt">
          {show?(
            filteredDatas.slice().reverse().map(item => (
              <li key={item.id} className="flex-item">
                <div className="order-cards">
                  <div className="order-details" id="target">
                    <h2 className="restaurant-name">{item.Restraunt}</h2>
                    <h3 className="orderS">Order Summary</h3>
                    <hr />
                    <p className="order-info">Branch: {item.BranchName}</p>
                    <p className="order-info">OrderId: #{item.OrderId}</p>
                    <p className="order-info">Seats: {item.Seat}</p>
                    <p className="order-info">Items: {item.item}</p>
                    <p className="order-info">Time: {item.time}</p>
                    <p className="order-info">Reservation Date: {item.date?.substring(0, 16)}</p>
                    <hr />
                  </div>
                  <div className="user-details">
                    <h2>Customer Details</h2>
                    <div className="d-row">
                      <div>
                        <p className="order-info">Email: {item.UserEmail}</p>
                        <p className="order-info">Contact: {item.contact}</p>
                      </div>
                    </div>
                    <p className="order-time">{moment(item.bookedOn).fromNow()}</p>
                  </div>
                </div>
              </li>
            )
            )
          ):
         (filteredItems.slice().reverse().map(item => (
          <li key={item.id} className="flex-item">
            <div className="order-cards">
              <div className="order-details" id="target">
                <h2 className="restaurant-name">{item.Restraunt}</h2>
                <h3 className="orderS">Order Summary</h3>
                <hr />
                <p className="order-info">Branch: {item.BranchName}</p>
                <p className="order-info">OrderId: #{item.OrderId}</p>
                <p className="order-info">Seats: {item.Seat}</p>
                <p className="order-info">Items: {item.item}</p>
                <p className="order-info">Time: {item.time}</p>
                <p className="order-info">Reservation Date: {item.date?.substring(0, 16)}</p>
                <hr />
              </div>
              <div className="user-details">
                <h2>Customer Details</h2>
                <div className="d-row">
                  <div>
                    <p className="order-info">Email: {item.UserEmail}</p>
                    <p className="order-info">Contact: {item.contact}</p>
                  </div>
                </div>
                <p className="order-time">{moment(item.bookedOn).fromNow()}</p>
              </div>
            </div>
          </li>
        )
        )
        )}
       {!show && selectedOption === null &&(
      <li key="select-option" className="msg">
        Please select a restaurant and branch.
      </li>
    )}
        </ul>
      </div>
    </div>
  )
}

export default Adminpage