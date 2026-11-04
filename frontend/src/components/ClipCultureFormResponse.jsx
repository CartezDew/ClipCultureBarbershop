import { getFormResponse } from '../lib/formResponseCopy.js';
import logo from '../assets/images/CC-Logo-Black-HQ.webp';
import '../styles/clip-culture-form-response.css';

export default function ClipCultureFormResponse({ formName, name }) {
  const response = getFormResponse(formName, name);

  return (
    <div className="cc-form-response" role="status">
      <img src={logo} alt="Clip Culture" className="cc-form-response__logo" />
      <span className="cc-form-response__eyebrow">MESSAGE RECEIVED</span>
      <h3>Thank you for reaching out.</h3>
      <p>{response.acknowledgement}</p>
      <p className="cc-form-response__next">{response.nextStep}</p>
    </div>
  );
}
