import QuoteForm from '../components/QuoteForm'
import './Quote.css'

function Quote() {
  return (
    <div className="quote-page">
      <section className="page-header">
        <div className="container">
          <h1>Get a Free Quote</h1>
          <p>Calculate your shipping cost instantly with our transparent pricing</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <QuoteForm />
        </div>
      </section>
    </div>
  )
}

export default Quote
