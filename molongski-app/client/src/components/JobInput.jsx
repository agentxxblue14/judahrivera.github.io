import React from 'react';

export default function JobInput({ value, onChange, onSubmit, loading, error }) {
  return (
    <section className="input-section">
      <span className="badge">MOLONGSKI METHOD</span>
      <h1 className="title">Proposal Generator</h1>
      <p className="subtitle">
        Paste a job post. Get a KYN score + 3 KISS proposals. No Basta Basta.
      </p>
      <textarea
        className="job-textarea"
        placeholder="Paste the full job post here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ minHeight: '200px' }}
      />
      <div className="char-count">{value.length} characters</div>
      <button
        className="analyze-btn"
        onClick={onSubmit}
        disabled={!value.trim() || loading}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Analyzing...
          </>
        ) : (
          'Analyze & Generate'
        )}
      </button>
      {error && <div className="error-box">{error}</div>}
    </section>
  );
}
