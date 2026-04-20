import { useState } from 'react';

import PropTypes from 'prop-types';
import { UserPlus } from 'lucide-react';

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #e8e8e6',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1a1a1a',
    outline: 'none',
    background: '#fff',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 16px',
    border: 'none',
    borderRadius: '8px',
    background: '#2563eb',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  error: {
    fontSize: '13px',
    color: '#dc2626',
    marginTop: '6px',
  },
};

export default function InviteForm({ onInvite }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter an email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onInvite(trimmed);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.row}>
        <input
          style={styles.input}
          type='text'
          placeholder='Enter email address…'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
        />
        <button style={styles.button} type='submit'>
          <UserPlus size={14} />
          Send Invite
        </button>
      </div>
      {error && <div style={styles.error}>{error}</div>}
    </form>
  );
}

InviteForm.propTypes = {
  onInvite: PropTypes.func.isRequired,
};
