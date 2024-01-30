'use client';
import FormEvent from '@/components/FormEvent';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';

const CreateEventForm = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      axios
        .get('http://localhost:8000/user/role', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          if (userData.role === 'PARTICIPANT') {
            router.push('/');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <>
      <Header />
      <section className="wrapper flex flex-col items-center gap-4">
        <h3 className=" h3-bold justify-center text-center">CREATE EVENT</h3>
        <div className="w-full  items-center justify-center">
          <FormEvent />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreateEventForm;
