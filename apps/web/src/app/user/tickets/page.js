import { FilterTicket } from '@/components/FilterTicket';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';

const ticketUser = () => {
  return (
    <>
      <Header />
      <div className="wrapper flex flex-col gap-5">
        <h1 className="h1-bold">My Tickets</h1>
        <FilterTicket />
      </div>
      <Footer />
    </>
  );
};

export default ticketUser;
