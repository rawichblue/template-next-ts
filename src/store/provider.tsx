'use client';
import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export default function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef(store);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
