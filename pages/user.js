import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function User() {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    // handle kalau user belum login (di cookie tidak ada usr_token)
    // maka akan di lempar ke /login
    if (!cookies.usr_token) {
      router.push('/login');
    }
    // handle kalau role user adalah admin (ambil dari cookie key nya usr_role)
    // maka lempar ke /admin, karena page ini khusus untuk role user
    if (cookies.usr_role == 'admin') {
      router.push('/admin');
    }
  }, []);

  return (
    <div>
      <Navbar />
      HALAMAN USER SETELAH LOGIN
    </div>
  );
}
