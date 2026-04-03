import mongoose, { type ClientSession } from 'mongoose';

import { isTransactionUnsupportedError } from '@/utils/is-transaction-unsupported-error';
import { tryCatch } from '@/lib/try-catch';


interface WithSessionTransactionOptions<T> {
  work: (session: ClientSession) => Promise<T>;
  onUnsupported: () => Promise<T>;
}

export const withSessionTransaction = async <T>(options: WithSessionTransactionOptions<T>): Promise<T> => {
  const session = await mongoose.startSession();

  const res = await tryCatch(session.withTransaction(async () => {
    return options.work(session);
  }));

  await session.endSession();

  if (res.error){
    if (isTransactionUnsupportedError(res.error)) return await options.onUnsupported();
    throw res.error;
  }
  
  return res.data;
}

interface WithUndoAfterOptions<T> {
  first: () => Promise<T>;
  after: (value: T) => Promise<void>;
  undo?: (value: T) => Promise<void>;
}

export const withUndoAfter = async <T>({ first, after, undo }: WithUndoAfterOptions<T>): Promise<T> => {
  const valueRes = await tryCatch(first());
  if(valueRes.error) throw valueRes.error;

  const afterRes = await tryCatch(after(valueRes.data));
  if(afterRes.error) {
    if(undo) await undo(valueRes.data);
    throw afterRes.error;
  }

  return valueRes.data
}
