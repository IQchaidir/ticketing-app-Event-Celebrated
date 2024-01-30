import { fetchCategories } from '@/app/lib/api';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';

const CheckoutForm = () => {
  const [eventPrice, setEventPrice] = useState(null);
  const [title, setTitle] = useState('');
  const [coupon, setCoupons] = useState([]);
  const [refCoupons, setRefCoupons] = useState([]);
  const [points, setPoints] = useState(0);
  const [isPointsUsed, setIsPointsUsed] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [originalPrice, setOriginaPrice] = useState(0);

  const router = useRouter();

  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  };

  const searchParam = useSearchParams();
  const total = searchParam.get('totalPrice');
  const eventId = searchParam.get('eventId');
  const totalTicket = searchParam.get('totalTicket');

  const formattedTotalPrice = total ? formatRupiah(parseFloat(total)) : 'Rp 0';

  // Fetch informasi checkout dari backend
  useEffect(() => {
    const fetchCheckoutInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(`http://localhost:8000/checkout/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        setEventPrice(data.eventPrice);
        setTitle(data.titleEvent);
        setCoupons(data.eventCoupons);
        setRefCoupons(data.refCoupons);
        setPoints(data.userPoints);
        setTotalPrice(parseInt(total));
        setOriginaPrice(parseInt(total));
        console.log(`refcoupon`, data.refCoupons);
      } catch (error) {
        console.error('Error fetching checkout information:', error.message);
      }
    };
    fetchCheckoutInfo();
  }, []);

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required('firstname is required'),
    lastname: Yup.string().required('lastname is required'),
    email: Yup.string().required('email is required'),
  });

  const getCouponId = () => {
    const selectedCoupon = coupon.find((coupon) => coupon.isChecked);
    return selectedCoupon ? selectedCoupon.id : null;
  };

  const refCouponId = () => {
    const selectedCoupon = refCoupons.find((coupon) => coupon.isChecked);
    return selectedCoupon ? selectedCoupon.id : null;
  };
  //mengirim data transaksi ke backend
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const pointsToUse = isPointsUsed ? points : 0;
      const response = await axios.post(
        `http://localhost:8000/checkout/${eventId}`,
        {
          couponId: getCouponId(),
          refCoupon: getCouponId(),
          pointUsed: pointsToUse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Jika transaksi berhasil, kembali ke halaman tickets
      router.push('/user/tickets');
      console.log(response);
    } catch (error) {
      console.error('Error during transaction:', error.message);
    }
  };

  // Perubahan untuk menangani perubahan status poin
  const handlePointChange = () => {
    setIsPointsUsed((prevIsPointsUsed) => !prevIsPointsUsed);

    if (!isPointsUsed) {
      // Jika sedang dicentang (akan menggunakan poin)
      if (points >= totalPrice) {
        // Jika jumlah poin mencukupi untuk membayar seluruh totalPrice
        setTotalPrice(0);
      } else {
        // Jika jumlah poin kurang dari totalPrice
        setTotalPrice((prevTotalPrice) => prevTotalPrice - points);
      }
    } else {
      // Jika sedang tidak dicentang (tidak menggunakan poin)
      setTotalPrice((prevTotalPrice) => prevTotalPrice + points);
    }
  };

  const handlecouponChange = (couponId) => {
    const selectedCoupon = coupon.find((coupon) => coupon.id === couponId);

    if (selectedCoupon) {
      const discountPercentage = parseFloat(selectedCoupon.discount_amount);
      const discountAmount = (discountPercentage / 100) * originalPrice;

      if (selectedCoupon.isChecked) {
        setTotalPrice((prevTotalPrice) => prevTotalPrice + discountAmount);
      } else {
        setTotalPrice((prevTotalPrice) => prevTotalPrice - discountAmount);
      }
      selectedCoupon.isChecked = !selectedCoupon.isChecked;
    }
  };

  const handleRefCouponChange = (couponId) => {
    const selectedRefCoupon = refCoupons.find(
      (coupon) => coupon.id === couponId,
    );

    if (selectedRefCoupon) {
      const discountPercentage = parseFloat(selectedRefCoupon.discount_amount);
      const discountAmount = (discountPercentage / 100) * originalPrice;

      if (selectedRefCoupon.isChecked) {
        setTotalPrice((prevTotalPrice) => prevTotalPrice + discountAmount);
      } else {
        setTotalPrice((prevTotalPrice) => prevTotalPrice - discountAmount);
      }
      selectedRefCoupon.isChecked = !selectedRefCoupon.isChecked;
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      <Form className="w-full px-5 justify-center md:justify-between md:p-0 md:max-w-4xl mx-auto flex flex-col ">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between gap-5">
            <div className="flex flex-col w-1/2">
              <Field
                type="text"
                id="firstname"
                name="firstname"
                className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline h-10 "
                placeholder="Firstname"
              />
              <ErrorMessage
                name="firstname"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <Field
                type="text"
                id="lastname"
                name="lastname"
                className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline h-10"
                placeholder="Lastname"
              />
              <ErrorMessage
                name="lastname"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Field
              type="text"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline h-10 "
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className=" text-lg">
            <p>Coupon:</p>
            {coupon.map((coupon) => (
              <label key={coupon.id}>
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    onChange={() => handlecouponChange(coupon.id)}
                  />
                  <p>{coupon.name}</p>
                </div>
              </label>
            ))}
            {refCoupons.map((coupon) => (
              <label key={coupon.id}>
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    onChange={() => handleRefCouponChange(coupon.id)}
                  />
                  <p>{coupon.name}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="gap-1 flex text-lg">
            <input type="checkbox" onChange={handlePointChange} />
            <p>{points} Points</p>
          </div>
          <div className="pt-20 flex flex-col text-lg">
            <p>Order Summary</p>
            <div className="flex flex-col">
              <div className="flex flex-row text-lg justify-between">
                <p>{`${totalTicket} x ${title}`}</p>
                <p>{`${formattedTotalPrice}`}</p>
              </div>
              <div className="pt-10">
                <div className="flex flex-row text-lg justify-between">
                  <p>Subtotal</p>
                  <p>{`${formattedTotalPrice}`}</p>
                </div>
                <div className="flex flex-row text-lg justify-between">
                  <p>Use Coupon</p>
                  <div className="flex flex-col">
                    {coupon
                      .filter((coupon) => coupon.isChecked)
                      .map((selectedCoupon) => (
                        <p
                          key={selectedCoupon.id}
                        >{`${selectedCoupon.name}`}</p>
                      ))}
                    {refCoupons
                      .filter((coupon) => coupon.isChecked)
                      .map((selectedCoupon) => (
                        <p
                          key={selectedCoupon.id}
                        >{`${selectedCoupon.name}`}</p>
                      ))}
                  </div>
                </div>
                <div className="flex flex-row text-lg justify-between">
                  <p>Use Points</p>
                  {isPointsUsed && (
                    <p>{`${
                      points > totalPrice ? total : `${points} Points`
                    }`}</p>
                  )}
                </div>
                <div className="flex flex-row text-2xl font-bold justify-between pt-5  mb-5">
                  <p>TOTAL</p>
                  <p>{`${formatRupiah(Math.max(0, totalPrice))}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-black text-white p-2 rounded-md"
          type="button"
          onClick={handleConfirm}
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default CheckoutForm;
