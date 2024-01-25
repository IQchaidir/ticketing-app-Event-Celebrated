'use client';
import FormEvent from '@/components/FormEvent';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CreateEventForm = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
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
    <section className="md:flex md:flex-col items-center py-5 md:py-10 ">
      <h3 className="wrapper h3-bold justify-center text-center">
        CREATE EVENT
      </h3>
      <div className="md:w-2/3 items-center justify-center">
        <FormEvent />
      </div>
    </section>
  );
};

export default CreateEventForm;
