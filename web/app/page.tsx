
'use client';

import { Button } from '../src/web/components/Button';

export default function Home() {

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Flags App</h1>
      <a href="/game" className='btn btn-primary'>Get Started</a>
    </div>
  );
}
