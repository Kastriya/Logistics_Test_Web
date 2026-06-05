import { Link } from 'react-router-dom'
import {
  Ship, Plane, Truck, Warehouse, FileText, BarChart3,
  Shield, Clock, Headphones, Globe, ArrowRight, Star
} from 'lucide-react'
import Hero from '../components/Hero'
import StatsCounter from '../components/StatsCounter'
import './Home.css'

const services = [
  { icon: Ship, title: 'Ocean Freight', desc: 'Full container and LCL shipping across major global ports.' },
  { icon: Plane, title: 'Air Freight', desc: 'Express air cargo solutions for time-sensitive shipments.' },
  { icon: Truck, title: 'Road Transport', desc: 'Reliable ground freight and last-mile delivery services.' },
  { icon: Warehouse, title: 'Warehousing', desc: 'Secure storage facilities with inventory management.' },
  { icon: FileText, title: 'Customs Brokerage', desc: 'Expert customs clearance and documentation services.' },
  { icon: BarChart3, title: 'Supply Chain', desc: 'End-to-end supply chain optimization and management.' },
]

const features = [
  { icon: Shield, title: 'Cargo Insurance', desc: 'Full coverage protection for your shipments against loss or damage.' },
  { icon: Clock, title: '24/7 Tracking', desc: 'Real-time shipment monitoring with instant status updates.' },
  { icon: Headphones, title: 'Dedicated Support', desc: 'Personal account managers available around the clock.' },
  { icon: Globe, title: 'Global Network', desc: 'Strategic partnerships in 120+ countries for seamless logistics.' },
]

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Supply Chain Director, TechCorp',
    text: 'SwiftLine transformed our logistics operations. Their tracking system and dedicated support have made international shipping effortless.',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'CEO, Importex Trading',
    text: 'We have been working with SwiftLine for 8 years. Their reliability and competitive pricing keep us coming back for all our freight needs.',
    rating: 5,
  },
  {
    name: 'Emily Chen',
    role: 'Operations Manager, GlobalGoods',
    text: 'The quote calculator is incredibly transparent, and shipments always arrive on time. SwiftLine is our go-to logistics partner.',
    rating: 5,
  },
]

function Home() {
  return (
    <div className="home">
      <Hero />
      <StatsCounter />

      {/* Services Overview */}
      <section className="section home-services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive logistics solutions tailored to your business needs
          </p>
          <div className="services-grid">
            {services.map((service, i) => (
              <div className="service-card" key={i}>
                <div className="service-card__icon">
                  <service.icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to="/services" className="service-card__link">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section home-features">
        <div className="container">
          <h2 className="section-title">Why Choose SwiftLine</h2>
          <p className="section-subtitle">
            Industry-leading logistics backed by technology and expertise
          </p>
          <div className="features-grid">
            {features.map((feature, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-card__icon">
                  <feature.icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section home-testimonials">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Trusted by thousands of businesses worldwide
          </p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="#F39C12" color="#F39C12" />
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home-cta">
        <div className="container home-cta__content">
          <h2>Ready to Ship Smarter?</h2>
          <p>Get a free quote in minutes and discover how SwiftLine can streamline your logistics.</p>
          <div className="home-cta__actions">
            <Link to="/quote" className="btn btn-white">
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ borderColor: '#fff', color: '#fff' }}>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
