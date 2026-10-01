import { useState } from 'react'
import './App.css'

function App() {
  // -----------------------------
  // APP STATE
  // -----------------------------

  const [loggedIn, setLoggedIn] = useState(false)

  const [accessing, setAccessing] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)

  const [credentialActive, setCredentialActive] = useState(true)

  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showReader, setShowReader] = useState(false)

  const [readerStatus, setReaderStatus] = useState('ready')

  const [activeTab, setActiveTab] = useState('home')

  const [studentNumber, setStudentNumber] = useState('')

  const [accessHistory, setAccessHistory] = useState([
    {
      location: 'Main Campus',
      time: '14:12',
      date: 'Today',
    },
    {
      location: 'Computer Lab',
      time: '16:48',
      date: 'Yesterday',
    },
    {
      location: 'Residence',
      time: '21:03',
      date: '30 Sep',
    },
  ])

  // -----------------------------
  // LOGIN
  // -----------------------------

  const handleLogin = () => {
    setLoggedIn(true)
  }

  // -----------------------------
  // ACCESS
  // -----------------------------

  const handleAccess = () => {
    setAccessing(true)
    setAccessGranted(false)
    setAccessDenied(false)

    setReaderStatus('scanning')

    setTimeout(() => {
      setAccessing(false)

      if (credentialActive) {
        setAccessGranted(true)
        setReaderStatus('granted')

        const newEntry = {
          location: 'Wits Library',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          date: 'Today',
        }

        setAccessHistory((previousHistory) => [
          newEntry,
          ...previousHistory,
        ])
      } else {
        setAccessDenied(true)
        setReaderStatus('denied')
      }
    }, 2500)
  }

  const resetAccess = () => {
    setAccessGranted(false)
    setAccessDenied(false)
    setReaderStatus('ready')
  }

  // -----------------------------
  // CREDENTIAL
  // -----------------------------

  const suspendCredential = () => {
    setCredentialActive(false)
  }

  const activateCredential = () => {
    setCredentialActive(true)
  }

  // -----------------------------
  // BOTTOM NAVIGATION
  // -----------------------------

  const BottomNav = () => (
    <nav className="bottom-nav">

      <button
        className={activeTab === 'home' ? 'nav-item active' : 'nav-item'}
        onClick={() => setActiveTab('home')}
      >
        <span>⌂</span>
        <small>Home</small>
      </button>

      <button
        className={activeTab === 'access' ? 'nav-item active' : 'nav-item'}
        onClick={() => setActiveTab('access')}
      >
        <span>◉</span>
        <small>Access</small>
      </button>

      <button
        className={activeTab === 'id' ? 'nav-item active' : 'nav-item'}
        onClick={() => setActiveTab('id')}
      >
        <span>▣</span>
        <small>Digital ID</small>
      </button>

      <button
        className={
          activeTab === 'settings'
            ? 'nav-item active'
            : 'nav-item'
        }
        onClick={() => setActiveTab('settings')}
      >
        <span>⚙</span>
        <small>Settings</small>
      </button>

    </nav>
  )

  // -----------------------------
  // LOGIN SCREEN
  // -----------------------------

  if (!loggedIn) {
    return (
      <div className="app">

        <div className="login-card">

          <div className="logo-mark">
            U
          </div>

          <div className="login-heading">
            <span className="eyebrow">DIGITAL CAMPUS IDENTITY</span>

            <h1>UniTap</h1>

            <p className="tagline">
              Your campus. Your identity. One tap.
            </p>
          </div>

          <div className="form-group">

            <label>University</label>

            <select>
              <option>Wits University</option>
              <option>University of Cape Town</option>
              <option>University of Pretoria</option>
            </select>

          </div>

          <div className="form-group">

            <label>Student number</label>

            <input
              type="text"
              placeholder="Enter student number"
              value={studentNumber}
              onChange={(event) =>
                setStudentNumber(event.target.value)
              }
            />

          </div>

          <button
            className="login-button"
            onClick={handleLogin}
          >
            Continue
          </button>

          <p className="demo-text">
            UniTap Demo · Prototype
          </p>

        </div>

      </div>
    )
  }

  // -----------------------------
  // HOW IT WORKS
  // -----------------------------

  if (showHowItWorks) {
    return (
      <div className="how-screen">

        <div className="how-header">

          <button
            className="back-button"
            onClick={() => setShowHowItWorks(false)}
          >
            ←
          </button>

          <div>
            <span className="how-label">
              UNiTAP
            </span>

            <h1>How It Works</h1>
          </div>

        </div>

        <p className="how-intro">
          UniTap connects your university identity to a
          secure digital credential on your phone.
        </p>

        <div className="how-flow">

          <div className="flow-step">

            <div className="flow-icon">
              📱
            </div>

            <div>
              <span>01</span>

              <h2>Your Phone</h2>

              <p>
                Your phone stores your UniTap digital
                credential.
              </p>
            </div>

          </div>

          <div className="flow-line"></div>

          <div className="flow-step">

            <div className="flow-icon">
              🪪
            </div>

            <div>
              <span>02</span>

              <h2>Digital Credential</h2>

              <p>
                Your university identity is linked to an
                authorised digital credential.
              </p>
            </div>

          </div>

          <div className="flow-line"></div>

          <div className="flow-step">

            <div className="flow-icon">
              📡
            </div>

            <div>
              <span>03</span>

              <h2>Campus Reader</h2>

              <p>
                Your phone communicates with a compatible
                access reader when you tap.
              </p>
            </div>

          </div>

          <div className="flow-line"></div>

          <div className="flow-step">

            <div className="flow-icon">
              🔐
            </div>

            <div>
              <span>04</span>

              <h2>Credential Verification</h2>

              <p>
                The system checks whether your credential
                is valid and authorised for that location.
              </p>
            </div>

          </div>

          <div className="flow-line"></div>

          <div className="flow-step final-step">

            <div className="flow-icon">
              ✓
            </div>

            <div>
              <span>05</span>

              <h2>Access Decision</h2>

              <p>
                If everything is valid, access is granted.
                If not, access is denied.
              </p>
            </div>

          </div>

        </div>

        <div className="prototype-note">

          <strong>
            Prototype concept
          </strong>

          <p>
            This demonstration simulates the student
            experience. It is not connected to university
            systems or live access-control infrastructure.
          </p>

        </div>

      </div>
    )
  }

  // -----------------------------
  // ACCESSING / SCANNING
  // -----------------------------

  if (accessing) {
    return (
      <div className="access-screen">

        <div className="access-container">

          <div className="nfc-animation">
            📡
          </div>

          <h1>Scanning...</h1>

          <p className="access-location">
            Wits University · Library
          </p>

          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>

          <p className="verification-text">
            Verifying digital credential
          </p>

        </div>

      </div>
    )
  }

  // -----------------------------
  // ACCESS GRANTED
  // -----------------------------

  if (accessGranted) {
    return (
      <div className="access-screen">

        <div className="access-container">

          <div className="success-icon">
            ✓
          </div>

          <h1>Access Granted</h1>

          <p className="access-location">
            Wits University · Library
          </p>

          <div className="verification-card">

            <div className="verification-row">
              <span>Student</span>
              <strong>Bonolo Morojele</strong>
            </div>

            <div className="verification-row">
              <span>Credential</span>
              <strong>Verified</strong>
            </div>

            <div className="verification-row">
              <span>Status</span>
              <strong>Active</strong>
            </div>

          </div>

          <p className="verified-message">
            Your digital credential has been successfully
            verified.
          </p>

          <button
            className="access-button"
            onClick={resetAccess}
          >
            Done
          </button>

        </div>

      </div>
    )
  }

  // -----------------------------
  // ACCESS DENIED
  // -----------------------------

  if (accessDenied) {
    return (
      <div className="access-screen">

        <div className="access-container">

          <div className="denied-icon">
            ✕
          </div>

          <h1>Access Denied</h1>

          <p className="access-location">
            Wits University · Library
          </p>

          <div className="verification-card">

            <div className="verification-row">
              <span>Student</span>
              <strong>Bonolo Morojele</strong>
            </div>

            <div className="verification-row">
              <span>Credential</span>
              <strong>Suspended</strong>
            </div>

            <div className="verification-row">
              <span>Access</span>
              <strong className="denied-text">
                Not Authorised
              </strong>
            </div>

          </div>

          <p className="verified-message">
            Your digital credential is currently suspended.
          </p>

          <button
            className="access-button"
            onClick={resetAccess}
          >
            Return to UniTap
          </button>

        </div>

      </div>
    )
  }

  // -----------------------------
  // SIMULATED ACCESS READER
  // -----------------------------

  if (showReader) {
    return (
      <div className="reader-screen">

        <div className="reader-header">

          <button
            className="back-button"
            onClick={() => setShowReader(false)}
          >
            ←
          </button>

          <div>
            <span className="how-label">
              UNiTAP
            </span>

            <h1>Access Reader</h1>
          </div>

        </div>

        <div
          className={`reader-device ${readerStatus}`}
        >

          <div className="reader-brand">
            UNiTAP
          </div>

          <div className="reader-light"></div>

          <div className="reader-icon">

            {readerStatus === 'ready' && '📡'}

            {readerStatus === 'scanning' && '📱'}

            {readerStatus === 'granted' && '✓'}

            {readerStatus === 'denied' && '✕'}

          </div>

          <h2>

            {readerStatus === 'ready' &&
              'READY TO TAP'}

            {readerStatus === 'scanning' &&
              'SCANNING'}

            {readerStatus === 'granted' &&
              'ACCESS GRANTED'}

            {readerStatus === 'denied' &&
              'ACCESS DENIED'}

          </h2>

          <p>

            {readerStatus === 'ready' &&
              'Hold your phone near the reader'}

            {readerStatus === 'scanning' &&
              'Verifying digital credential...'}

            {readerStatus === 'granted' &&
              'Credential verified successfully'}

            {readerStatus === 'denied' &&
              'Credential is not authorised'}

          </p>

        </div>

        <div className="reader-info">

          <span>LOCATION</span>

          <strong>
            Wits Library
          </strong>

        </div>

        <div className="reader-demo-note">

          <strong>
            Simulated access reader
          </strong>

          <p>
            This reader is part of the UniTap prototype.
            A production version would connect to compatible
            campus access-control infrastructure.
          </p>

        </div>

      </div>
    )
  }

  // -----------------------------
  // ACCESS TAB
  // -----------------------------

  if (activeTab === 'access') {
    return (
      <div className="mobile-app">

        <div className="page-header">

          <span className="eyebrow">
            UNiTAP
          </span>

          <h1>
            Campus Access
          </h1>

          <p>
            Use your digital credential to access campus
            spaces.
          </p>

        </div>

        <div className="access-main-card">

          <div className="access-symbol">
            📡
          </div>

          <h2>
            Ready to tap
          </h2>

          <p>
            Hold your phone near a compatible UniTap reader.
          </p>

          <button
            className="access-button"
            onClick={handleAccess}
          >
            Tap to Access
          </button>

        </div>

        <div className="access-info-card">

          <span>
            CURRENT CREDENTIAL
          </span>

          <div className="access-info-row">

            <strong>
              Bonolo Morojele
            </strong>

            <span
              className={
                credentialActive
                  ? 'status-badge active'
                  : 'status-badge suspended'
              }
            >
              {credentialActive ? 'ACTIVE' : 'SUSPENDED'}
            </span>

          </div>

        </div>

        <button
          className="secondary-card-button"
          onClick={() => setShowHowItWorks(true)}
        >
          How UniTap works →
        </button>

        <button
          className="reader-demo-button"
          onClick={() => setShowReader(true)}
        >
          View Access Reader
        </button>

        <BottomNav />

      </div>
    )
  }

  // -----------------------------
  // DIGITAL ID TAB
  // -----------------------------

  if (activeTab === 'id') {
    return (
      <div className="mobile-app">

        <div className="page-header">

          <span className="eyebrow">
            UNiTAP
          </span>

          <h1>
            Digital ID
          </h1>

          <p>
            Your university credential.
          </p>

        </div>

        <div className="digital-id-card">

          <div className="id-card-top">

            <span>
              UNiTAP
            </span>

            <span>
              DIGITAL CREDENTIAL
            </span>

          </div>

          <div className="id-card-middle">

            <div className="id-avatar">
              B
            </div>

            <div>

              <span>
                STUDENT
              </span>

              <h2>
                Bonolo Morojele
              </h2>

              <p>
                12345678
              </p>

            </div>

          </div>

          <div className="id-card-bottom">

            <span>
              UNIVERSITY CAMPUS
            </span>

            <span className="id-status">
              ● {credentialActive ? 'ACTIVE' : 'SUSPENDED'}
            </span>

          </div>

        </div>

        <div className="credential-details">

          <div>
            <span>
              Credential status
            </span>

            <strong>
              {credentialActive ? 'Active' : 'Suspended'}
            </strong>
          </div>

          <div>
            <span>
              Student number
            </span>

            <strong>
              12345678
            </strong>
          </div>

          <div>
            <span>
              Institution
            </span>

            <strong>
              University Campus
            </strong>
          </div>

        </div>

        <div className="credential-management">

          <div className="management-label">

            <strong>
              Credential security
            </strong>

            <p>
              Manage your digital credential if your phone
              is lost or stolen.
            </p>

          </div>

          {credentialActive ? (

            <button
              className="suspend-button"
              onClick={suspendCredential}
            >
              Suspend Credential
            </button>

          ) : (

            <button
              className="activate-button"
              onClick={activateCredential}
            >
              Reactivate Credential
            </button>

          )}

        </div>

        <BottomNav />

      </div>
    )
  }

  // -----------------------------
  // SETTINGS TAB
  // -----------------------------

  if (activeTab === 'settings') {
    return (
      <div className="mobile-app">

        <div className="page-header">

          <span className="eyebrow">
            UNiTAP
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your account and preferences.
          </p>

        </div>

        <div className="profile-settings-card">

          <div className="settings-avatar">
            B
          </div>

          <div>

            <strong>
              Bonolo Morojele
            </strong>

            <span>
              12345678
            </span>

          </div>

        </div>

        <div className="settings-section">

          <span className="settings-section-title">
            ACCOUNT
          </span>

          <button className="settings-row">

            <span>
              University
            </span>

            <strong>
              University Campus →
            </strong>

          </button>

          <button className="settings-row">

            <span>
              Student number
            </span>

            <strong>
              12345678 →
            </strong>

          </button>

        </div>

        <div className="settings-section">

          <span className="settings-section-title">
            SECURITY
          </span>

          <button
            className="settings-row"
            onClick={() => setActiveTab('id')}
          >

            <span>
              Digital credential
            </span>

            <strong>
              {credentialActive
                ? 'Active →'
                : 'Suspended →'}
            </strong>

          </button>

          <button
            className="settings-row"
            onClick={() => setShowHowItWorks(true)}
          >

            <span>
              How UniTap works
            </span>

            <strong>
              →
            </strong>

          </button>

        </div>

        <div className="prototype-label">
          UniTap Prototype · Not connected to university
          systems
        </div>

        <BottomNav />

      </div>
    )
  }

  // -----------------------------
  // HOME
  // -----------------------------

  return (
    <div className="mobile-app">

      <div className="top-bar">

        <div>
          <span className="eyebrow">
            UNiTAP
          </span>

          <div className="top-title">
            Digital Campus Identity
          </div>
        </div>

        <div className="profile-circle">
          B
        </div>

      </div>

      <div className="welcome">

        <span>
          GOOD EVENING
        </span>

        <h1>
          Bonolo 👋
        </h1>

      </div>

      {/* DIGITAL STUDENT CARD */}

      <div className="student-card">

        <div className="card-top">

          <span>
            UNIVERSITY CAMPUS
          </span>

          <span>
            DIGITAL ID
          </span>

        </div>

        <div className="card-content">

          <div>

            <p className="card-label">
              STUDENT
            </p>

            <h2>
              Bonolo Morojele
            </h2>

            <p>
              12345678
            </p>

          </div>

          <div className="card-status">

            <span
              className={
                credentialActive
                  ? 'active-dot'
                  : 'inactive-dot'
              }
            ></span>

            {credentialActive
              ? 'ACTIVE'
              : 'SUSPENDED'}

          </div>

        </div>

        <div className="card-bottom">

          <span>
            DIGITAL CREDENTIAL
          </span>

          <span>
            UNiTAP
          </span>

        </div>

      </div>

      {/* ACCESS BUTTON */}

      <button
        className="access-button"
        onClick={handleAccess}
      >
        Tap to Access
      </button>

      {/* ACCESS HISTORY */}

      <section className="section">

        <div className="section-heading">

          <h2>
            Access History
          </h2>

          <span>
            Recent
          </span>

        </div>

        <div className="history-card">

          {accessHistory.map((entry, index) => (

            <div
              className="history-item"
              key={`${entry.location}-${entry.time}-${index}`}
            >

              <div className="history-icon">
                ✓
              </div>

              <div className="history-details">

                <strong>
                  {entry.location}
                </strong>

                <span>
                  Access granted
                </span>

              </div>

              <div className="history-time">

                <strong>
                  {entry.time}
                </strong>

                <span>
                  {entry.date}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CREDENTIAL MANAGEMENT */}

      <section className="section">

        <div className="section-heading">

          <h2>
            Credential
          </h2>

          <span>
            Security
          </span>

        </div>

        <div className="credential-management">

          <div className="management-label">

            <strong>
              Digital credential
            </strong>

            <p>
              {credentialActive
                ? 'Your credential is active and ready for access.'
                : 'Your credential is suspended and cannot be used for access.'}
            </p>

          </div>

          {credentialActive ? (

            <button
              className="suspend-button"
              onClick={suspendCredential}
            >
              Suspend
            </button>

          ) : (

            <button
              className="activate-button"
              onClick={activateCredential}
            >
              Reactivate
            </button>

          )}

        </div>

      </section>

      {/* HOW IT WORKS */}

      <div className="how-it-works-card">

        <div>

          <span className="how-label">
            UNDERSTAND UNiTAP
          </span>

          <h2>
            How does UniTap work?
          </h2>

          <p>
            See how your digital credential connects your
            phone to secure campus access.
          </p>

        </div>

        <button
          className="how-button"
          onClick={() => setShowHowItWorks(true)}
        >
          Explore →
        </button>

      </div>

      {/* CAMPUS SERVICES */}

      <section className="services">

        <div className="section-heading">

          <h2>
            Campus Services
          </h2>

        </div>

        <div className="service-grid">

          <div className="service-item">
            <span>▣</span>
            <p>Buildings</p>
          </div>

          <div className="service-item">
            <span>▤</span>
            <p>Library</p>
          </div>

          <div className="service-item">
            <span>⌂</span>
            <p>Residence</p>
          </div>

          <div className="service-item">
            <span>▤</span>
            <p>Printing</p>
          </div>

        </div>

      </section>

      <div className="prototype-label">
        UniTap Prototype · Not connected to university systems
      </div>

      <BottomNav />

    </div>
  )
}

export default App