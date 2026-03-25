import React, { useState } from 'react';
import JobInput from './components/JobInput';
import KYNResults from './components/KYNResults';
import ProposalTabs from './components/ProposalTabs';

export default function App() {
  const [jobPost, setJobPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobPost }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Analysis failed.');
      } else {
        setResult(data.data);
      }
    } catch (err) {
      setError('Network error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setJobPost('');
    setError('');
  };

  return (
    <div className="app">
      <JobInput
        value={jobPost}
        onChange={setJobPost}
        onSubmit={handleAnalyze}
        loading={loading}
        error={error}
      />

      {result && result.kyn && (
        <KYNResults kyn={result.kyn} onReset={handleReset} />
      )}

      {result && result.proposals && (
        <ProposalTabs proposals={result.proposals} />
      )}
    </div>
  );
}
