import { useState } from 'react';

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

const menuItemDanger = {
  display: 'block',
  width: '100%',
  padding: '8px 14px',
  fontSize: '13px',
  color: '#dc2626',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
};

/* ── ActionsMenu ─────────────────────────────────────── */

function ActionsMenu({ onRemove }) {
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
            <button style={menuItemDanger} onClick={() => { close(); onRemove(); }}>
              Remove
            </button>
          </div>
        </>
      )}
    </span>
  );
}

ActionsMenu.propTypes = {
  onRemove: PropTypes.func.isRequired,
};

/* ── AdminsTable ─────────────────────────────────────── */

const COLUMNS = ['Name', 'Email', 'Date Added', 'Actions'];

export default function AdminsTable({ admins, onRemove }) {
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
        {admins.length === 0 ? (
          <tr>
            <td colSpan={COLUMNS.length} style={emptyMsg}>
              No admins found.
            </td>
          </tr>
        ) : (
          admins.map((admin) => (
            <tr key={admin.id}>
              <td style={{ ...tdStyle, fontWeight: '500', color: '#1a1a1a' }}>
                {admin.name}
              </td>
              <td style={tdStyle}>{admin.email}</td>
              <td style={tdStyle}>{formatDate(admin.addedDate)}</td>
              <td style={tdStyle}>
                <ActionsMenu onRemove={() => onRemove(admin)} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

AdminsTable.propTypes = {
  admins: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};
