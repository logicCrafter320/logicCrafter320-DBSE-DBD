const KEY = 'ef_favorites';
const COL_KEY = 'ef_collections';

// ==========================================
// FAVORITES HELPERS
// ==========================================
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveFavorites(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('ef_favorites_updated'));
}

export function isFavorite(id) {
  return getFavorites().some((p) => String(p.id) === String(id));
}

export function toggleFavorite(property) {
  const list = getFavorites();
  const exists = list.find((p) => String(p.id) === String(property.id));
  let next;
  if (exists) {
    next = list.filter((p) => String(p.id) !== String(property.id));
  } else {
    next = [
      {
        id: property.id,
        title: property.title,
        price: property.price,
        city: property.city || property.location || '',
        location: property.location || property.city || '',
        property_type: property.property_type || 'Apartment',
        image_url: property.image_url,
        description: property.description,
        savedAt: Date.now(),
      },
      ...list,
    ];
  }
  saveFavorites(next);
  return !exists;
}

// ==========================================
// COLLECTIONS HELPERS (DEPOP / MOBBIN STYLE)
// ==========================================
export function getCollections() {
  try {
    return JSON.parse(localStorage.getItem(COL_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCollections(list) {
  localStorage.setItem(COL_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('ef_collections_updated'));
}

export function createCollection(name) {
  const list = getCollections();
  const col = {
    id: String(Date.now()),
    name: name || 'My Collection',
    propertyIds: [],
    createdAt: Date.now(),
  };
  saveCollections([col, ...list]);
  return col;
}

export function addToCollection(collectionId, propertyId) {
  const list = getCollections().map((c) => {
    if (c.id !== collectionId) return c;
    if (c.propertyIds.includes(propertyId)) return c;
    return { ...c, propertyIds: [...c.propertyIds, propertyId] };
  });
  saveCollections(list);
}