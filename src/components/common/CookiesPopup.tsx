import React from 'react'
import CookieConsent from "react-cookie-consent";
import Link from 'next/link'

const CookiesPopup = ({ onAccept, onDecline }) => {
  return (
    <CookieConsent
      location="bottom"
      enableDeclineButton
      declineButtonText="Απόρριψη"
      buttonText="Αποδοχή"
      // style={{ background: "#2B373B" }}
      style={{ background: "#F3F3F3", color: '#2E343E', padding: '10px 0' }}
      buttonStyle={{  fontSize: "20px", borderRadius: '4px', color: 'white', backgroundColor: '#FD5A88', fontWeight: 'bold' }}
      declineButtonStyle={{ fontSize: '20px', borderRadius: '4px', backgroundColor: '#E6E6E6', color: '#2E343E' }}
      expires={150}
      onAccept={onAccept}
      onDecline={onDecline}
    >
      <h1 style={{ fontSize: '18px' }}>
        Χρησιμοποιούμε cookies, για να σου προσφέρουμε προσωποποιημένη εμπειρία περιήγησης.
        <span style={{ marginLeft: '4px' }}> 
          <Link href="/prostasia-prosopikon-dedomenon-gdpr">
            <a>
              Περισσότερα
            </a>
          </Link>
        </span>
      </h1>
    </CookieConsent>
  )
}

export default CookiesPopup