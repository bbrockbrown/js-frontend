import { useCallback, useEffect, useRef, useState } from 'react';

import donationService from '@/services/donationService';

const LIMIT = 25;

export default function useDonations(filters = {}) {
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep a ref so mutations can always re-fetch with the latest filters
  // without needing them as effect dependencies
  const filtersRef = useRef(filters);
  useEffect(() => { filtersRef.current = filters; });

  const fetchDonations = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const { donations: rows, total: count } = await donationService.getAll({
        ...params,
        limit: LIMIT,
      });
      setDonations(rows);
      setTotal(count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce filter-driven fetches; destructure to avoid firing on every
  // render when the parent creates a new filters object each time
  const { search, status, minAmount, maxAmount, page } = filters;
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDonations({ search, status, minAmount, maxAmount, page });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, status, minAmount, maxAmount, page, fetchDonations]);

  const createDonation = async (data) => {
    await donationService.create(data);
    await fetchDonations(filtersRef.current);
  };

  const updateDonation = async (id, data) => {
    await donationService.update(id, data);
    await fetchDonations(filtersRef.current);
  };

  const deleteDonation = async (id) => {
    await donationService.delete(id);
    await fetchDonations(filtersRef.current);
  };

  return {
    donations,
    total,
    totalPages: Math.ceil(total / LIMIT),
    loading,
    error,
    createDonation,
    updateDonation,
    deleteDonation,
  };
}
