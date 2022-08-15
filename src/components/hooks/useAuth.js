import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return user;
};

export default useAuth;
