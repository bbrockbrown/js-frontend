import { useCallback, useEffect, useState } from 'react';

import Card from '@/common/components/atoms/Card';
import DeleteConfirmModal from '@/common/components/organisms/DeleteConfirmModal';
import DonationModal from '@/common/components/organisms/DonationModal';
import DonationTable from '@/common/components/organisms/DonationTable';
import donationService from '@/services/donationService';
import { Plus } from 'lucide-react';

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
  addBtn: {
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
  },
  filterBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '14px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchInput: {
    flex: '1 1 220px',
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
    minWidth: '180px',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
    background: '#fff',
    cursor: 'pointer',
  },
  amountInput: {
    width: '110px',
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
  },
  count: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '12px',
  },
};

/* ── component ───────────────────────────────────────── */

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(new Set());

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchDonations = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await donationService.getAll(filters);
      setDonations(data);
      setSelected(new Set());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce filter changes so we don't fire on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDonations({ search, status, minAmount, maxAmount });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, status, minAmount, maxAmount, fetchDonations]);

  const handleSelectChange = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = (selectAll) => {
    setSelected(selectAll ? new Set(donations.map((d) => d.id)) : new Set());
  };

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (d) => { setEditing(d); setModalOpen(true); };

  const handleSubmit = async (data) => {
    if (editing) {
      await donationService.update(editing.id, data);
    } else {
      await donationService.create(data);
    }
    fetchDonations({ search, status, minAmount, maxAmount });
  };

  const handleDelete = async () => {
    await donationService.delete(deleting.id);
    setDeleting(null);
    fetchDonations({ search, status, minAmount, maxAmount });
  };

  return (
    <main style={styles.main}>
      <div style={styles.topRow}>
        <div>
          <div style={styles.title}>Donations</div>
          <div style={styles.subtitle}>View and manage all donation records.</div>
        </div>
        <button style={styles.addBtn} onClick={openCreate}>
          <Plus size={14} /> Add Donation
        </button>
      </div>

      <Card style={{ padding: '24px' }}>
        <div style={styles.filterBar}>
          <input
            style={styles.searchInput}
            placeholder='Search by name or email…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            style={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value=''>All Status</option>
            <option value='sent'>Sent</option>
            <option value='pending'>Pending</option>
          </select>
          <input
            style={styles.amountInput}
            type='number'
            placeholder='Min Amount'
            min='0'
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
          <input
            style={styles.amountInput}
            type='number'
            placeholder='Max Amount'
            min='0'
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </div>

        {!loading && !error && (
          <div style={styles.count}>
            Showing {donations.length} donation{donations.length !== 1 ? 's' : ''}
          </div>
        )}

        <DonationTable
          donations={donations}
          loading={loading}
          error={error}
          selected={selected}
          onSelectChange={handleSelectChange}
          onSelectAll={handleSelectAll}
          onEdit={openEdit}
          onDelete={(d) => setDeleting(d)}
        />
      </Card>

      <DonationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        donation={editing}
      />

      <DeleteConfirmModal
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        donorName={deleting?.donor_name}
      />
    </main>
  );
}
