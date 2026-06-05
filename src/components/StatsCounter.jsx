import { useEffect, useRef, useState } from 'react'
import { Package, Globe, Award, Users } from 'lucide-react'
import './StatsCounter.css'

const stats = [
  { icon: Package, value: 500000, suffix: '+', label: 'Shipments Delivered' },
  { icon: Globe, value: 120, suffix: '+', label: 'Countries Served' },
  { icon: Award, value: 25, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 99, suffix: '%', label: 'Client Satisfaction' },
]

function animateValue(setValue, start, end, duration) {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setValue(Math.floor(eased * (end - start) + start))
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

function StatItem({ icon: Icon, value, suffix, label }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateValue(setCount, 0, value, 2000)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-item__icon">
        <Icon size={28} />
      </div>
      <div className="stat-item__value">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="stat-item__label">{label}</div>
    </div>
  )
}

function StatsCounter() {
  return (
    <section className="stats section">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter
