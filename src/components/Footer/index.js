import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg">
    <div className="footer-sec">
      <button type="button" className="footer-btn">
        <FaGoogle />
      </button>
      <button type="button" className="footer-btn">
        <FaTwitter />
      </button>
      <button type="button" className="footer-btn">
        <FaInstagram />
      </button>
      <button type="button" className="footer-btn">
        <FaYoutube />
      </button>
    </div>
    <p className="contact-us">Contact us</p>
  </div>
)
export default Footer
