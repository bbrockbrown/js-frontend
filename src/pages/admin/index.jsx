import { useState } from 'react';

import Card from '@/common/components/atoms/Card';
import { MOCK_ADMINS, MOCK_INVITES } from '@/utils/adminData';

import AdminsTable from './AdminsTable';
import InviteForm from './InviteForm';
import InvitesTable from './InvitesTable';

/* ── styles ─────────────────────────────────────────── */

const styles = {
  main: {
    flex: 1,
    padding: '36px 40px',
    overflowY: 'auto',
    minHeight: '100vh',
  },
  topRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '28px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
  },
  sectionHeader: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  sectionSubtitle: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '16px',
    marginTop: '-10px',
  },
  divider: {
    borderTop: '1px solid #f0f0ee',
    margin: '28px 0',
  },
};

/* ── AdminPage ───────────────────────────────────────── */

export default function AdminPage() {
  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [invites, setInvites] = useState(MOCK_INVITES);

  const handleInvite = (email) => {
    const newInvite = {
      id: Date.now(),
      email,
      status: 'pending',
      sentDate: new Date().toISOString().slice(0, 10),
    };
    setInvites((prev) => [newInvite, ...prev]);
  };

  const handleResend = (invite) => {
    setInvites((prev) =>
      prev.map((i) =>
        i.id === invite.id
          ? { ...i, status: 'pending', sentDate: new Date().toISOString().slice(0, 10) }
          : i,
      ),
    );
  };

  const handleRevoke = (invite) => {
    setInvites((prev) => prev.filter((i) => i.id !== invite.id));
  };

  const handleRemoveAdmin = (admin) => {
    setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
  };

  return (
    <main style={styles.main}>
      <div style={styles.topRow}>
        <div>
          <div style={styles.title}>Admin Management</div>
          <div style={styles.subtitle}>Invite and manage platform administrators.</div>
        </div>
      </div>

      <Card style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={styles.sectionHeader}>Invite a New Admin</div>
        <div style={styles.sectionSubtitle}>
          Send an email invite to grant someone administrator access.
        </div>
        <InviteForm onInvite={handleInvite} />
      </Card>

      <Card style={{ padding: '24px' }}>
        <div style={styles.sectionHeader}>Pending Invites</div>
        <InvitesTable
          invites={invites}
          onResend={handleResend}
          onRevoke={handleRevoke}
        />

        <div style={styles.divider} />

        <div style={styles.sectionHeader}>Current Admins</div>
        <AdminsTable admins={admins} onRemove={handleRemoveAdmin} />
      </Card>
    </main>
  );
}
