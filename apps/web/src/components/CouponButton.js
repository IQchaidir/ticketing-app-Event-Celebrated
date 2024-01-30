'use client';

import React, { useState } from 'react';
import CouponModal from '@/components/CouponModal';

const CouponButton = ({ eventId, endTime }) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const handleOpenCouponModal = () => {
    setIsCouponModalOpen(true);
  };

  const handleCloseCouponModal = () => {
    setIsCouponModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenCouponModal}
        className="bg-black text-white p-2 rounded-md w-44 "
      >
        Create Coupon
      </button>
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={handleCloseCouponModal}
        eventId={eventId}
        endTime={endTime}
      />
    </>
  );
};

export default CouponButton;
