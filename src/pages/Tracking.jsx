import { useState } from 'react'
import { Search, MapPin, Package, Clock, Weight, Calendar } from 'lucide-react'
import TrackingTimeline from '../components/TrackingTimeline'
import './Tracking.css'

const mockShipments = {
  'SWL-2026-78432': {
    status: 'In Transit',
    origin: 'Shanghai, China',
    destination: 'New York, USA',
    weight: '2,400 kg',
    service: 'Ocean Freight (FCL)',
    eta: 'June 12, 2026',
    shipDate: 'May 20, 2026',
    currentStep: 2,
    steps: [
      { title: 'Pickup', detail: 'Collected from Shanghai warehouse', date: 'May 20, 2026' },
      { title: 'In Transit', detail: 'On vessel MV Pacific Star - Singapore strait', date: 'May 28, 2026' },
      { title: 'Customs', detail: 'Pending customs clearance at NY port', date: 'Est. June 10' },
      { title: 'Out for Delivery', detail: 'Awaiting last-mile dispatch', date: 'Est. June 11' },
      { title: 'Delivered', detail: 'Pending delivery confirmation', date: 'Est. June 12' },
    ],
  },
  'SWL-2026-91205': {
    status: 'Delivered',
    origin: 'London, UK',
    destination: 'Dubai, UAE',
    weight: '850 kg',
    service: 'Air Freight (Express)',
    eta: 'June 2, 2026',
    shipDate: 'May 30, 2026',
    currentStep: 4,
    steps: [
      { title: 'Pickup', detail: 'Collected from London Heathrow depot', date: 'May 30, 2026' },
      { title: 'In Transit', detail: 'Air shipment via EK-204', date: 'May 31, 2026' },
      { title: 'Customs', detail: 'Cleared at Dubai customs', date: 'June 1, 2026' },
      { title: 'Out for Delivery', detail: 'Dispatched to recipient', date: 'June 2, 2026' },
      { title: 'Delivered', detail: 'Signed by: Ahmed K.', date: 'June 2, 2026' },
    ],
  },
}

function Tracking() {
  const [trackingId, setTrackingId] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    const id = trackingId.trim().toUpperCase()
    if (!id) {
      setError('Please enter a tracking number')
      return
    }

    if (mockShipments[id]) {
      setResult(mockShipments[id])
    } else {
      setError('No shipment found. Try: SWL-2026-78432 or SWL-2026-91205')
    }
  }

  return (
    <div className="tracking-page">
      <section className="page-header">
        <div className="container">
          <h1>Track Your Shipment</h1>
          <p>Enter your tracking number to get real-time updates</p>
        </div>
      </section>

      <section className="section tracking-search">
        <div className="container">
          <form className="tracking-form" onSubmit={handleTrack}>
            <div className="tracking-form__input-wrap">
              <Search size={20} />
              <input
                type="text"
                placeholder="Enter tracking number (e.g., SWL-2026-78432)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Track Shipment</button>
          </form>
          {error && <p className="tracking-error">{error}</p>}
        </div>
      </section>

      {result && (
        <section className="section tracking-result">
          <div className="container">
            <div className="tracking-result__grid">
              <div className="tracking-details">
                <div className="tracking-details__header">
                  <h2>Shipment Details</h2>
                  <span className={`tracking-status tracking-status--${result.status === 'Delivered' ? 'delivered' : 'transit'}`}>
                    {result.status}
                  </span>
                </div>
                <div className="tracking-details__info">
                  <div className="tracking-detail">
                    <MapPin size={18} />
                    <div>
                      <span>Origin</span>
                      <strong>{result.origin}</strong>
                    </div>
                  </div>
                  <div className="tracking-detail">
                    <MapPin size={18} />
                    <div>
                      <span>Destination</span>
                      <strong>{result.destination}</strong>
                    </div>
                  </div>
                  <div className="tracking-detail">
                    <Weight size={18} />
                    <div>
                      <span>Weight</span>
                      <strong>{result.weight}</strong>
                    </div>
                  </div>
                  <div className="tracking-detail">
                    <Package size={18} />
                    <div>
                      <span>Service</span>
                      <strong>{result.service}</strong>
                    </div>
                  </div>
                  <div className="tracking-detail">
                    <Calendar size={18} />
                    <div>
                      <span>Ship Date</span>
                      <strong>{result.shipDate}</strong>
                    </div>
                  </div>
                  <div className="tracking-detail">
                    <Clock size={18} />
                    <div>
                      <span>ETA</span>
                      <strong>{result.eta}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tracking-timeline-card">
                <h3>Shipment Progress</h3>
                <TrackingTimeline steps={result.steps} currentStep={result.currentStep} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Tracking
