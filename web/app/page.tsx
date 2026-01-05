
'use client';

import { useUser } from '../src/shared/hooks/useUser';
import { Button } from '../src/web/components/Button';

export default function Home() {
  const { user, loading, error } = useUser('1');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Band App</h1>
      {user && (
        <div className="mb-4">
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <Button onClick={() => console.log('Clicked!')}>
        Get Started
      </Button>
    </div>
  );
}
