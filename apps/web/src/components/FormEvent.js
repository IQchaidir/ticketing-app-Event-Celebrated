import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';

const FormEvent = () => {
  const [categories, setCategories] = useState([]);
  const [regencies, setRegencies] = useState([
    { id: '1', name: 'Kabupaten X' },
    { id: '2', name: 'Kabupaten Y' },
    // ... tambahkan kabupaten lainnya
  ]);
  const [isOnline, setIsOnline] = useState(true); // State untuk menentukan apakah event online atau venue
  const [showLocationForm, setShowLocationForm] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required('Judul wajib diisi'),
    category: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string(),
      })
      .required('Kategori wajib dipilih'),
    description: Yup.string().required('Deskripsi wajib diisi'),
    location: Yup.object().shape({
      address: Yup.string().required('Alamat wajib diisi'),
      regency: Yup.string().required('Kabupaten/Kota wajib dipilih'),
    }),
    // Tambahkan validasi untuk bidang formulir lainnya jika diperlukan
  });

  const handleOnlineClick = () => {
    setIsOnline(true);
    setShowLocationForm(false);
  };

  const handleVenueClick = () => {
    setIsOnline(false);
    setShowLocationForm(true);
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Lakukan sesuatu dengan nilai formulir, misalnya kirim ke server
  };

  return (
    <Formik
      initialValues={{
        title: '',
        category: null,
        description: '',
        location: {
          address: '',
          regency: '',
        },
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="max-w-md w-full space-y-4">
        <div>
          <Field
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Field name="category">
            {({ field, form }) => (
              <Select
                options={categories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                value={categories.find(
                  (option) => option.value === field.value,
                )}
                onChange={(option) => form.setFieldValue(field.name, option)}
                onBlur={field.onBlur}
                className="mt-1 w-full"
              />
            )}
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Field
            as="textarea"
            id="description"
            name="description"
            placeholder="Description..."
            rows="4"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        {/* Tombol Online dan Venue */}
        <div className="flex space-x-4">
          <button
            type="button"
            className={`w-1/2 p-2 ${
              isOnline ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            } rounded-md`}
            onClick={handleOnlineClick}
          >
            Online
          </button>
          <button
            type="button"
            className={`w-1/2 p-2 ${
              !isOnline ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            } rounded-md`}
            onClick={handleVenueClick}
          >
            Venue
          </button>
        </div>
        {/* Akhir Tombol Online dan Venue */}

        {/* Form Lokasi */}

        {showLocationForm && (
          <>
            <div>
              <Field
                type="text"
                id="location.address"
                name="location.address"
                placeholder="Masukkan alamat..."
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              <ErrorMessage
                name="location.address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                as="select"
                id="location.regency"
                name="location.regency"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="" label="Pilih Kabupaten/Kota" />
                {regencies.map((regency) => (
                  <option
                    key={regency.id}
                    value={regency.name}
                    label={regency.name}
                  />
                ))}
              </Field>
              <ErrorMessage
                name="location.regency"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </>
        )}

        {/* Akhir Form Lokasi */}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Kirim
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormEvent;
