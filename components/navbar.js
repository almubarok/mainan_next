import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const cookies = parseCookies();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(cookies.usr_token != null);
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    destroyCookie(null, 'usr_token');
    destroyCookie(null, 'usr_role');
    location.reload();
  };

  return (
    <div
      style={{
        width: '100vw',
        background: 'yellow',
        height: '50px',
      }}
    >
      <button>Home</button>
      <button>Products</button>
      <button>About me</button>
      {!isLogin && <button onClick={handleLogin}>Login</button>}
      {isLogin && <button>Profile</button>}
      {isLogin && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
