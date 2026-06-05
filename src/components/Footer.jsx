import { Link } from 'react-router-dom'
import { Ship, Mail, Phone, MapPin, Globe, MessageCircle, Briefcase, Camera } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__col">
          <div className="footer__brand">
            <Ship size={28} />
            <span>SwiftLine</span>
          </div>
          <p className="footer__desc">
            Global shipping and freight solutions trusted by businesses worldwide. Reliable, fast, and secure logistics services.
          </p>
          <div className="footer__social">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Chat"><MessageCircle size={18} /></a>
            <a href="#" aria-label="Business"><Briefcase size={18} /></a>
            <a href="#" aria-label="Photos"><Camera size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Ocean Freight</Link></li>
            <li><Link to="/services">Air Freight</Link></li>
            <li><Link to="/services">Road Transport</Link></li>
            <li><Link to="/services">Warehousing</Link></li>
            <li><Link to="/services">Customs Brokerage</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/tracking">Track Shipment</Link></li>
            <li><Link to="/quote">Get a Quote</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/portal">Client Portal</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact Info</h4>
          <ul className="footer__contact">
            <li>
              <MapPin size={16} />
              <span>123 Harbor Drive, Suite 500, New York, NY 10001</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+1 (800) 555-SHIP</span>
            </li>
            <li>
              <Mail size={16} />
              <span>info@swiftline-logistics.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} SwiftLine Logistics. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
