// pages/index.js
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Users from Azure SQL</h1>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
}
