'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const CheckoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventPrice, setEventPrice] = useState(null);
  const [coupon, setCoupons] = useState([]);
  const [points, setPoints] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const params = useParams();
  const router = useRouter();

  const eventId = params.id; // Mengambil nilai dari parameter URL "id"
  useEffect(() => {
    // Ambil informasi checkout dari backend
    const fetchCheckoutInfo = async () => {
      try {
        // Fetch informasi checkout dari backend (ganti URL sesuai dengan backend Anda)
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

        // Update state dengan informasi yang diterima dari backend
        setEventPrice(data.eventPrice);
        setCoupons(data.eventCoupons);
        setPoints(data.userPoints);
        setTotalPrice(data.eventPrice); // Total awal dihitung tanpa potongan dari coupon atau poin
      } catch (error) {
        console.error('Error fetching checkout information:', error.message);
      }
    };

    if (checkoutClicked) {
      fetchCheckoutInfo();
    }
  }, [checkoutClicked]);

  const handleCheckout = () => {
    const token = localStorage.getItem('token');

    if (token) {
      // Jika ada token, buka modal checkout
      setIsModalOpen(true);
      setCheckoutClicked(true);
    } else {
      // Jika tidak ada token, arahkan pengguna untuk login
      router.push('/auth/login');
    }
  };

  const handleClose = () => {
    // Tutup modal
    setIsModalOpen(false);
  };

  const handlecouponChange = (couponId) => {
    // Cari kupon berdasarkan couponId
    const selectedCoupon = coupon.find((coupon) => coupon.id === couponId);

    if (selectedCoupon) {
      const discountAmount = parseFloat(selectedCoupon.discount_amount);

      // Periksa apakah checkbox dicentang atau tidak
      if (selectedCoupon.isChecked) {
        // Jika dicentang, kurangi totalPrice dengan discountAmount
        setTotalPrice(
          (prevTotalPrice) => parseFloat(prevTotalPrice) + discountAmount,
        );
      } else {
        // Jika tidak dicentang, tambahkan totalPrice dengan discountAmount
        setTotalPrice(
          (prevTotalPrice) => parseFloat(prevTotalPrice) - discountAmount,
        );
      }

      // Perbarui isChecked pada kupon yang bersangkutan
      selectedCoupon.isChecked = !selectedCoupon.isChecked;
    }
  };

  const handlePointChange = () => {
    if (setPoints.isChecked) {
      // Jika dicentang, kurangi totalPrice dengan discountAmount
      setTotalPrice((prevTotalPrice) => parseFloat(prevTotalPrice) + points);
    } else {
      // Jika tidak dicentang, tambahkan totalPrice dengan discountAmount
      setTotalPrice((prevTotalPrice) => parseFloat(prevTotalPrice) - points);
    }

    // Perbarui isChecked pada kupon yang bersangkutan
    setPoints.isChecked = !setPoints.isChecked;
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalContentStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '400px',
    width: '100%',
    position: 'relative', // Menambahkan properti ini
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: 8,
    right: 5,

    background: '#ff0000',
    color: '#fff',
    padding: '8px',
    borderRadius: '4px',
  };

  return (
    <div>
      {/* Tombol Checkout */}
      <button
        onClick={handleCheckout}
        className="bg-red-500 text-white p-2 rounded-md"
      >
        Checkout
      </button>

      {/* Modal Checkout */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            {/* Tombol Close */}
            <button
              style={closeButtonStyle}
              type="button"
              onClick={handleClose}
            >
              X
            </button>
            <h2>Checkout</h2>
            <form>
              <label>
                Nama:
                <input type="text" />
              </label>
              <br />
              <label>
                Email:
                <input type="email" />
              </label>
              <br />
              {/* Harga */}
              <p>Price: {eventPrice ? `${eventPrice}` : 'Memuat...'}</p>

              {/* Daftar coupon */}
              <div>
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
              </div>

              {/* Poin */}
              <div className="gap-1 flex">
                <input type="checkbox" onChange={handlePointChange} />
                <p>{points} Points</p>
              </div>

              {/* Total Harga */}
              <p>Total price: {totalPrice}</p>

              <button
                className="bg-red-500 text-white p-2 rounded-md"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;
