import React from 'react';
import './Footer.css';
function Footer() {
  return (
    <div>
      <footer>
        <table>
          <tr>
            <td className="icon"><i class="fa-brands fa-facebook"></i></td>
            <td className="icon"><i class="fa-brands fa-twitter"></i></td>
            <td className="icon"><i class="fa-brands fa-whatsapp"></i></td>
            <td className="icon"><i class="fa-brands fa-instagram"></i></td>
          </tr>
        </table>
        <table>
          <tr>
            <td className="help">Home</td>
            <td className="help">About</td>
            <td className="help">Services</td>
            <td className="help">Team</td>
            <td className="help">Policy</td>
          </tr>
        </table>
        <p className="desc">@2023 ReserveIt|All Rights Reserved</p>
      </footer>
    </div>
  )
}
export default Footer;