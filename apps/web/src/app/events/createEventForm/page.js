import FormEvent from '@/components/FormEvent';

const CreateEventForm = () => {
  return (
    <section className="md:flex md:flex-col items-center py-5 md:py-10 ">
      <h3 className="wrapper h3-bold justify-center text-center">
        CREATE EVENT
      </h3>
      <div className="md:w-1/2 items-center justify-center">
        <FormEvent />
      </div>
    </section>
  );
};

export default CreateEventForm;
