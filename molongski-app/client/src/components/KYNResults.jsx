import React from 'react';
import ScoreRing from './ScoreRing';

export default function KYNResults({ kyn, onReset }) {
  const verdictColor =
    kyn.verdict === 'APPLY' ? 'var(--green)' : kyn.verdict === 'ASK QUESTIONS' ? 'var(--orange)' : 'var(--red)';
  const pakwanColor = kyn.pakwanTest === 'PASS' ? 'var(--green)' : 'var(--red)';

  return (
    <section className="kyn-section fade-up">
      <h2 className="section-title">KYN Analysis</h2>

      <div className="score-header">
        <ScoreRing score={kyn.fitScore} />
        <div className="badges-col">
          <span className="verdict-badge" style={{ background: verdictColor }}>{kyn.verdict}</span>
          <span className="pakwan-badge" style={{ background: pakwanColor }}>
            Pakwan: {kyn.pakwanTest}
          </span>
        </div>
      </div>

      <p className="score-breakdown">{kyn.scoreBreakdown}</p>
      {kyn.pakwanReason && <p className="pakwan-reason">Pakwan reason: {kyn.pakwanReason}</p>}

      <div className="two-col-grid">
        <div className="card">
          <h3>Top Signals</h3>
          <ul>
            {kyn.topSignals.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Keywords</h3>
          <div className="pills">
            {kyn.keywords.map((k, i) => (
              <span className="pill" key={i}>{k}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="card full-width">
        <h3>Pitch Angles</h3>
        <ol>
          {kyn.pitchAngles.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </div>

      <button className="reset-btn" onClick={onReset}>Reset</button>
    </section>
  );
}
