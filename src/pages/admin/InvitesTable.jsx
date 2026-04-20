import { useState } from 'react';

import Badge from '@/common/components/atoms/Badge';
import { formatDate } from '@/utils/format';
import PropTypes from 'prop-types';

/* ── styles ─────────────────────────────────────────── */

const tableStyle = { width: '100%', borderCollapse: 'collapse' };

const thStyle = {
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: '600',
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  paddingBottom: '12px',
  borderBottom: '1px solid #f0f0ee',
};

const tdStyle = {
  padding: '14px 0',
  fontSize: '14px',
  color: '#374151',
  borderBottom: '1px solid #f9f9f8',
};

const emptyMsg = {
  padding: '40px 0',
  textAlign: 'center',
  fontSize: '14px',
  color: '#6b7280',
};

const actionsBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#9ca3af',
  fontSize: '18px',
  letterSpacing: '2px',
  padding: '0 4px',
  lineHeight: 1,
  position: 'relative',
};

const menuStyle = {
  position: 'absolute',
  right: 0,
  top: '100%',
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,.1)',
  zIndex: 10,
  minWidth: '120px',
  overflow: 'hidden',
};

const menuItem = {
  display: 'block',
  width: '100%',
  padding: '8px 14px',
  fontSize: '13px',
  color: '#374151',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
};

const menuItemDanger = { ...menuItem, color: '#dc2626' };

/* ── ActionsMenu ─────────────────────────────────────── */

function ActionsMenu({ onResend, onRevoke }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <span style={{ position: 'relative' }}>
      <button style={actionsBtnStyle} onClick={() => setOpen((v) => !v)}>
        ···
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={close} />
          <div style={menuStyle}>
            <button style={menuItem} onClick={() => { close(); onResend(); }}>
              Resend
            </button>
            <button style={menuItemDanger} onClick={() => { close(); onRevoke(); }}>
              Revoke
            </button>
          </div>
        </>
      )}
    </span>
  );
}

ActionsMenu.propTypes = {
  onResend: PropTypes.func.isRequired,
  onRevoke: PropTypes.func.isRequired,
};

/* ── InvitesTable ────────────────────────────────────── */

const COLUMNS = ['Email', 'Status', 'Date Sent', 'Actions'];

export default function InvitesTable({ invites, onResend, onRevoke }) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {COLUMNS.map((h) => (
            <th key={h} style={thStyle}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {invites.length === 0 ? (
          <tr>
            <td colSpan={COLUMNS.length} style={emptyMsg}>
              No invites sent yet.
            </td>
          </tr>
        ) : (
          invites.map((invite) => (
            <tr key={invite.id}>
              <td style={{ ...tdStyle, fontWeight: '500', color: '#1a1a1a' }}>
                {invite.email}
              </td>
              <td style={tdStyle}>
                <Badge status={invite.status} />
              </td>
              <td style={tdStyle}>{formatDate(invite.sentDate)}</td>
              <td style={tdStyle}>
                <ActionsMenu
                  onResend={() => onResend(invite)}
                  onRevoke={() => onRevoke(invite)}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

InvitesTable.propTypes = {
  invites: PropTypes.array.isRequired,
  onResend: PropTypes.func.isRequired,
  onRevoke: PropTypes.func.isRequired,
};
