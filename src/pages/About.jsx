import { Target, Eye, Heart, Award, Users, TrendingUp } from 'lucide-react'
import './About.css'

const team = [
  { name: 'Michael Reynolds', role: 'CEO & Founder', initial: 'MR' },
  { name: 'Lisa Chang', role: 'VP of Operations', initial: 'LC' },
  { name: 'David Okonkwo', role: 'Head of Logistics', initial: 'DO' },
  { name: 'Anna Petrov', role: 'Director of Sales', initial: 'AP' },
]

const certifications = [
  'ISO 9001:2015 Certified',
  'IATA Member',
  'FIATA Member',
  'C-TPAT Certified',
  'AEO Authorized',
]

function About() {
  return (
    <div className="about">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About SwiftLine</h1>
          <p>Building trust through reliable logistics since 1999</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section about-story">
        <div className="container about-story__grid">
          <div className="about-story__content">
            <h2 className="section-title" style={{ textAlign: 'left' }}>Our Story</h2>
            <p>
              Founded in 1999, SwiftLine Logistics began as a small freight forwarding company with a single office in New York. Our founder, Michael Reynolds, envisioned a logistics company that combined reliability with cutting-edge technology.
            </p>
            <p>
              Over 25 years, we have grown into a global logistics powerhouse with operations spanning 120+ countries. From ocean freight to supply chain optimization, we deliver end-to-end solutions that help businesses scale globally.
            </p>
            <p>
              Today, we process over 500,000 shipments annually, serving Fortune 500 companies and growing SMEs alike. Our commitment to innovation and customer satisfaction remains at the core of everything we do.
            </p>
          </div>
          <div className="about-story__visual">
            <div className="about-story__card">
              <div className="about-story__stat">
                <TrendingUp size={24} />
                <span>25+ Years</span>
              </div>
              <div className="about-story__stat">
                <Users size={24} />
                <span>2,500+ Employees</span>
              </div>
              <div className="about-story__stat">
                <Award size={24} />
                <span>50+ Industry Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section about-mvv">
        <div className="container">
          <h2 className="section-title">What Drives Us</h2>
          <p className="section-subtitle">Our mission, vision, and values guide every decision we make</p>
          <div className="mvv-grid">
            <div className="mvv-card">
              <div className="mvv-card__icon"><Target size={28} /></div>
              <h3>Our Mission</h3>
              <p>To provide seamless, reliable, and innovative logistics solutions that empower businesses to reach global markets efficiently and sustainably.</p>
            </div>
            <div className="mvv-card">
              <div className="mvv-card__icon"><Eye size={28} /></div>
              <h3>Our Vision</h3>
              <p>To be the world's most trusted logistics partner, connecting businesses and communities through intelligent supply chain solutions.</p>
            </div>
            <div className="mvv-card">
              <div className="mvv-card__icon"><Heart size={28} /></div>
              <h3>Our Values</h3>
              <p>Integrity, innovation, and customer-first thinking. We believe in transparent pricing, sustainable practices, and building lasting partnerships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team">
        <div className="container">
          <h2 className="section-title">Leadership Team</h2>
          <p className="section-subtitle">Experienced professionals driving our global operations</p>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-card__avatar">{member.initial}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section about-certs">
        <div className="container">
          <h2 className="section-title">Certifications & Memberships</h2>
          <p className="section-subtitle">Recognized by leading industry bodies worldwide</p>
          <div className="certs-grid">
            {certifications.map((cert, i) => (
              <div className="cert-badge" key={i}>
                <Award size={20} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
