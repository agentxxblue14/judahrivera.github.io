import React, { useState } from 'react';
import CopyButton from './CopyButton';

const TABS = [
  { key: 'primary', label: 'Primary' },
  { key: 'formal', label: 'Formal' },
  { key: 'personality', label: 'Personality' },
];

export default function ProposalTabs({ proposals }) {
  const [active, setActive] = useState('primary');
  const text = proposals[active] || '';
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <section className="proposals-section fade-up">
      <h2 className="section-title">KISS Proposals</h2>

      <div className="tab-bar">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tab ${active === t.key ? 'active' : ''}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="proposal-box">
        <CopyButton text={text} />
        <pre className="proposal-text">{text}</pre>
        <div className="word-count">{wordCount} words</div>
      </div>

      <p className="note">Social proof links already included in every variant.</p>
    </section>
  );
}
