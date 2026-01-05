import { useState, useEffect } from 'react';
import { User } from '../types';
// import { userService } from '../services/userService';

export const useUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await userService.getUser(id);
        // if (response.success) {
        //   setUser(response.data);
        // } else {
        //   setError(response.message || 'Failed to fetch user');
        // }
        
        // Mock data temporário
        setUser({ id, name: 'Mock User' } as User);
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};
