// Frontend mock for volunteer item check-in.
// When the backend is ready, these helpers should call:
//   POST /api/items/checkin            (replaces addItem)
//   GET  /api/items/lookup?barcode=... (replaces lookupByBarcode)
// instead of the localStorage / mockData fallbacks below.

import { MOCK_CATEGORIES } from '@/pages/inventory/mockData';

const STORAGE_KEY = 'pantry_volunteer_added_items';

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAddedItems() {
  return readAll();
}

export function addItem({
  name,
  category,
  expirationMonth,
  expirationYear,
  quantity,
  barcode,
}) {
  const record = {
    name,
    category,
    expirationMonth,
    expirationYear,
    quantity,
    barcode: barcode || null,
    timestamp: new Date().toISOString(),
  };
  const all = readAll();
  all.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return record;
}

// TODO: replace with backend lookup. For now this always returns null,
// meaning "barcode not recognized" so the user fills the name themselves.
// The barcode is still recorded on the saved item for traceability.
// eslint-disable-next-line no-unused-vars
export function lookupByBarcode(_barcode) {
  return null;
}

// Autocomplete helpers sourced from inventory mockData. The backend will
// expose these via /api/items and /api/categories once available.
export function getAllItemNames() {
  const seen = new Set();
  const names = [];
  for (const cat of MOCK_CATEGORIES) {
    for (const item of cat.items) {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        names.push(item.name);
      }
    }
  }
  return names.sort((a, b) => a.localeCompare(b));
}

export function getAllCategoryNames() {
  return MOCK_CATEGORIES.map((c) => c.name).sort((a, b) =>
    a.localeCompare(b)
  );
}

// Given an item name from MOCK_CATEGORIES, return the category it belongs to.
// Used to auto-populate the category field when the user picks a known item.
export function findCategoryForItem(itemName) {
  if (!itemName) return null;
  const target = itemName.trim().toLowerCase();
  for (const cat of MOCK_CATEGORIES) {
    if (cat.items.some((i) => i.name.toLowerCase() === target)) {
      return cat.name;
    }
  }
  return null;
}
