import { FilterHome } from '@/components/FilterHome';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <Hero />
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <FilterHome />
      </section>
      <Footer />
    </>
  );
}
