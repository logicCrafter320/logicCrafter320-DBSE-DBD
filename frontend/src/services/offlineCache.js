// Web implementation equivalent for Drift/Isar Local Offline Caching
const DRIFT_CACHE_KEY = 'drift_isar_offline_properties';
const SYNC_QUEUE_KEY = 'drift_isar_pending_sync';

export function savePropertiesToDriftCache(properties) {
  try {
    localStorage.setItem(DRIFT_CACHE_KEY, JSON.stringify(properties));
    localStorage.setItem('drift_last_sync', new Date().toISOString());
    console.log('📦 [Drift/Isar Engine] Cached properties locally for offline site visits.');
  } catch (err) {
    console.error('Drift Cache error:', err);
  }
}

export function getPropertiesFromDriftCache() {
  try {
    const data = localStorage.getItem(DRIFT_CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}

export function getLastDriftSyncTime() {
  return localStorage.getItem('drift_last_sync') || 'Never';
}