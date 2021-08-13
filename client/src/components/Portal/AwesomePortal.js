import React, {Fragment} from 'react'
import './awesomeportal.css'
const AwesomePortal = () => {
  return (
    <Fragment>
    <div style={{ flex: 0 }} className="spinner-portal-container">
    <div style={{ width: 150, height: 150 }} className="symbol">
      <svg viewBox="0 0 94.31 95.69">
        <g data-name="Layer 2">
          <g fill="#99ccff;" data-name="Layer 1">
            <path
              className="symbol1"
              d="M94.31 60.47V33.83L71.23 20.5 49.15 33.25l35.72 20.62v12.05l9.44-5.45z"
            />
            <path
              className="symbol2"
              d="M81.67 13.32L58.59 0 35.51 13.32v25.49L71.23 18.2l10.44 6.02v-10.9z"
            />
            <path
              className="symbol3"
              d="M34.51.69L11.44 14.02v26.65l22.07 12.74V12.17l10.44-6.03L34.51.69z"
            />
            <path
              className="symbol4"
              d="M45.15 62.44L9.44 41.82V29.77L0 35.22v26.64l23.08 13.33 22.07-12.75z"
            />
            <path
              className="symbol5"
              d="M23.08 77.5l-10.44-6.03v10.9l23.08 13.32 23.07-13.32V56.88L23.08 77.5z"
            />
            <path
              className="symbol6"
              d="M50.36 89.55L59.79 95l23.08-13.33V55.02L60.79 42.28v41.24l-10.43 6.03z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
  </Fragment>
);
  
}

export default AwesomePortal
