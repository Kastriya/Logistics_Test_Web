import { Link } from 'react-router-dom'
import { Ship, Plane, Truck, Warehouse, FileText, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: Ship,
    title: 'Ocean Freight',
    desc: 'Full container load (FCL) and less-than-container load (LCL) shipping services across all major global ports. We handle everything from documentation to delivery.',
    features: ['FCL & LCL Shipping', 'Port-to-Port & Door-to-Door', 'Reefer & Specialized Cargo', 'Bill of Lading Management'],
  },
  {
    icon: Plane,
    title: 'Air Freight',
    desc: 'Express and standard air cargo solutions for time-sensitive shipments. Our partnerships with major airlines ensure competitive rates and reliable transit times.',
    features: ['Express & Standard Options', 'Charter Services', 'Dangerous Goods Handling', 'Temperature-Controlled'],
  },
  {
    icon: Truck,
    title: 'Road Transport',
    desc: 'Comprehensive ground freight services including FTL, LTL, and specialized haulage. Our fleet covers local and cross-border transportation needs.',
    features: ['FTL & LTL Shipping', 'Cross-Border Transport', 'Last-Mile Delivery', 'Oversized Cargo'],
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    desc: 'State-of-the-art storage facilities with advanced inventory management systems. Strategic locations near major ports and airports for efficient distribution.',
    features: ['Bonded Warehousing', 'Inventory Management', 'Pick & Pack Services', 'Cross-Docking'],
  },
  {
    icon: FileText,
    title: 'Customs Brokerage',
    desc: 'Expert customs clearance services ensuring smooth border crossings. Our licensed brokers handle all documentation, compliance, and regulatory requirements.',
    features: ['Import/Export Clearance', 'Tariff Classification', 'Duty Optimization', 'Compliance Audits'],
  },
  {
    icon: BarChart3,
    title: 'Supply Chain Solutions',
    desc: 'End-to-end supply chain optimization and management. We design and implement tailored logistics strategies that reduce costs and improve efficiency.',
    features: ['Network Design', 'Vendor Management', 'Demand Planning', 'Performance Analytics'],
  },
]

function Services() {
  return (
    <div className="services-page">
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>End-to-end logistics solutions for every shipping need</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-list">
            {services.map((service, i) => (
              <div className={`service-detail ${i % 2 === 1 ? 'service-detail--reverse' : ''}`} key={i}>
                <div className="service-detail__content">
                  <div className="service-detail__icon">
                    <service.icon size={32} />
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.desc}</p>
                  <ul className="service-detail__features">
                    {service.features.map((f, j) => (
                      <li key={j}>
                        <CheckCircle size={16} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/quote" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Get a Quote <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="service-detail__visual">
                  <div className="service-detail__placeholder">
                    <service.icon size={64} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
