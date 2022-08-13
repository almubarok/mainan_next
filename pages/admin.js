import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    // handle kalau user belum login (di cookie tidak ada usr_token)
    // maka akan di lempar ke /login
    if (!cookies.usr_token) {
      router.push('/login');
    }
    // handle kalau role user adalah user (ambil dari cookie key nya usr_role)
    // maka lempar ke /user, karena page ini khusus untuk role admin
    if (cookies.usr_role == 'user') {
      router.push('/user');
    }
  }, []);

  return (
    <div>
      <Navbar />
      HALAMAN ADMIN SETELAH LOGIN
    </div>
  );
}
