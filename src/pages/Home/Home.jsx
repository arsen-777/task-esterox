import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <div>
        <Link to="signUp">Sign Up</Link>
      </div>
      <div>
        <Link to="login">Login</Link>
      </div>
    </div>
  );
}
