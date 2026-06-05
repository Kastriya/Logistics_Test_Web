import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ChevronDown, Send } from 'lucide-react'
import './Contact.css'

const offices = [
  {
    city: 'New York (HQ)',
    address: '123 Harbor Drive, Suite 500, New York, NY 10001',
    phone: '+1 (800) 555-SHIP',
    email: 'ny@swiftline-logistics.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM EST',
  },
  {
    city: 'London',
    address: '45 Thames Quay, Canary Wharf, London E14 5AB, UK',
    phone: '+44 20 7946 0958',
    email: 'london@swiftline-logistics.com',
    hours: 'Mon-Fri: 9:00 AM - 5:30 PM GMT',
  },
  {
    city: 'Singapore',
    address: '88 Marina Boulevard, #12-01, Singapore 018984',
    phone: '+65 6812 3456',
    email: 'singapore@swiftline-logistics.com',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM SGT',
  },
]

const faqs = [
  {
    q: 'How do I get a shipping quote?',
    a: 'You can use our online quote calculator for an instant estimate, or contact our sales team for a detailed custom quote tailored to your specific needs.',
  },
  {
    q: 'What types of cargo do you handle?',
    a: 'We handle general cargo, electronics, perishable goods, hazardous materials (with proper documentation), vehicles, machinery, and more. Contact us for specialized cargo requirements.',
  },
  {
    q: 'How can I track my shipment?',
    a: 'Enter your tracking number on our Track Shipment page. You will see real-time status updates including pickup, transit, customs, and delivery information.',
  },
  {
    q: 'Do you offer cargo insurance?',
    a: 'Yes, we offer comprehensive cargo insurance covering loss, damage, and delays. Insurance is automatically included in our quotes at 3% of the base rate.',
  },
  {
    q: 'What are your delivery timelines?',
    a: 'Delivery times vary by service type: Standard (7-14 days), Express (3-5 days), and Priority (1-2 days). Exact timelines depend on origin, destination, and service selected.',
  },
]

function Contact() {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We are here to help with all your logistics needs</p>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section contact-main">
        <div className="container contact-main__grid">
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            {submitted ? (
              <div className="contact-success">
                <Send size={32} />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="contact-form__field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>Phone</label>
                    <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="contact-form__field">
                    <label>Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange}>
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="tracking">Tracking Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">General Support</option>
                    </select>
                  </div>
                </div>
                <div className="contact-form__field contact-form__field--full">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your shipping needs..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>

          <div className="contact-map">
            <div className="contact-map__placeholder">
              <MapPin size={48} />
              <p>123 Harbor Drive, Suite 500<br />New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section contact-offices">
        <div className="container">
          <h2 className="section-title">Our Offices</h2>
          <p className="section-subtitle">Global presence with local expertise</p>
          <div className="offices-grid">
            {offices.map((office, i) => (
              <div className="office-card" key={i}>
                <h3>{office.city}</h3>
                <ul>
                  <li><MapPin size={16} /><span>{office.address}</span></li>
                  <li><Phone size={16} /><span>{office.phone}</span></li>
                  <li><Mail size={16} /><span>{office.email}</span></li>
                  <li><Clock size={16} /><span>{office.hours}</span></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section contact-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Quick answers to common questions</p>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`} key={i}>
                <button className="faq-item__question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <ChevronDown size={20} />
                </button>
                <div className="faq-item__answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
