import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../nav-foot/Navbar';
import Footer from '../nav-foot/Footer';
import { data, tableset } from '../components/Restraunts';
import './Hotelpage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../user/AuthContext';
import DataFinder from '../apis/DataFinder';

var totalseats = 52;
var totalno;
function Gulati() {
  const params = useParams();
  const id = params.id;
  const resturant = data.filter(res => res.id === id);
  const bname = params.bname;
  const branches = tableset.filter(branch => branch.bname === bname);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [restaurantName, setRestaurantName] = useState(null);
  const [date, setDate] = useState();
  const [seats, setseats] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [disabledSlots, setDisabledSlots] = useState([]);
  const initialSelection = useRef(true);
  const { isLoggedIn } = useAuth();

  const areAllSelectionsMade = () => {
    return date && selectedValue && seats > 0;
  };

  //timing disable accordingly

  const seatsubmit = () => {
    if (isLoggedIn) {
      let totalno = totalseats - seats;

      if (totalno >= 0) {
        // Update total seats and navigate
        navigate("/OrderPopup");
      } else {
        alert("Sorry, Booking is Full \n SEE YOU NEXT TIME");
      }
      localStorage.setItem("restraunt", restaurantName);
      localStorage.setItem("branch name", bname);
      localStorage.setItem("time", selectedValue);
      localStorage.setItem("date", date);
      localStorage.setItem("seats", seats);
    } else {
      // Handle case when user is not logged in, perhaps by prompting them to login
      alert("Please login to confirm seats.");
    }
  }

  const onChange = (date) => {
    setDate(date);
    setShowCalendar(false);
  }
  const handleClick = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    // Find the restaurant data corresponding to the id
    const restaurant = data.find(res => res.id === params.id);
    if (restaurant) {
      setRestaurantName(restaurant.name);
    }
  }, [params.id]);

  const timeSlots = [
    "8am-9am", "9am-10am", "10am-11am", "11am-12pm",
    "12pm-1pm", "1pm-2pm", "2pm-3pm", "3pm-4pm",
    "4pm-5pm", "5pm-6pm", "6pm-7pm", "7pm-8pm"
  ];
  useEffect(() => {
    const date_t = new Date();
    let hour = date_t.getHours();
    const isPM = hour >= 12;
    hour = hour % 12 || 12; // Converts 0 to 12 for midnight and handles PM conversion
    const showTime = `${hour}${isPM ? 'pm' : 'am'}`;
    const selecteddate = new Date(date);
    let matchFound = false;
    const isSameDay = date_t.getFullYear() === selecteddate.getFullYear() &&
      date_t.getMonth() === selecteddate.getMonth() &&
      date_t.getDate() === selecteddate.getDate();

    if (isSameDay && showTime) {
      const disabledSlots = [];
      for (let i = 0; i < timeSlots.length; i++) {
        const [start, end] = timeSlots[i].split('-');
        const starts_time = start.trim() // Trim to remove any leading or trailing spaces
        if (starts_time === showTime) {
          matchFound = true;
          // Disable the matched slot and all previous slots
          disabledSlots.push(...timeSlots.slice(0, i + 1));
          break; // Exit loop once match is found
        }
      }
      if (!matchFound) {
      }
      setDisabledSlots(disabledSlots);
    }
    else {
      setDisabledSlots([]);
    }
  }, [date, timeSlots]);


  // Fetch bookings whenever selectedDate or selectedTime changes

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

  useEffect(() => {
    fetchAllResponses()
  }, [])

  const groupOrdersByDate = () => {
    const groupedOrders = {};
    entries.forEach(order => {
      const rest_name = order.Restraunt;
      const branch = order.BranchName;
      const orderDate = new Date(order.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const inputDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const seatbooked = [order.id];
      const orderTime = order.time;
      if (rest_name === restaurantName && branch === bname && orderDate === inputDate && orderTime === selectedValue) {
        if (!groupedOrders[orderDate]) {
          groupedOrders[orderDate] = [];
        }
        groupedOrders[orderDate].push(order);
        console.log(seatbooked);
        const seatElements = document.querySelectorAll(`[id="${seatbooked}"]`);
        if (seatElements.length > 0) {
          seatElements.forEach(seatEl => {
            seatEl.classList.add("disabled"); // a CSS class to disable the seat
          })
        };
      }
    });
    return { groupedOrders };
  };
  const isSeatDisabled = (id) => {
    const seatElement = document.getElementById(id);
    return seatElement && seatElement.classList.contains("disabled");
  };
  const TableSelected = (id, seat_value) => {
    if (isSeatDisabled(id)) {
      return false; // Seat is disabled, return false
    }
    setSelectedSeat((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(id)) {
        // If already selected, remove it (deselect)
        setseats(prevTotalSeats => prevTotalSeats - seat_value);
        localStorage.removeItem("id");
        return prevSelectedSeats.filter(seat => seat !== id);
      } else {
        // If not selected, add it to the array (select)
        // Here, you could also enforce a limit on the number of selectable seats
        setseats(prevTotalSeats => prevTotalSeats + seat_value);
        localStorage.setItem("id", id);
        return [...prevSelectedSeats, id];
      }
    });
    return true; // Seat is not disabled, return true
  };


  useEffect(() => {
    groupOrdersByDate()
  })

  const seatStyle = (seatId) => ({
    backgroundColor: selectedSeat.includes(seatId) ? 'green' : '',
  });
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };


  return (
    <div>
      <Navbar />
      <br></br>
      {resturant.map((item, index) => {
        return (
          <div className='container' key={index}>
            <div className="branch-container">
              <div className='branch'>
                <p className='b'>Branches</p>
                <nav>
                  <NavLink activeclassName='active' className='branch_sub' to="/Gulati/8/Pandara">{item.b1}</NavLink>
                </nav>
              </div>
            </div>
            <div className="details-container">
              <h2>{item.name}</h2>
              <div className='fliter-time-date'>
                <div>
                  <button className='calender' onClick={handleClick}>{showCalendar ? 'Select the date' : (date ? date.toDateString() : "-- Select the date --")}
                    {/* show the selected date on the button */}</button>
                  {showCalendar && (
                    <Calendar
                      onChange={onChange}
                      minDate={new Date()}
                      value={date || new Date()}
                    />
                  )}
                </div>
                <div>
                <select className="combobox" id="comboBox" value={selectedValue} onChange={handleChange} disabled={!date}>
                    <option value="">-- Select a timing --</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot} disabled={disabledSlots.includes(slot)}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='hotel-design'>
                <div className='face back-face'>
                  <div className='seating'>
                    <div className='eight-flex'>
                      <div className='eight-one'>
                        <div className='order-booking' onClick={() => TableSelected('seatA', 8)}>
                          <div className='top-flex'>
                            <div className='chair-top' id="seatA" style={seatStyle('seatA')}></div>
                            <div className='chair-top' id="seatA" style={seatStyle('seatA')}></div>
                            <div className='chair-top' id="seatA" style={seatStyle('seatA')}></div>
                          </div>
                          <div className='flex'>
                            <div>
                              <div className='chair-left' id="seatA" style={seatStyle('seatA')}></div>
                            </div>
                            <div>
                              <div className='table-eight' id="seatA" style={seatStyle('seatA')}></div>
                            </div>
                            <div>
                              <div className='chair-right' id="seatA" style={seatStyle('seatA')}></div>
                            </div>
                          </div>
                          <div className='bottom-flex'>
                            <div className='chair-bottom' id="seatA" style={seatStyle('seatA')}></div>
                            <div className='chair-bottom' id="seatA" style={seatStyle('seatA')}></div>
                            <div className='chair-bottom' id="seatA" style={seatStyle('seatA')}></div>
                          </div>
                        </div>
                        <div className='wall-one'></div>
                        <div className='order-booking' onClick={() => TableSelected('seatE', 8)}>
                          <div className='top-flex'>
                            <div className='chair-top' id="seatE" style={seatStyle('seatE')}></div>
                            <div className='chair-top' id="seatE" style={seatStyle('seatE')}></div>
                            <div className='chair-top' id="seatE" style={seatStyle('seatE')}></div>
                          </div>
                          <div className='flex'>
                            <div>
                              <div className='chair-left' id="seatE" style={seatStyle('seatE')}></div>
                            </div>
                            <div>
                              <div className='table-eight' id="seatE" style={seatStyle('seatE')}></div>
                            </div>
                            <div>
                              <div className='chair-right' id="seatE" style={seatStyle('seatE')}></div>
                            </div>
                          </div>
                          <div className='bottom-flex'>
                            <div className='chair-bottom' id="seatE" style={seatStyle('seatE')}></div>
                            <div className='chair-bottom' id="seatE" style={seatStyle('seatE')}></div>
                            <div className='chair-bottom' id="seatE" style={seatStyle('seatE')}></div>
                          </div>
                        </div>
                      </div>
                      <div className='gate'></div>
                      <div className='eight-two'>
                        <div className='order-booking' onClick={() => TableSelected('seatI', 8)}>
                          <div className='top-flex'>
                            <div className='chair-top' id="seatI" style={seatStyle('seatI')}></div>
                            <div className='chair-top' id="seatI" style={seatStyle('seatI')}></div>
                            <div className='chair-top' id="seatI" style={seatStyle('seatI')}></div>
                          </div>
                          <div className='flex'>
                            <div>
                              <div className='chair-left' id="seatI" style={seatStyle('seatI')}></div>
                            </div>
                            <div>
                              <div className='table-eight' id="seatI" style={seatStyle('seatI')}></div>
                            </div>
                            <div>
                              <div className='chair-right' id="seatI" style={seatStyle('seatI')}></div>
                            </div>
                          </div>
                          <div className='bottom-flex'>
                            <div className='chair-bottom' id="seatI" style={seatStyle('seatI')}></div>
                            <div className='chair-bottom' id="seatI" style={seatStyle('seatI')}></div>
                            <div className='chair-bottom' id="seatI" style={seatStyle('seatI')}></div>
                          </div>
                        </div>
                        <div className='wall'></div>
                        <div className='order-booking' onClick={() => TableSelected('seatJ', 8)}>
                          <div className='top-flex'>
                            <div className='chair-top' id="seatJ" style={seatStyle('seatJ')}></div>
                            <div className='chair-top' id="seatJ" style={seatStyle('seatJ')}></div>
                            <div className='chair-top' id="seatJ" style={seatStyle('seatJ')}></div>
                          </div>
                          <div className='flex'>
                            <div>
                              <div className='chair-left' id="seatJ" style={seatStyle('seatJ')}></div>
                            </div>
                            <div>
                              <div className='table-eight' id="seatJ" style={seatStyle('seatJ')}></div>
                            </div>
                            <div>
                              <div className='chair-right' id="seatJ" style={seatStyle('seatJ')}></div>
                            </div>
                          </div>
                          <div className='bottom-flex'>
                            <div className='chair-bottom' id="seatJ" style={seatStyle('seatJ')}></div>
                            <div className='chair-bottom' id="seatJ" style={seatStyle('seatJ')}></div>
                            <div className='chair-bottom' id="seatJ" style={seatStyle('seatJ')}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='middel-flex'>
                      <div>
                        <div className='four-wall'>
                          <div className='order-booking' onClick={() => TableSelected('seatB', 6)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatB" style={seatStyle('seatB')}></div>
                              <div className='chair-top' id="seatB" style={seatStyle('seatB')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatB" style={seatStyle('seatB')}></div>
                              </div>
                              <div>
                                <div className='table-six' id="seatB" style={seatStyle('seatB')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatB" style={seatStyle('seatB')}></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatB" style={seatStyle('seatB')}></div>
                              <div className='chair-bottom' id="seatB" style={seatStyle('seatB')}></div>
                            </div>
                          </div>
                        </div>
                        <div className='four-wall'>
                          <div className='order-booking' onClick={() => TableSelected('seatF', 6)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatF" style={seatStyle('seatF')} ></div>
                              <div className='chair-top' id="seatF" style={seatStyle('seatF')} ></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatF" style={seatStyle('seatF')} ></div>
                              </div>
                              <div>
                                <div className='table-six' id="seatF" style={seatStyle('seatF')} ></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatF" style={seatStyle('seatF')} ></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatF" style={seatStyle('seatF')} ></div>
                              <div className='chair-bottom' id="seatF" style={seatStyle('seatF')} ></div>
                            </div>
                          </div>
                        </div>
                        <div className='four-wall-down'>
                          <div className='order-booking' onClick={() => TableSelected('seatG', 6)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatG" style={seatStyle('seatG')} ></div>
                              <div className='chair-top' id="seatG" style={seatStyle('seatG')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatG" style={seatStyle('seatG')}></div>
                              </div>
                              <div>
                                <div className='table-six' id="seatG" style={seatStyle('seatG')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatG" style={seatStyle('seatG')} ></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatG" style={seatStyle('seatG')} ></div>
                              <div className='chair-bottom' id="seatG" style={seatStyle('seatG')}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='three-seat'>
                        <div className='three-seat-center'>
                          <div className='order-booking-four' onClick={() => TableSelected('seatC', 4)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatC" style={seatStyle('seatC')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatC" style={seatStyle('seatC')}></div>
                              </div>
                              <div>
                                <div className='table-four' id="seatC" style={seatStyle('seatC')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatC" style={seatStyle('seatC')}></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatC" style={seatStyle('seatC')}></div>
                            </div>
                          </div>
                          <div className='order-booking-four' onClick={() => TableSelected('seatK', 4)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatK" style={seatStyle('seatK')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatK" style={seatStyle('seatK')}></div>
                              </div>
                              <div>
                                <div className='table-four' id="seatK" style={seatStyle('seatK')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatK" style={seatStyle('seatK')} ></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatK" style={seatStyle('seatK')}></div>
                            </div>
                          </div>
                          <div className='order-booking-four' onClick={() => TableSelected('seatL', 4)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatL" style={seatStyle('seatL')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatL" style={seatStyle('seatL')}></div>
                              </div>
                              <div>
                                <div className='table-four' id="seatL" style={seatStyle('seatL')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatL" style={seatStyle('seatL')}></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatL" style={seatStyle('seatL')}></div>
                            </div>
                          </div>
                        </div>
                        <div className='wall-wall'></div>
                        <div className='three-seat-center'>
                          <div className='order-booking-four' onClick={() => TableSelected('seatM', 4)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatM" style={seatStyle('seatM')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatM" style={seatStyle('seatM')}></div>
                              </div>
                              <div>
                                <div className='table-four' id="seatM" style={seatStyle('seatM')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatM" style={seatStyle('seatM')}></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatM" style={seatStyle('seatM')}></div>
                            </div>
                          </div>
                          <div className='order-booking-four' onClick={() => TableSelected('seatN', 4)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatN" style={seatStyle('seatL')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatN" style={seatStyle('seatL')}></div>
                              </div>
                              <div>
                                <div className='table-four' id="seatN" style={seatStyle('seatL')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatN" style={seatStyle('seatN')}></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatN" style={seatStyle('seatN')}></div>
                            </div>
                          </div>
                          <div className='order-booking-four' onClick={() => TableSelected('seatO', 4)}>
                            <div className='top-flex'>
                              <div className='chair-top' id="seatO" style={seatStyle('seatO')}></div>
                            </div>
                            <div className='flex'>
                              <div>
                                <div className='chair-left' id="seatO" style={seatStyle('seatO')}></div>
                              </div>
                              <div>
                                <div className='table-four' id="seatO" style={seatStyle('seatO')}></div>
                              </div>
                              <div>
                                <div className='chair-right' id="seatO" style={seatStyle('seatO')}></div>
                              </div>
                            </div>
                            <div className='bottom-flex'>
                              <div className='chair-bottom' id="seatO" style={seatStyle('seatO')}></div>
                            </div>
                          </div>
                        </div>
                        <div className='three-seat-two'>
                          <div className='three-seat-center'>
                            <div className='order-booking-four' onClick={() => TableSelected('seatP', 4)}>
                              <div className='top-flex'>
                                <div className='chair-top' id="seatP" style={seatStyle('seatP')}></div>
                              </div>
                              <div className='flex'>
                                <div>
                                  <div className='chair-left' id="seatP" style={seatStyle('seatP')}></div>
                                </div>
                                <div>
                                  <div className='table-four' id="seatP" style={seatStyle('seatP')}></div>
                                </div>
                                <div>
                                  <div className='chair-right' id="seatP" style={seatStyle('seatP')}></div>
                                </div>
                              </div>
                              <div className='bottom-flex'>
                                <div className='chair-bottom' id="seatP" style={seatStyle('seatP')}></div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatQ', 4)}>
                              <div className='top-flex'>
                                <div className='chair-top' id="seatQ" style={seatStyle('seatQ')}></div>
                              </div>
                              <div className='flex'>
                                <div>
                                  <div className='chair-left' id="seatQ" style={seatStyle('seatQ')}></div>
                                </div>
                                <div>
                                  <div className='table-four' id="seatQ" style={seatStyle('seatQ')}></div>
                                </div>
                                <div>
                                  <div className='chair-right' id="seatQ" style={seatStyle('seatQ')}></div>
                                </div>
                              </div>
                              <div className='bottom-flex'>
                                <div className='chair-bottom' id="seatQ" style={seatStyle('seatQ')}></div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatR', 4)}>
                              <div className='top-flex'>
                                <div className='chair-top' id="seatR" style={seatStyle('seatR')}></div>
                              </div>
                              <div className='flex'>
                                <div>
                                  <div className='chair-left' id="seatR" style={seatStyle('seatR')}></div>
                                </div>
                                <div>
                                  <div className='table-four' id="seatR" style={seatStyle('seatR')}></div>
                                </div>
                                <div>
                                  <div className='chair-right' id="seatR" style={{ backgroundColor: selectedSeat.includes('seatR') ? 'green' : '' }}></div>
                                </div>
                              </div>
                              <div className='bottom-flex'>
                                <div className='chair-bottom' id="seatR" style={seatStyle('seatR')}></div>
                              </div>
                            </div>
                          </div>
                          <div className='wall-wall'></div>
                          <div className='three-seat-center'>
                            <div className='order-booking-four' onClick={() => TableSelected('seatS', 4)}>
                              <div className='top-flex'>
                                <div className='chair-top' id="seatS" style={seatStyle('seatS')}></div>
                              </div>
                              <div className='flex'>
                                <div>
                                  <div className='chair-left' id="seatS" style={seatStyle('seatS')}></div>
                                </div>
                                <div>
                                  <div className='table-four' id="seatS" style={seatStyle('seatS')}></div>
                                </div>
                                <div>
                                  <div className='chair-right' id="seatS" style={seatStyle('seatS')}></div>
                                </div>
                              </div>
                              <div className='bottom-flex'>
                                <div className='chair-bottom' id="seatS" style={seatStyle('seatS')}></div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatT', 4)}>
                              <div className='top-flex'>
                                <div className='chair-top' id="seatT" style={seatStyle('seatT')}></div>
                              </div>
                              <div className='flex'>
                                <div>
                                  <div className='chair-left' id="seatT" style={seatStyle('seatT')}></div>
                                </div>
                                <div>
                                  <div className='table-four' id="seatT" style={{ backgroundColor: selectedSeat.includes('seatT') ? 'green' : '' }}></div>
                                </div>
                                <div>
                                  <div className='chair-right' id="seatT" style={{ backgroundColor: selectedSeat.includes('seatT') ? 'green' : '' }}></div>
                                </div>
                              </div>
                              <div className='bottom-flex'>
                                <div className='chair-bottom' id="seatT" style={seatStyle('seatT')}></div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatW', 4)}>
                              <div className='top-flex'>
                                <div className='chair-top' id="seatW" style={seatStyle('seatW')}></div>
                              </div>
                              <div className='flex'>
                                <div>
                                  <div className='chair-left' id="seatW" style={seatStyle('seatW')}></div>
                                </div>
                                <div>
                                  <div className='table-four' id="seatW" style={{ backgroundColor: selectedSeat.includes('seatW') ? 'green' : '' }}></div>
                                </div>
                                <div>
                                  <div className='chair-right' id="seatW" style={seatStyle('seatW')}></div>
                                </div>
                              </div>
                              <div className='bottom-flex'>
                                <div className='chair-bottom' id="seatW" style={seatStyle('seatW')}></div>
                              </div>
                            </div>
                          </div>
                          <div className='flex-for-two'>
                            <div className='order-booking-four' onClick={() => TableSelected('seatD', 2)}>
                              <div className='flex-two'>
                                <div>
                                  <div className='chair-left' style={seatStyle('seatD')}></div>
                                </div>
                                <div>
                                  <div className='table-two' id="seatD" style={seatStyle('seatD')}></div>
                                </div>
                                <div>
                                  <div className='chair-right-two' id="seatD" style={seatStyle('seatD')}></div>
                                </div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatU', 2)}>
                              <div className='flex-two'>
                                <div>
                                  <div className='chair-left' id="seatU" style={seatStyle('seatU')}></div>
                                </div>
                                <div>
                                  <div className='table-two' id="seatU" style={seatStyle('seatU')}></div>
                                </div>
                                <div>
                                  <div className='chair-right-two' id="seatU" style={seatStyle('seatU')}></div>
                                </div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatV', 2)}>
                              <div className='flex-two'>
                                <div>
                                  <div className='chair-left' id="seatV" style={seatStyle('seatV')}></div>
                                </div>
                                <div>
                                  <div className='table-two' id="seatV" style={seatStyle('seatV')}></div>
                                </div>
                                <div>
                                  <div className='chair-right-two' id="seatV" style={seatStyle('seatV')}></div>
                                </div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatX', 2)}>
                              <div className='flex-two'>
                                <div>
                                  <div className='chair-left' id="seatX" style={seatStyle('seatX')}></div>
                                </div>
                                <div>
                                  <div className='table-two' id="seatX" style={seatStyle('seatX')}></div>
                                </div>
                                <div>
                                  <div className='chair-right-two' id="seatX" style={seatStyle('seatX')}></div>
                                </div>
                              </div>
                            </div>
                            <div className='order-booking-four' onClick={() => TableSelected('seatY', 2)}>
                              <div className='flex-two'>
                                <div>
                                  <div className='chair-left' id="seatY" style={seatStyle('seatY')}></div>
                                </div>
                                <div>
                                  <div className='table-two' id="seatY" style={seatStyle('seatY')}></div>
                                </div>
                                <div>
                                  <div className='chair-right-two' id="seatY" style={seatStyle('seatY')}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='group-room'>
                      <div className='washroom'>
                        <h3>Washroom</h3>
                      </div>
                      <div className='wall'></div>
                      <div className='kitchen'>
                        <h3>Kitchen</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {branches.map((item, index) => {
                return (
                  <div className='container-desc' key={index}>
                    <p className='loc'>
                      Location:{item.loc}
                      <br />
                      Hours:{item.hr}
                      <br />
                      Contact:{item.ph}
                    </p>

                  </div>
                )
              })}
              <button
                className={`book_button-seat ${areAllSelectionsMade() ? '' : 'disabled'}`}
                onClick={seatsubmit}
                disabled={!areAllSelectionsMade()}>Seat Reservation</button>
            </div>
          </div>
        )
      })}
      <Footer />
    </div >
  );
}
export default Gulati