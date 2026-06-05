import { CheckCircle, Circle } from 'lucide-react'
import './TrackingTimeline.css'

function TrackingTimeline({ steps, currentStep }) {
  return (
    <div className="timeline">
      {steps.map((step, i) => {
        const isComplete = i <= currentStep
        const isCurrent = i === currentStep
        return (
          <div className={`timeline__step ${isComplete ? 'timeline__step--complete' : ''} ${isCurrent ? 'timeline__step--current' : ''}`} key={i}>
            <div className="timeline__icon">
              {isComplete ? <CheckCircle size={22} /> : <Circle size={22} />}
            </div>
            <div className="timeline__info">
              <h4>{step.title}</h4>
              <p>{step.detail}</p>
              {step.date && <span className="timeline__date">{step.date}</span>}
            </div>
            {i < steps.length - 1 && <div className={`timeline__line ${isComplete ? 'timeline__line--complete' : ''}`}></div>}
          </div>
        )
      })}
    </div>
  )
}

export default TrackingTimeline
