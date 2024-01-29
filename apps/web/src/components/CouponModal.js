import axios from 'axios';
import { useState } from 'react';

const CouponModal = ({ isOpen, onClose, onSubmit, eventId, endTime }) => {
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    const couponData = {
      name,
      total,
      amount,
      eventId,
      endTime,
    };
    try {
      const response = await axios.post(
        'http://localhost:8000/coupon/create',
        couponData,
      );
      alert('kupon berhasil dibuat');
      setName('');
      setTotal('');
      setAmount('');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      onClose();
    }
  };
  return (
    <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="text-xl font-semibold">Create Coupon</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form>
          <div className="modal-content">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={name}
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline h-10 "
                placeholder="Coupon Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                value={total}
                id="total"
                name="total"
                className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline h-10 "
                placeholder="Limit Coupon"
                onChange={(e) => setTotal(e.target.value)}
              />
              <input
                type="number"
                value={amount}
                id="amount"
                name="amount"
                className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline h-10 "
                placeholder="Amount Coupon in%"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
              >
                Create Coupon
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponModal;
