import { useState, useMemo } from 'react'
import { Calculator, DollarSign } from 'lucide-react'
import './QuoteForm.css'

const cargoTypes = ['General Cargo', 'Electronics', 'Perishable Goods', 'Hazardous Materials', 'Vehicles', 'Machinery']
const serviceTypes = [
  { value: 'standard', label: 'Standard (7-14 days)', multiplier: 1 },
  { value: 'express', label: 'Express (3-5 days)', multiplier: 1.6 },
  { value: 'priority', label: 'Priority (1-2 days)', multiplier: 2.2 },
]

function QuoteForm() {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    cargoType: 'General Cargo',
    serviceType: 'standard',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const estimate = useMemo(() => {
    const weight = parseFloat(form.weight) || 0
    const l = parseFloat(form.length) || 0
    const w = parseFloat(form.width) || 0
    const h = parseFloat(form.height) || 0

    if (weight <= 0 || !form.origin || !form.destination) return null

    const volumetricWeight = (l * w * h) / 5000
    const billableWeight = Math.max(weight, volumetricWeight)
    const service = serviceTypes.find((s) => s.value === form.serviceType)
    const multiplier = service ? service.multiplier : 1

    let baseRatePerKg = 2.5
    if (form.cargoType === 'Hazardous Materials') baseRatePerKg = 4.5
    else if (form.cargoType === 'Perishable Goods') baseRatePerKg = 3.8
    else if (form.cargoType === 'Electronics') baseRatePerKg = 3.2

    const baseRate = billableWeight * baseRatePerKg * multiplier
    const fuelSurcharge = baseRate * 0.15
    const insurance = baseRate * 0.03
    const total = baseRate + fuelSurcharge + insurance

    return {
      baseRate: baseRate.toFixed(2),
      fuelSurcharge: fuelSurcharge.toFixed(2),
      insurance: insurance.toFixed(2),
      total: total.toFixed(2),
      billableWeight: billableWeight.toFixed(1),
    }
  }, [form])

  return (
    <div className="quote-form-wrapper">
      <div className="quote-form-card">
        <div className="quote-form-card__header">
          <Calculator size={24} />
          <h2>Calculate Shipping Cost</h2>
        </div>

        <form className="quote-form" onSubmit={(e) => e.preventDefault()}>
          <div className="quote-form__row">
            <div className="quote-form__field">
              <label>Origin</label>
              <input
                type="text"
                name="origin"
                placeholder="e.g., Shanghai, China"
                value={form.origin}
                onChange={handleChange}
              />
            </div>
            <div className="quote-form__field">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                placeholder="e.g., New York, USA"
                value={form.destination}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="quote-form__row">
            <div className="quote-form__field">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="e.g., 500"
                value={form.weight}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="quote-form__field">
              <label>Cargo Type</label>
              <select name="cargoType" value={form.cargoType} onChange={handleChange}>
                {cargoTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="quote-form__row quote-form__row--3">
            <div className="quote-form__field">
              <label>Length (cm)</label>
              <input type="number" name="length" placeholder="L" value={form.length} onChange={handleChange} min="0" />
            </div>
            <div className="quote-form__field">
              <label>Width (cm)</label>
              <input type="number" name="width" placeholder="W" value={form.width} onChange={handleChange} min="0" />
            </div>
            <div className="quote-form__field">
              <label>Height (cm)</label>
              <input type="number" name="height" placeholder="H" value={form.height} onChange={handleChange} min="0" />
            </div>
          </div>

          <div className="quote-form__field quote-form__field--full">
            <label>Service Type</label>
            <div className="quote-form__service-options">
              {serviceTypes.map((s) => (
                <label
                  key={s.value}
                  className={`quote-form__service-option ${form.serviceType === s.value ? 'quote-form__service-option--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="serviceType"
                    value={s.value}
                    checked={form.serviceType === s.value}
                    onChange={handleChange}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="quote-estimate-card">
        <div className="quote-estimate-card__header">
          <DollarSign size={24} />
          <h3>Cost Estimate</h3>
        </div>

        {estimate ? (
          <div className="quote-estimate">
            <div className="quote-estimate__row">
              <span>Billable Weight</span>
              <strong>{estimate.billableWeight} kg</strong>
            </div>
            <div className="quote-estimate__row">
              <span>Base Rate</span>
              <strong>${estimate.baseRate}</strong>
            </div>
            <div className="quote-estimate__row">
              <span>Fuel Surcharge (15%)</span>
              <strong>${estimate.fuelSurcharge}</strong>
            </div>
            <div className="quote-estimate__row">
              <span>Insurance (3%)</span>
              <strong>${estimate.insurance}</strong>
            </div>
            <div className="quote-estimate__divider"></div>
            <div className="quote-estimate__row quote-estimate__row--total">
              <span>Total Estimate</span>
              <strong>${estimate.total}</strong>
            </div>
            <p className="quote-estimate__note">
              * This is an indicative estimate. Final pricing may vary based on specific requirements and current market conditions.
            </p>
            <button className="btn btn-primary quote-estimate__cta">
              Request Official Quote
            </button>
          </div>
        ) : (
          <div className="quote-estimate__empty">
            <Calculator size={40} />
            <p>Fill in the shipment details to get an instant cost estimate</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteForm
