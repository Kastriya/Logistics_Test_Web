import { useEffect, useRef, useState } from 'react'
import './Hero.css'
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {
  const [visible, setVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__bg-shape hero__bg-shape--1"></div>
        <div className="hero__bg-shape hero__bg-shape--2"></div>
        <div className="hero__bg-shape hero__bg-shape--3"></div>
      </div>
      <div className={`hero__content container ${visible ? 'hero__content--visible' : ''}`}>
        <div className="hero__badge">Global Logistics Partner</div>
        <h1 className="hero__title">
          Shipping Solutions <br />
          <span className="hero__title-accent">You Can Trust</span>
        </h1>
        <p className="hero__subtitle">
          From port to door, we deliver reliable, fast, and secure freight services across 120+ countries. Your cargo, our commitment.
        </p>
        <div className="hero__actions">
          <Link to="/quote" className="btn btn-primary btn-lg">
            Get a Free Quote <ArrowRight size={18} />
          </Link>
          <Link to="/tracking" className="btn btn-secondary btn-lg">
            Track Shipment <Play size={16} />
          </Link>
        </div>
        <div className="hero__trust">
          <div className="hero__trust-item">
            <span className="hero__trust-number">15K+</span>
            <span className="hero__trust-label">Shipments Monthly</span>
          </div>
          <div className="hero__trust-divider"></div>
          <div className="hero__trust-item">
            <span className="hero__trust-number">99.8%</span>
            <span className="hero__trust-label">On-Time Delivery</span>
          </div>
          <div className="hero__trust-divider"></div>
          <div className="hero__trust-item">
            <span className="hero__trust-number">120+</span>
            <span className="hero__trust-label">Countries Served</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
