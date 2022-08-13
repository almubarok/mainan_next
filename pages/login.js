import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChangeEmail = (sate) => {
    setUser((current) => ({ ...current, email: sate.target.value }));
  };

  const handleChangePassword = (e) => {
    setUser((current) => ({ ...current, password: e.target.value }));
  };

  const handleSubmitLogin = (e) => {
    // const form = new FormData() // untuk kirim file ke backend

    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setMessage(res.message);
        setIsError(res.error);
        if (!res.error) {
          // ! artinya not (tidak / negasi)
          // lempar ke home
          setCookie(null, 'usr_token', res.result.token); // set token ke cookie
          setCookie(null, 'usr_role', res.result.role); // set token ke cookie
          if (res.result.role == 'admin') {
            // kalau role user adalah admin, maka lempar ke /admin
            router.push('/admin');
          } else if (res.result.role == 'user') {
            // kalau role user adalah user, maka lempar ke /
            router.push('/user');
          }
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitLogin}>
        <legend>
          email &nbsp;
          <input onChange={handleChangeEmail} type='email' />
        </legend>
        <legend>
          password &nbsp;
          <input onChange={handleChangePassword} type='password' />
        </legend>
        <div style={{ color: isError ? 'red' : 'green' }}>{message}</div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
