export function isTransactionUnsupportedError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as { message?: string; code?: number; codeName?: string };
  const msg = e.message ?? '';
  if (msg.includes('Transaction numbers are only allowed on a replica set')) return true;
  if (msg.includes('Multidocument transactions require a replica set')) return true;
  if (msg.includes('Transactions are not supported')) return true;
  if (e.codeName === 'IllegalOperation' && msg.includes('transaction')) return true;
  return false;
}
