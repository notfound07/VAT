import React, { useState, useEffect } from 'react';
import Navbar from '../nav-foot/Navbar';
import Footer from '../nav-foot/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import './Selectionmenu.css';

// import axios from 'axios';
document.querySelectorAll('nav a')
  .forEach(e => e.addEventListener('click', _ => change(e.dataset.id)))


function change(n) {
  let panels = document.querySelectorAll('main div')
  panels.forEach(p => p.classList.remove('active'))
  panels[n - 1].classList.add('active')
}


function Selectionmenu() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const getItem = (e) => {
    const { value, checked } = e.target
    console.log(`${value} is ${checked}`);
    if (checked) {
      setItem([...item, value]);
    }
    else {
      setItem(item.filter((e) => e !== value));
    }
  }
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    setActiveItem(location.hash); // Update active item based on the hash in the URL
  }, [location]);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.id !== activeItem.substring(1)) {
        section.style.filter = "blur(5px)"; // Blur non-active sections
      } else {
        section.style.filter = "none"; // Remove blur from active section
      }
    });
  }, [activeItem]);

  function finalitem() {
    // console.log(item);
    navigate('/FinalItem');
    // , { state: { item: item } }
    localStorage.setItem("item", item);
  }
  return (
    <div>
      <Navbar />
      <section id='Aslamchicken' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>TANDOORI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['CHICKEN (FULL)', 'CHICKEN (HALF)', 'CHICKEN KABAB (FULL)', 'CHIKEN KABAB (HALF)', 'FISH (FULL)', 'FISH (HALF)', 'FISH (QUARTER)', 'PANEER TIKKA (FULL)', 'PANEER TIKKA (HALF)'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Aslamchicken'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹410/-', '₹210/-', '₹270/-', '₹150/-', '₹700/-', '₹380/-', '₹200/-', '₹400/-', '₹200/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>DESSERTS & BEVERAGES</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['WATER BOTTLE', 'KULAD KHEER'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desserts_Beverages_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Aslamchicken'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹20/-', '₹60/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'>ASLAM SPECIAL DAHI BUTTER GRAVY</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['CHICKEN (FULL)', 'CHICKEN (HALF)', 'CHICKEN (QUARTER)', 'CHICKEN KABAB (FULL)', 'CHIKEN KABAB (HALF)', 'FISH (FULL)', 'FISH (HALF)', 'FISH (QUARTER)', 'PANEER (FULL)', 'PANEER (HALF)', 'EXTRA GRAVY'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Special_Dahi_Butter_Gravy_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Aslamchicken'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹550/-', '₹280/-', '₹190/-', '₹300/-', '₹180/-', '₹730/-', '₹400/-', '₹250/-', '₹450/-', '₹250/-', '₹50/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Aslamchicken'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <section id='Bukhara' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>NAAN & ROTI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["QEEMA NAAN", "BAQARKHANI KULCHA", "ROGHNI NAAN", "PLAIN NAAN", "TANDOORI ROTI", "RUMALI ROTI"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Bukhara'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹210/-", "₹120/-", "₹95/-", "₹75/-", "₹40/-", "₹40/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>INDIAN BREADS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["BUTTER NAAN", "GARLIC NAAN", "PLAIN NAAN", "LACHHA PARATHA", "TANDOORI ROTI", "BUTTER ROTI"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Bukhara'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹75/-", "₹85/-", "₹65/-", "₹75/-", "₹40/-", "₹50/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>MITHAAS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["KHEER BENAZEER", "GULAB JAMUN", "GAJAR KA HALWA", "SHAHI TUKDA"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Bukhara'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹120/-", "₹125/-", "₹160/-", "₹155/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BHARATIA PATTAL</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["SUBZ-E-KHAZANA(MIX VEG)", "KARAHI PANEER", "MALAI KOFTA", "PALAK PANEER", "DAL TADKA", "DAL MAKHANI", "SHAHI PANEER", "MIX RAITA", "BOONDI RAITA", "GREEN SALAD"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Bukhara'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹320/-", "₹345/-", "₹375/-", "₹385/-", "₹310/-", "₹345/-", "₹395/-", "₹175/-", "₹165/-", "₹115/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'>SHAHI DASTAR KHWAN</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    "AKBARI MURGH MASALA (HALF)",
                    "AKBARI MURGH MASALA (FULL)",
                    "SHAHI MURGH DOPYAZA(STEW) (HALF)",
                    "SHAHI MURGH DOPYAZA(STEW) (FULL)",
                    "LAZEEZ SAAG MURGH (HALF)",
                    "LAZEEZ SAAG MURGH (FULL)",
                    "KARAHI CHICKEN (HALF)",
                    "KARAHI CHICKEN (FULL)",
                    "BUTTER CHICKEN BONELESS (HALF)",
                    "BUTTER CHICKEN BONELESS (FULL)",
                    "BUTTER CHICKEN (HALF)",
                    "BUTTER CHICKEN (FULL)",
                    "CHICKEN MUGHLAI (HALF)",
                    "CHICKEN MUGHLAI (FULL)",
                    "CHICKEN JAHANGIRI (HALF)",
                    "CHICKEN JAHANGIRI (FULL)",
                    "CHICKEN QORMA (HALF)",
                    "CHICKEN QORMA (FULL)",
                    "CHICKEN HANDI (HALF)",
                    "CHICKEN HANDI (FULL)",
                    "TUKKHM-E-MURGH MASALA(EGG CURRY)",
                    "MUTTON MUGHLAI (HALF)",
                    "MUTTON MUGHLAI (FULL)",
                    "FIRDAUSI QORMA(ROGHAN JODH) (HALF)",
                    "FIRDAUSI QORMA(ROGHAN JODH) (FULL)",
                    "DIL BAHAR DOPYAZA(STEW) (HALF)",
                    "DIL BAHAR DOPYAZA(STEW) (FULL)",
                    "NARGISI KOFTA (HALF)",
                    "NARGISI KOFTA (FULL)",
                    "NAYAB MUGHZ MASALA(BRAIN CURRY)",
                    "KARAHI GOSHT (HALF)",
                    "KARAHI GOSHT (FULL)",
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Bukhara'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    "₹495/-", "₹795/-", "₹375/-", "₹525/-", "₹385/-", "₹520/-", "₹385/-", "₹520/-",
                    "₹595/-", "₹835/-", "₹550/-", "₹795/-", "₹395/-", "₹545/-", "₹395/-", "₹545/-",
                    "₹395/-", "₹550/-", "₹395/-", "₹575/-", "₹345/-", "₹495/-", "₹795/-", "₹495/-",
                    "₹795/-", "₹495/-", "₹795/-", "₹495/-", "₹795/-", "₹575/-", "₹495/-", "₹695/-",
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Bukhara'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <section id='Gulati' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>SOUPS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['CHICKEN SHORBA', 'CHICKEN CLEAR SOUP', 'HARYALI SHORBA', 'CREAM OF TOMATO', 'CREAM OF MUSHROOM'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Soups_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Gulati'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {Array(5).fill('₹320/-').map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SALAD AUR DAHI KA DAUR</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['PALAK PATTA CHAAT', 'PINEAPPLE RAITA', 'MINT RAITA', 'BOONDI RAITA', 'POTATO RAITA', 'CUCUMBER RAITA', 'MIX VEG RAITA', 'BOORANI RAITA', 'PLAIN RAITA', 'PLAIN CURD', 'KHATTI MEETHI DAHI', 'GREEN SALAD'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Salad_Dahi_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Gulati'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹335/-', '₹335/-', '₹315/-', '₹315/-', '₹315/-', '₹315/-', '₹315/-', '₹315/-', '₹295/-', '₹285/-', '₹295/-', '₹270/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                  <div>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'>BEVERAGES</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['CHAACH', 'MANGO LASSI', 'SWEET LASSI', 'SALTED LASSI', 'GULKAND LASSI', 'PEANUT BUTTER BANANA LASSI', 'AAM KA PANNA', 'JALJEERA', 'NIMBU SHIKANJI', 'PHALSA KI SHIKANJI', 'FRESH LIME SODA', 'LEMON ICED TEA', 'PEACH ICED TEA', 'MASALA COKE', 'THUMPS UP', 'DIET COKE', 'SPRITE', 'PAAN GULKAND MOJITO', 'VIRGIN MOJITO', 'BLUE LAGOON', 'MASALA VIRGIN MOJITO', 'MASALA VIRGIN MOJITO/ TROPICAL FIZZ', 'TROPICAL FIZZ', 'CHOCOLATE OREO SHAKE', 'THANDAI'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Gulati'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹215/-', '₹175/-', '₹175/-', '₹175/-', '₹175/-', '₹175/-', '₹175/-', '₹175/-', '₹175/-', '₹255/-', '₹199/-', '₹199/-', '₹199/-', '₹170/-', '₹170/-', '₹170/-', '₹170/-', '₹225/-', '₹225/-', '₹225/-', '₹225/-', '₹225/-', '₹225/-', '₹225/-', '₹175/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Gulati'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <section id='Karim' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>NAAN & ROTI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["QEEMA NAAN", "BAQARKHANI KULCHA", "ROGHNI NAAN", "PLAIN NAAN", "TANDOORI ROTI", "RUMALI ROTI"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹210/-", "₹120/-", "₹95/-", "₹75/-", "₹40/-", "₹40/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>INDIAN BREADS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["BUTTER NAAN", "GARLIC NAAN", "PLAIN NAAN", "LACHHA PARATHA", "TANDOORI ROTI", "BUTTER ROTI"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Indian_Bread_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹75/-", "₹85/-", "₹65/-", "₹75/-", "₹40/-", "₹50/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>MITHAAS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["KHEER BENAZEER", "GULAB JAMUN", "GAJAR KA HALWA", "SHAHI TUKDA"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Mithaas_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹120/-", "₹125/-", "₹160/-", "₹155/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BHARATIA PATTAL</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["SUBZ-E-KHAZANA(MIX VEG)", "KARAHI PANEER", "MALAI KOFTA", "PALAK PANEER", "DAL TADKA", "DAL MAKHANI", "SHAHI PANEER", "MIX RAITA", "BOONDI RAITA", "GREEN SALAD"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Bharatia_Pattal_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹320/-", "₹345/-", "₹375/-", "₹385/-", "₹310/-", "₹345/-", "₹395/-", "₹175/-", "₹165/-", "₹115/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>PULAO & RICE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["MURGH BIRYANI ANARKALI (HALF)", "MUTTON BIRYANI BAHISHTI (HALF)", "MURGH BIRYANI ANARKALI (FULL)", "MUTTON BIRYANI BAHISHTI (FULL)", "VEGETABLE PULAO", "STEAMED RICE", "JEERA RICE"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Pulao_Rice_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹395/-", "₹545/-", "₹510/-", "₹735/-", "₹285/-", "₹210/-", "₹235/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>ROLLS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["KARIM ROLL", "MURGH SEEKH ROLL", "FISH TIKKA ROLL(WINTER SEASON)", "MURGH TIKKA ROLL", "BOTI ROTI ROLL", "PANEER ROLL", "SHAMI KEBAB ROLL", "MURGH MALAI TIKKA ROLL", "SOYA CHAAP ROLL"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Rolls_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹375/-", "₹295/-", "₹395/-", "₹295/-", "₹410/-", "₹245/-", "₹375/-", "₹365/-", "₹235/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>KEBAB</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["DIL PASAND SEEKH KEBAB(2PCS.)", "DIL PASAND SEEKH KEBAB(4PCS.)", "BEMISAL SHAMI KEBAB(2PCS.)", "BEMISAL SHAMI KEBAB(4PCS.)", "CHICKEN SEEKH KEBAB(2PCS.)", "CHICKEN SEEKH KEBAB(4PCS.)"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Kebab_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹295/-", "₹555/-", "₹295/-", "₹555/-", "₹260/-", "₹495/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BAHAAR-E-SHORBA</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["MURGH KA SHORBA(CHICKEN SOUP)", "GOSHT KA SHORBA(MUTTON SOUP)"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Shorba_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹190/-", "₹219/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'>SHAHI DASTAR KHWAN</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    "AKBARI MURGH MASALA (HALF)",
                    "AKBARI MURGH MASALA (FULL)",
                    "SHAHI MURGH DOPYAZA(STEW) (HALF)",
                    "SHAHI MURGH DOPYAZA(STEW) (FULL)",
                    "LAZEEZ SAAG MURGH (HALF)",
                    "LAZEEZ SAAG MURGH (FULL)",
                    "KARAHI CHICKEN (HALF)",
                    "KARAHI CHICKEN (FULL)",
                    "BUTTER CHICKEN BONELESS (HALF)",
                    "BUTTER CHICKEN BONELESS (FULL)",
                    "BUTTER CHICKEN (HALF)",
                    "BUTTER CHICKEN (FULL)",
                    "CHICKEN MUGHLAI (HALF)",
                    "CHICKEN MUGHLAI (FULL)",
                    "CHICKEN JAHANGIRI (HALF)",
                    "CHICKEN JAHANGIRI (FULL)",
                    "CHICKEN QORMA (HALF)",
                    "CHICKEN QORMA (FULL)",
                    "CHICKEN HANDI (HALF)",
                    "CHICKEN HANDI (FULL)",
                    "TUKKHM-E-MURGH MASALA(EGG CURRY)",
                    "MUTTON MUGHLAI (HALF)",
                    "MUTTON MUGHLAI (FULL)",
                    "FIRDAUSI QORMA(ROGHAN JODH) (HALF)",
                    "FIRDAUSI QORMA(ROGHAN JODH) (FULL)",
                    "DIL BAHAR DOPYAZA(STEW) (HALF)",
                    "DIL BAHAR DOPYAZA(STEW) (FULL)",
                    "NARGISI KOFTA (HALF)",
                    "NARGISI KOFTA (FULL)",
                    "NAYAB MUGHZ MASALA(BRAIN CURRY)",
                    "KARAHI GOSHT (HALF)",
                    "KARAHI GOSHT (FULL)",
                    "MUTTON NIHARI (HALF)",
                    "MUTTON NIHARI (FULL)",
                    "MUTTON SAAG WALA (HALF)",
                    "MUTTON SAAG WALA (FULL)",
                    "KEEMA",
                    "KEEMA KALEJI",
                    "MUTTON HANDI (HALF)",
                    "MUTTON HANDI (FULL)",
                    "KEEMA MATAR"
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    "₹495/-", "₹795/-", "₹375/-", "₹525/-", "₹385/-", "₹520/-", "₹385/-", "₹520/-",
                    "₹595/-", "₹835/-", "₹550/-", "₹795/-", "₹395/-", "₹545/-", "₹395/-", "₹545/-",
                    "₹395/-", "₹550/-", "₹395/-", "₹575/-", "₹345/-", "₹495/-", "₹795/-", "₹495/-",
                    "₹795/-", "₹495/-", "₹795/-", "₹495/-", "₹795/-", "₹575/-", "₹495/-", "₹695/-",
                    "₹495/-", "₹795/-", "₹485/-", "₹795/-", "₹475/-", "₹495/-", "₹475/-", "₹695/-",
                    "₹475/-", "₹625/-", "₹495/-"
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SHAN-E-TANDOOR</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["TANDOORI MURGH (HALF)",
                    "TANDOORI MURGH (FULL)",
                    "TANDOORI RAAN(ORDER BEFORE 24HRS)",
                    "TANDOORI FISH(WINTER SEASON)",
                    "MUTTON BURRA(4PCS.)",
                    "MUTTON BURRA(8PCS.)",
                    "MURGH BURRA(4PCS.)",
                    "MURGH BURRA(8PCS.)",
                    "MURGH TIKKA",
                    "MURGH MALAI TIKKA",
                    "PANEER TIKKA",
                    "PANEER MALAI TIKKA",
                    "CHAAP MASALA",
                    "CHAAP MALAI",
                    "FISH TIKKA(WINTER SEASON)",
                    "KARIM'S ASSORTED KEBAB PLATTER"
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    "₹375/-", "₹595/-", "₹1950/-", "₹750/-", "₹545/-", "₹840/-", "₹375/-", "₹625/-",
                    "₹495/-", "₹520/-", "₹375/-", "₹395/-", "₹295/-", "₹310/-", "₹695/-", "₹945/-"
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BAHAAR-E-SHORBA</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["SUBZI KA GARAM RAS(VEG. SOUP)", "TAMATAR KA GARAM RAS(TOMATO SOUP)"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Karim'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹190/-", "₹219/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Karim'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <section id='Rajinderdadhaba' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>TANDOORI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['CHICKEN (FULL)', 'CHICKEN (HALF)', 'CHICKEN KABAB (FULL)', 'CHIKEN KABAB (HALF)', 'FISH (FULL)', 'FISH (HALF)', 'FISH (QUARTER)', 'PANEER TIKKA (FULL)', 'PANEER TIKKA (HALF)'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Rajinderdadhaba'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹410/-', '₹210/-', '₹270/-', '₹150/-', '₹700/-', '₹380/-', '₹200/-', '₹400/-', '₹200/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>DESSERTS & BEVERAGES</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['WATER BOTTLE', 'KULAD KHEER'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Rajinderdadhaba'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹20/-', '₹60/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BREAKFAST COMBO</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['8 RICE IDLI + 8 MEDU VADA', '4 RICE IDLI + 4 MEDU VADA + 2 MASALA DOSA', '4 RICE IDLI + 4 MEDU VADA', '2 RICE IDLI + 2 MEDU VADA + 1 MASALA DOSA'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Rajinderdadhaba'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹749/-', '₹749/-', '₹429/-', '₹429/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>MEAL COMBO</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['MASALA DOSA COMBO', 'RAVA MASALA DOSA COMBO'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Rajinderdadhaba'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹315/-', '₹345/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'> SPECIAL DAHI BUTTER GRAVY</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['CHICKEN (FULL)', 'CHICKEN (HALF)', 'CHICKEN (QUARTER)', 'CHICKEN KABAB (FULL)', 'CHIKEN KABAB (HALF)', 'FISH (FULL)', 'FISH (HALF)', 'FISH (QUARTER)', 'PANEER (FULL)', 'PANEER (HALF)', 'EXTRA GRAVY'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Rajinderdadhaba'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹550/-', '₹280/-', '₹190/-', '₹300/-', '₹180/-', '₹730/-', '₹400/-', '₹250/-', '₹450/-', '₹250/-', '₹50/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BREAD SELECTION</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'LEMON LEAF NAAN',
                    'AMRITSARI KULCHA',
                    'CAMEMBERT AND TRUFFLE NAAN',
                    'GLUTEN FREE NAAN',
                    'KHAMEERI ROTI',
                    'BAJRA KI MISSI',
                    'TANDOORI ROTI',
                    'NARANGI SHEERMAL',
                    'MANDUA ROTI'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Rajinderdadhaba'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹300/-', '₹300/-', '₹300/-', '₹300/-', '₹270/-', '₹270/-', '₹230/-', '₹300/-', '₹250/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Rajinderdadhaba'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <section id='Sagarratna' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>BREAKFAST COMBO</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['8 RICE IDLI + 8 MEDU VADA', '4 RICE IDLI + 4 MEDU VADA + 2 MASALA DOSA', '4 RICE IDLI + 4 MEDU VADA', '2 RICE IDLI + 2 MEDU VADA + 1 MASALA DOSA'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹749/-', '₹749/-', '₹429/-', '₹429/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>MEAL COMBO</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['MASALA DOSA COMBO', 'RAVA MASALA DOSA COMBO'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹315/-', '₹345/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>THALI</h1>
              <h1 className='menu-head'>SOUTH INDIAN THALI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  <div className='text-menu'>
                    <input type="checkbox" id="Breakfast_Combo" name="fav_language" value="SAGAR SPECIAL THALI" disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                    <label> SAGAR SPECIAL THALI</label>
                  </div>
                </div>
                <div className="amount">
                  <div className='text-menu'>
                    <label>₹335/-</label>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
              <h1 className='menu-head'>NORTH INDIAN THALI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['EXECUTIVE THALI', 'DELUXE THALI'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹355/-', '₹385/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>VADAS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'MEDU VADA (FOUR PCS)',
                    'DAL VADA (4 PIECES)',
                    'DAHI VADA SINGLE',
                    'DAHI VADA(TWO PIECES)',
                    'RASAM VADA (4 PCS)',
                    'IDLIS (2 PCS) + VADA (1 PC)',
                    'IDLI (1 PC) + VADA (2 PCS)'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index + 2}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>IDLIS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'RICE IDLI (TWO PIECES)',
                    'MADRAS IDLI FRIES',
                    'MINI IDLIS DIPPED IN SAMBHAR (TWELVE PCS)',
                    'IDLI CHAAT - SMALL'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index + 9}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹160/-', '₹190/-', '₹190/-', '₹120/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>DOSAS</h1>
              <h1 className='menu-head'>PLAIN DOSAS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'PLAIN DOSA',
                    'PAPER PLAIN DOSA',
                    'ONION PLAIN DOSA',
                    'BUTTER PLAIN DOSA',
                    'RAVA PLAIN DOSA',
                    'MYSORE PLAIN DOSA',
                    'GHEE ROAST PLAIN DOSA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index + 13}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹195/-', '₹215/-', '₹220/-', '₹235/-', '₹235/-', '₹225/-', '₹255/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>MASALA DOSAS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'MASALA DOSA',
                    'PAPER MASALA DOSA',
                    'ONION MASALA DOSA',
                    'BUTTER MASALA DOSA',
                    'RAVA MASALA DOSA',
                    'MYSORE MASALA DOSA',
                    'GHEE ROAST MASALA DOSA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Masala_Combo_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹215/-',
                    '₹235/-',
                    '₹240/-',
                    '₹255/-',
                    '₹255/-',
                    '₹245/-',
                    '₹275/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>RAVA DOSAS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'RAVA VEGETABLE PLAIN DOSA',
                    'RAVA COCONUT PLAIN DOSA',
                    'RAVA ONION PLAIN DOSA',
                    'RAVA MASALA DOSA',
                    'RAVA ONION MASALA DOSA',
                    'RAVA COCONUT MASALA DOSA',
                    'RAVA VEGETABLE MASALA DOSA',
                    'RAVA MYSORE MASALA DOSA',
                    'RAVA MYSORE ONION MASALA DOSA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Rava_Combo_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹245/-',
                    '₹245/-',
                    '₹255/-',
                    '₹250/-',
                    '₹270/-',
                    '₹265/-',
                    '₹270/-',
                    '₹270/-',
                    '₹280/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SOUTHERN SPECIALS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'PODI GHEE ROAST PLAIN DOSA',
                    'CHETTINAD PLAIN DOSA',
                    'GHEE ROAST GARLIC PEPPER PLAIN DOSA',
                    'PODI GHEE ROAST MASALA DOSA',
                    'CHETTINAD MASALA DOSA',
                    'GHEE ROAST GARLIC PEPPER MASALA DOSA',
                    'CHETTINAD PANEER DOSA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Southern_Special_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹255/-',
                    '₹255/-',
                    '₹265/-',
                    '₹270/-',
                    '₹295/-',
                    '₹290/-',
                    '₹320/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>FUSION DOSAS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'SPRING ROLL DOSA',
                    'HOT GARLIC DOSA',
                    'PANEER BUTTER MASALA DOSA',
                    'SAGAR SPECIAL PANEER DOSA',
                    'MYSORE PANEER DOSA',
                    'RAVA PANEER DOSA',
                    'RAVA ONION PANEER DOSA',
                    'RAVA MYSORE PANEER DOSA',
                    'VEGETABLE CHEESE DOSA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Fusion_Dosa_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹245/-',
                    '₹245/-',
                    '₹270/-',
                    '₹280/-',
                    '₹285/-',
                    '₹290/-',
                    '₹295/-',
                    '₹305/-',
                    '₹305/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>CHINESE</h1>
              <h1 className='menu-head'>CHINESE SOUP</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'SWEET CORN SOUP',
                    'HOT AND SOUR SOUP',
                    'VEG MANCHOW SOUP'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Chinese_Soup_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹205/-',
                    '₹205/-',
                    '₹215/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>CHINESE STARTERS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'VEG SPRING ROLL',
                    'HONEY CHILLI POTATOES',
                    'CRISPY VEG SALT & PEPPER',
                    'MUSHROOM CHILLI DRY',
                    'VEG MANCHURIAN DRY',
                    'GOBHI MANCHURIAN DRY',
                    'PANEER CHILLI DRY',
                    'PANEER MANCHURIAN DRY'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Chinese_Appetizer_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹285/-',
                    '₹285/-',
                    '₹305/-',
                    '₹305/-',
                    '₹305/-',
                    '₹305/-',
                    '₹345/-',
                    '₹345/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>CHINESE MAIN COURSE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'MUSHROOM CHILLI GRAVY',
                    'VEG. MANCHURIAN GRAVY',
                    'GOBHI MANCHURIAN GRAVY',
                    'PANEER CHILLI GRAVY',
                    'PANEER MANCHURIAN -- GRAVY'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Chinese_MainCourse_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹305/-',
                    '₹305/-',
                    '₹305/-',
                    '₹345/-',
                    '₹345/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>NOODLES & RICE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'VEG SINGAPORE CHOWMEIN',
                    'GARLIC GINGER CHILLI CHOWMEIN',
                    'VEG HAKKA NOODLES',
                    'VEG SCHEZWAN FRIED RICE',
                    'VEG SINGAPORE FRIED RICE',
                    'VEG FRIED RICE',
                    'VEG SCHEZWAN NOODLES'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Noodles_Rice_${index + 1}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹275/-',
                    '₹275/-',
                    '₹275/-',
                    '₹265/-',
                    '₹275/-',
                    '₹255/-',
                    '₹275/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'>STARTERS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["APLAM (SOUTH INDIAN PAPAD)", "RASAM (SMALL) + APLAM", "RASAM (FULL) + APLAM", "UPMA"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desserts_Beverages_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹40/-", "₹95/-", "₹145/-", "₹155/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>UTTAPAM</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["PLAIN UTTAPAM", "TOMATO UTTAPAM", "ONION UTTAPAM", "COCONUT UTTAPAM", "TOMATO ONION UTTAPAM", "VEGETABLE UTTAPAM", "MIXED VEGETABLE UTTAPAM", "TOMATO COCONUT UTTAPAM"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desserts_Beverages_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹215/-", "₹245/-", "₹250/-", "₹250/-", "₹255/-", "₹250/-", "₹260/-", "₹260/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SOUTH INDIAN RICE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["LEMON RICE", "CURD RICE", "POORI BHAJI WITH KURMA", "VEGETABLE BIRYANI", "SAMBHAR RICE", "RASAM RICE"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desserts_Beverages_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹215/-", "₹215/-", "₹225/-", "₹270/-", "₹215/-", "₹225/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}

                </div>
              </div>
              <h1 className='menu-head'>NORTH INDIAN</h1>
              <h1 className='menu-head'>SOUPS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["TOMATO SOUP", "MIXED VEGETABLE SOUP"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desserts_Beverages_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹205/-", "₹205/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SHURUAAT</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["VEGETABLE PAKORAS", "ASSORTED PAKORAS", "PANEER PAKORA", "VEG. SEEKH KEBAB", "HARA BHARA KEBA", "TANDOORI ALOO", "PANEER TIKKA", "ACHARI PANEER TIKKA", "TAWA CHANA KEBAB (WITH CURD DIP)", "TANDOORI PINEAPPLE", "SOYA MALAI TIKKA"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desserts_Beverages_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹225/-", "₹235/-", "₹255/-", "₹285/-", "₹285/-", "₹285/-", "₹335/-", "₹335/-", "₹295/-", "₹335/-", "₹345/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>PLATTER</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  <div className='text-menu'>
                    <input type="checkbox" id="Breakfast_Combo" name="fav_language" value="TANDOORI PLATTER" disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                    <label> TANDOORI PLATTER</label>
                  </div>
                </div>
                <div className="amount">
                  <div className='text-menu'>
                    <label>₹425/-</label>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
              <h1 className='menu-head'>MAIN COURSE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["SAGAR SPECIAL YELLOW DAL TADKA", "DAL MAKHANI", "BHINDI DO PYAZA", "MIXED VEGETABLES", "JEERA ALOO", "GOBHI MASALA", "CHANA MASALA", "DUM ALOO", "ALOO GOBHI", "NAVRATAN KORMA", "MALAI KOFTA", "MUSHROOM MASALA", "MUTTER MUSHROOM", "MUTTER MALAI METHI", "PANEER DO PYAZA", "SHAHI PANEER", "PALAK PANEER", "KADHAI PANEER", "PANEER LABABDAR", "PANEER TIKKA MASALA", "PANEER BUTTER MASALA", "PINDI CHANA", "MUSHROOM HARA PYAAZ", "KADHAI CHAAP", "BUTTER MASALA CHAAP", "PANEER HARA PYAAZ", "METHI PANEER", "Paneer Butter Masala"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Main_Course_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹325/-", "₹335/-", "₹325/-", "₹325/-", "₹325/-", "₹325/-", "₹325/-", "₹325/-", "₹325/-", "₹375/-", "₹385/-", "₹375/-", "₹375/-", "₹375/-", "₹385/-", "₹385/-", "₹385/-", "₹385/-", "₹385/-", "₹385/-", "₹385/-", "₹385/-", "₹325/-", "₹375/-", "₹375/-", "₹375/-", "₹385/-", "₹385/-", "₹0"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SANGI SAATHI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["PAPAD", "CGREEN SALAD", "MIXED RAITA", "BOONDI RAITA", "PINEAPPLE RAITA"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Sangi_Saathi_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹40/-", "₹145/-", "₹180/-", "₹180/-", "₹185/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>TANDOOR SE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["TANDOORI ROTI", "TANDOORI BUTTER ROTI", "PLAIN NAAN", "BUTTER NAAN", "STUFFED NAAN", "GARLIC NAAN", "PUDINA PARATHA", "LACHHA PARANTHA", "MISSI ROTI", "Onion Kulcha", "Aloo Kulcha", "PANEER KULCHA", "LEHSUNI MIRCHI PARANTHA"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Tandoor_Se_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹45/-", "₹55/-", "₹80/-", "₹95/-", "₹100/-", "₹105/-", "₹90/-", "₹90/-", "₹75/-", "₹95/-", "₹95/-", "₹100/-", "₹95/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>RICE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["STEAMED RICE", "JEERA RICE", "VEGETABLE PULAO", "KASHMIRI PULAO", "PEAS PULAO"].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Rice_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹185/-", "₹225/-", "₹245/-", "₹255/-", "₹255/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>DESSERTS & BEVERAGES</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["SWEET LASSI", "SALTED LASSI", "GULAB JAMUN (TWO PCS)", "RAVA KESARI - SMALL", "RAVA KESARI -  FULL", "GULAB JAMUN - SINGLE "].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desserts_Beverages_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sagarratna'} onChange={(e) => { getItem(e) }}></input>
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹125/-", "₹125/-", "₹135/-", "₹75/-", "₹135/-", "₹70/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Sagarratna'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <section id='Sandoz' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>SOUPS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'TOMATO SOUP',
                    'CHICKEN SOUP',
                    'HOT AND SOUR(VEG)',
                    'HOT AND SOUR(NON-VEG)',
                    'TALUMEIN(VEG)',
                    'TALUMEIN(NON-VEG)',
                    'VEG. SOUP',
                    'SWEET CORN SOUP (VEG)',
                    'SWEET CORN SOUP (NON-VEG)',
                    'LEMON CORIANDER SOUP(VEG)',
                    'LEMON CORIANDER SOUP(NON-VEG)',
                    'MANCHOW SOUP(VEG)',
                    'MANCHOW SOUP(NON-VEG)',
                    'CHICKEN CLEAR SOUP(VEG)',
                    'CHICKEN CLEAR SOUP(NON-VEG)'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Breakfast_Combo_${index}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>

                <div className="amount">
                  {[
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-',
                    '₹150/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>VEG STARTERS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['DAHI KE SHALAY', 'PALAK PATTA CHAAT', 'MUSHROOM TIKKA', 'MALAI CHAAP', 'PANEER TIKKA PAPAD', 'PANEER TIKKA', 'ACHARI CHAAP'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹290/-', '₹170/-', '₹300/-', '₹300/-', '₹300/-', '₹300/-', '₹300/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>ROLLS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['CHICKEN TIKKA ROLL', 'CHICKEN SEEKH ROLL', 'MUTTON SEEKH ROLL', 'CHICKEN MALAI TIKKA ROLL', 'ACHARI CHAAP ROLL', 'MALAI CHAAP ROLL', 'PANEER TIKKA ROLL'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹150/-', '₹150/-', '₹150/-', '₹150/-', '₹150/-', '₹150/-', '₹150/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>MUTTON MAIN COURSE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['KEEMA MUTTON', 'ROGAN JOSH', 'MUTTON CURRY', 'HANDI MUTTON', 'KEEMA CURRY', 'KARACHI MUTTON', 'MEAT SAAGWALA'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹350/-', '₹340/-', '₹340/-', '₹350/-', '₹340/-', '₹350/-', '₹350/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>VEG STARTERS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['DAHI KE SHALAY', 'PALAK PATTA CHAAT', 'MUSHROOM TIKKA', 'MALAI CHAAP'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹290/-', '₹170/-', '₹300/-', '₹300/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>VEG MAIN COURSE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    "SPL. DAL MAKHANI",
                    "YELLOW DAL(ARHAR)",
                    "SHAHI PANEER",
                    "SPL. PANEER BUTTER MASALA",
                    "KARAHI PANEER",
                    "MALAI KOFTA",
                    "NAVRATAN KORMA",
                    "TAWA CHAAP MASALA",
                    "PANEER TIKKA MASALA",
                    "DUM ALOO",
                    "PANEER MUSHROOM BHURJI",
                    "MUTTER PANEER",
                    "PALAK PANEER",
                    "CHANA MASALA",
                    "PANEER BHURJI",
                    "MIX VEGETABLE",
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Breakfast_Combo_${index}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    "₹275/-",
                    "₹275/-",
                    "₹320/-",
                    "₹340/-",
                    "₹320/-",
                    "₹340/-",
                    "₹330/-",
                    "₹330/-",
                    "₹360/-",
                    "₹300/-",
                    "₹350/-",
                    "₹320/-",
                    "₹300/-",
                    "₹300/-",
                    "₹340/-",
                    "₹330/-",
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>RICE & BIRYANI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    "PLAIN RICE",
                    "JEERA RICE",
                    "VEG. PULAO",
                    "DUM CHICKEN BIRYANI",
                    "DUM MUTTON BIRYANI",
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Breakfast_Combo_${index}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹140/-", "₹150/-", "₹230/-", "₹270/-", "₹280/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SALADS AND SIDES</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    "GREEN SALAD",
                    "CREAM SALAD",
                    "GREEN SALAD + BOONDI RAITA(COMBO)",
                    "RAITA BOONDI",
                    "CURD",
                    "PAPAD",
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Breakfast_Combo_${index}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹80/-", "₹60/-", "₹120/-", "₹80/-", "₹50/-", "₹50/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>CHINESE(NON-VEG)</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    "CHILLY CHICKEN(DRY/GRAVY)",
                    "CHICKEN MANCHURIAN(DRY/GRAVY)",
                    "LEMON CHICKEN(DRY/GRAVY)",
                    "CHICKEN IN HOT GARLIC SAUCE",
                    "CHICKEN SWEEET AND SOUR",
                    "GARLIC CHICKEN",
                    "HONEY PAPPER CHICKEN",
                    "CHILLI CORIANDER CHICKEN",
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Breakfast_Combo_${index}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹380/-", "₹380/-", "₹380/-", "₹380/-", "₹380/-", "₹380/-", "₹380/-", "₹380/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>CHINESE(VEG)</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    "FRENCH FRIES",
                    "CRISPY VEG.",
                    "HONEY CHILLI POTATOE",
                    "CHILLI POTATOE",
                    "CHILLI MUSHROOM",
                    "CHILLI PANEER",
                    "VEG. MANCHURIAN",
                    "SPRING ROLL",
                    "CRISPY CORN",
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input
                        type="checkbox"
                        id={`Breakfast_Combo_${index}`}
                        name="fav_language"
                        value={item}
                        disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {["₹180/-", "₹260/-", "₹250/-", "₹240/-", "₹260/-", "₹260/-", "₹230/-", "₹260/-", "₹270/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'>NON-VEG STARTERS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'BHATTI CHICKEN (HALF)',
                    'BHATTI CHICKEN (FULL)',
                    'AFGHANI CHICKEN (HALF)',
                    'AFGHANI CHICKEN (FULL)',
                    'TANDOORI CHICKEN (HALF)',
                    'TANDOORI CHICKEN (FULL)',
                    'RESHMI KEBAB',
                    'BHATTI CHICKEN TIKKA',
                    'MUTTON SEEKH KEBAB',
                    'CHICKEN MALAI TIKKA(8 PIECES)',
                    'CHICKEN TIKKA(8 PIECES)',
                    'CHICKEN SEEKH KEBABA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Chicken_Starter_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹340/-', '₹540/-', '₹340/-', '₹540/-', '₹320/-', '₹520/-', '₹350/-', '₹330/-', '₹340/-', '₹320/-', '₹320/-', '₹320/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>FISH</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {['LEMON FISH', 'CHILLI FISH', 'FISH TIKKA(PER PLATE)', 'FISH MALAI TIKKA(PER PLATE)', 'FISH FRY AMRITSARI(PER PLATE)'].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Fish_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹430/-', '₹430/-', '₹430/-', '₹430/-', '₹430/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>CHICKEN MAIN COURSE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'BONELESS BUTTER CHICKEN(QTR)',
                    'BONELESS BUTTER CHICKEN (HALF)',
                    'BONELESS BUTTER CHICKEN (FULL)',
                    'BONELESS BUTTER CHICKEN (FULL)',
                    'SPL. BUBTTER CHICKEN (HALF)',
                    'SPL. BUBTTER CHICKEN (FULL)',
                    'MUGHLAI BUTTER CHICKEN(QTR)',
                    'MUGHLAI BUTTER CHICKEN (HALF)',
                    'MUGHLAI BUTTER CHICKEN (FULL)',
                    'HANDI CHICKEN(QTR)',
                    'HANDI CHICKEN (HALF)',
                    'HANDI CHICKEN (FULL)',
                    'CHICKEN SHAHI QORMA(QTR)',
                    'CHICKEN SHAHI QORMA (HALF)',
                    'CHICKEN SHAHI QORMA (FULL)',
                    'KADHAI CHICKEN(QTR)',
                    'KADHAI CHICKEN (HALF)',
                    'KADHAI CHICKEN (FULL)',
                    'TAWA CHICKEN(QTR)',
                    'TAWA CHICKEN (HALF)',
                    'TAWA CHICKEN (FULL)',
                    'CHICKEN KALI MIRCH(QTR)',
                    'CHICKEN KALI MIRCH (HALF)',
                    'CHICKEN KALI MIRCH (FULL)',
                    'MUTTON SEEKH KEBAB(QTR)',
                    'MUTTON SEEKH KEBAB (HALF)',
                    'MUTTON SEEKH KEBAB (FULL)',
                    'CHICKEN CURRY(QTR)',
                    'CHICKEN CURRY (HALF)',
                    'CHICKEN CURRY (FULL)',
                    'CHICKEN TIKKA MASALA(QTR)',
                    'CHICKEN TIKKA MASALA (HALF)',
                    'CHICKEN TIKKA MASALA (FULL)',
                    'CHICKEN SAAGWALA(QTR)',
                    'CHICKEN SAAGWALA (HALF)',
                    'CHICKEN SAAGWALA (FULL)',
                    'MURG MUSALLAM(QTR)',
                    'MURG MUSALLAM (HALF)',
                    'MURG MUSALLAM (FULL)',
                    'EGG CURRY'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Chicken_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {[
                    '₹340/-', '₹480/-', '₹780/-', '₹780/-', '₹360/-', '₹500/-', '₹790/-', '₹340/-', '₹480/-', '₹780/-', '₹340/-', '₹480/-', '₹780/-', '₹340/-',
                    '₹480/-', '₹780/-', '₹340/-', '₹480/-', '₹790/-', '₹340/-', '₹480/-', '₹780/-', '₹340/-', '₹480/-', '₹780/-', '₹340/-', '₹480/-', '₹780/-',
                    '₹340/-', '₹480/-', '₹780/-', '₹340/-', '₹480/-', '₹780/-', '₹340/-', '₹480/-', '₹780/-', '₹500/-', '₹790/-', '₹220/-'
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BREADS</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["TANDOORI ROTI", "BUTTER ROTI", "RUMALI ROTI", "PLAIN NAAN", "BUTTER NAAN",
                    "LACHCHA PARANTHA", "BUTTER GARLIC NAAN", "PUDINA PARANTHA", "MIRCHI PARANTHA",
                    "STUFFED PARANTHA", "AJWAIN PARANTHA", "STUFFED NAAN", "KEEMA NAAN(WITH GRAVY)"].map((item, index) => (
                      <div className='text-menu' key={index}>
                        <input type="checkbox" id={`Fish_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                        <label>{item}</label>
                      </div>
                    ))}
                </div>
                <div className="amount">
                  {["₹35/-", "₹40/-", "₹35/-", "₹50/-", "₹60/-", "₹60/-", "₹65/-", "₹65/-",
                    "₹65/-", "₹70/-", "₹70/-", "₹80/-", "₹160/-"].map((price, index) => (
                      <div className='text-menu' key={index}>
                        <label>{price}</label>
                      </div>
                    ))}
                </div>
              </div>
              <h1 className='menu-head'>NOODLES</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["VEG. NOODLES", "CHICKEN NOODLES", "MIX NOODLES(NON-VEG)", "EGG NOODLES(NON-VEG)",
                    "GINGER/GARLIC NOODLES(VEG)", "GINGER/GARLIC NOODLES(NON-VEG)", "SINGAPUR STYLE NOODLES(VEG)",
                    "SINGAPUR STYLE NOODLES(NON-VEG)"].map((item, index) => (
                      <div className='text-menu' key={index}>
                        <input type="checkbox" id={`Fish_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                        <label>{item}</label>
                      </div>
                    ))}
                </div>
                <div className="amount">
                  {["₹210/-", "₹230/-", "₹230/-", "₹220/-", "₹230/-", "₹240/-", "₹230/-", "₹240/-"
                  ].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>RICE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {["SINGAPUR STYLE FRIED RICE", "SINGAPUR STYLE CHICKEN FRIED RICE", "MIX FRIED RICE(NON-VEG)",
                    "EGG FRIED RICE", "GINGER/GARLIC FRIED RICE(VEG)", "GINGER/GARLIC FRIED RICE(NON-VEG)",
                    "SCHEZWAN FRIED RICE(VEG)", "SCHEZWAN FRIED RICE(NON-VEG)"].map((item, index) => (
                      <div className='text-menu' key={index}>
                        <input type="checkbox" id={`Fish_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Sandoz'} onChange={(e) => { getItem(e) }} />
                        <label>{item}</label>
                      </div>
                    ))}
                </div>
                <div className="amount">
                  {["₹220/-", "₹250/-", "₹260/-", "₹240/-", "₹250/-", "₹250/-", "₹260/-", "₹260/-"].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Sandoz'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <section id='Varq' className='main'>
        <div className="container-menu">
          <div className='inside-container'>
            <div className='main-main-menu'>
              <h1 className='menu-head'>APPETIZER</h1>
              <h1 className='menu-head'>SEAFOOD, POULTRY AND MEAT</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'JASMINE AND GIN PRAWN TIKKA',
                    'VARQUI CRAB',
                    'CRUSTACEAN SALAD',
                    'ACHARI HALDI FISH TIKKA',
                    'MURG METHI MALAI SOUFFLÉ',
                    'CHICKEN GALAWAT',
                    'DHUNGAR PATTHAR KE KEBAB'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹2450/-', '₹1830/-', '₹1700/-', '₹1650/-', '₹1530/-', '₹1530/-', '₹1530/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>VEGETARIAN</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'FLOWER CHAAT',
                    'PALAK PATTA CHAAT',
                    'GULNAR PANEER',
                    'CORN KE KEBAB',
                    'MUSHROOM MIRCH MALAI',
                    'GALOUTI THREE WAYS',
                    'VARQUI KHUMB',
                    'VARQ GARDEN GREEN',
                    'CHILLED MASALA POT'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Breakfast_Combo_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹1350/-', '₹1200/-', '₹1200/-', '₹1200/-', '₹1200/-', '₹1200/-', '₹1200/-', '₹1200/-', '₹1200/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>SOUP</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'CHICKEN POTLI MASALA BROTH',
                    'LAMB AASH',
                    'DRUMSTICK LEAF SOUP',
                    'KHUMB NIMBU KA RASSA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Soup_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹830/-', '₹830/-', '₹770/-', '₹770/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>RAITA AND CURD</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'ORGANIC VEGETABLE RAITA',
                    'BASIL RAITA',
                    'BURRANI RAITA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Raita_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹450/-', '₹450/-', '₹450/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>BREAD SELECTION</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'LEMON LEAF NAAN',
                    'AMRITSARI KULCHA',
                    'CAMEMBERT AND TRUFFLE NAAN',
                    'GLUTEN FREE NAAN',
                    'KHAMEERI ROTI',
                    'BAJRA KI MISSI',
                    'TANDOORI ROTI',
                    'NARANGI SHEERMAL',
                    'MANDUA ROTI'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Bread_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹300/-', '₹300/-', '₹300/-', '₹300/-', '₹270/-', '₹270/-', '₹230/-', '₹300/-', '₹250/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>VEDIC TISANE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'AADHAVAN',
                    'ARJUNA',
                    'SAMA',
                    'ANASPHAL'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Tisane_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹700/-', '₹700/-', '₹700/-', '₹700/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>COFFEE SELECTION</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'TAJ ARTISIAN COFFEE BLEND',
                    'TAJ FILTER COFFEE 100% ARABICA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Coffee_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹700/-', '₹700/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='main-main-menu'>
              <h1 className='menu-head'>ENTRÉE</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'TIRFAL MASALA SEA BASS',
                    'DUCK CONFIT',
                    'PEPPER PRAWN',
                    'BAMBOO CHICKEN',
                    'DILLI-6 CHICKEN CURRY',
                    'GONGURA LAMB',
                    'SAFEDA LAMB BIRYANI'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`NonVeg_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹4600/-', '₹3600/-', '₹2800/-', '₹1830/-', '₹1830/-', '₹1920/-', '₹1920/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>VEGETARIAN</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'BAIGAN KA BHARTA',
                    'PANCHDHAAN KHICHADA',
                    'CHENNA PANEER',
                    'AMRITSARI WADI',
                    'BHINDI TWO WAYS',
                    'ALOO GOBI BROCCOLI',
                    'TAMATAR AUR JAITOON KE KOFTE',
                    'GUCCHI CHOLE PULAO'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Veg_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹1250/-', '₹1250/-', '₹1250/-', '₹1250/-', '₹1250/-', '₹1250/-', '₹1250/-', '₹1250/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>ACCOMPANIMENT</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'LASOONI PALAK',
                    'ALOO ROAST',
                    'DAL METHI',
                    'DAL TADKA',
                    'LAL MOTH KI MAHARANI',
                    'PAPAD KA KHAZANA'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Accompaniment_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹450/-', '₹450/-', '₹450/-', '₹450/-', '₹450/-', '₹450/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>DESSERT</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'DIFFERENT STROKES',
                    'BADAM KA HALWA',
                    'KHURMANI KA MEETHA',
                    'MILLE-FEUILE',
                    'FLAVOURS OF YOGHURT',
                    'ORANGE KHEER',
                    'CRISPY KALAKAND',
                    'SHAHI TUKDA',
                    'CHOICE OF SORBET',
                    'TRIO OF INDIAN ICE CREAMS'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Dessert_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹800/-', '₹800/-', '₹800/-', '₹800/-', '₹750/-', '₹750/-', '₹800/-', '₹800/-', '₹750/-', '₹750/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>TEA SELECTION</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  <div className='text-menu'>
                    <input type="checkbox" id="Breakfast_Combo" name="fav_language" value="TAJ BLEND" disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }}></input>
                    <label> TAJ BLEND</label>
                  </div>
                </div>
                <div className="amount">
                  <div className='text-menu'>
                    <label>₹700/-</label>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
              <h1 className='menu-head'>DESI CHAI</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'VARQUI SPECIAL',
                    'GINGER N LIME',
                    'CARDAMOM CREAM',
                    'KESAR KI KAHANI'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Desi_Chai_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹700/-', '₹700/-', '₹700/-', '₹700/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className='menu-head'>THE CLEANSER</h1>
              <div className='main-menu'>
                <div className='Breakfast_Combos'>
                  {[
                    'VARQUI KAPHILE GREEN TEA',
                    'KADI PATTA CHA',
                    'VAN GULAB'
                  ].map((item, index) => (
                    <div className='text-menu' key={index}>
                      <input type="checkbox" id={`Cleanser_Item_${index}`} name="fav_language" value={item} disabled={window.location.hash !== '#Varq'} onChange={(e) => { getItem(e) }} />
                      <label>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="amount">
                  {['₹700/-', '₹700/-', '₹700/-'].map((price, index) => (
                    <div className='text-menu' key={index}>
                      <label>{price}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="button_menu" disabled={window.location.hash !== '#Varq'} onClick={finalitem}>Book</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Selectionmenu;
