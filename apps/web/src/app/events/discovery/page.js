'use client';
import Card from '@/components/Card';
import FilterButton from '@/components/FilterButton';
import FilterModal from '@/components/FilterModal';
import FilterPill from '@/components/FilterPills';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const SearchPage = () => {
  const pageSize = 6;
  //state untuk melacak search
  const [searchQuery, setSearchQuery] = useState('');
  //use debounce
  const [debounceValue] = useDebounce(searchQuery, 500);
  //state untuk resp fething
  const [data, setData] = useState([]);
  //state array cateogri
  const [categories, setCategories] = useState([]);
  // State untuk melacak nomor halaman saat ini
  const [currentPage, setCurrentPage] = useState(1);
  // State untuk menentukan apakah modal ditampilkan atau tidak
  const [selectedButton, setSelectedButton] = useState(null);
  // State untuk melacak online
  const [onlineEventFilter, setOnlineEventFilter] = useState(false);
  // State untuk melacak status checkbox Date
  const [dateFilters, setDateFilters] = useState({
    today: false,
    tomorrow: false,
    thisWeekend: false,
  });
  // State untuk viewmore kategori
  const [isViewMore, setIsViewMore] = useState(false);
  const MAX_DISPLAY_CATEGORIES = 5;
  // State untuk melacak status checkbox Price
  const [priceFilters, setPriceFilters] = useState({
    paid: false,
    free: false,
  });
  // State untuk melacak status checkbox Category
  const [selectedCategory, setSelectedCategory] = useState('');
  // State untuk melacak filter pills yang aktif
  const [activeFilters, setActiveFilters] = useState([]);

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Fungsi untuk menangani online
  const handleOnlineEventChange = () => {
    setOnlineEventFilter((prevFilter) => !prevFilter);

    // Hapus filter pills yang tidak sesuai dengan filter yang dipilih
    setActiveFilters((prevFilters) =>
      prevFilters.filter((activeFilter) => activeFilter !== 'Online'),
    );

    // Tambahkan filter pill ke dalam activeFilters jika checkbox online event terpilih
    if (!onlineEventFilter) {
      setActiveFilters((prevFilters) => [...prevFilters, 'Online']);
    }
  };

  // Fungsi untuk menangani perubahan status checkbox Date
  const handleDateChange = (filter) => {
    setDateFilters({
      today: filter === 'today',
      tomorrow: filter === 'tomorrow',
      thisWeekend: filter === 'thisWeekend',
    });

    // Hapus filter pills yang tidak sesuai dengan filter yang dipilih
    setActiveFilters((prevFilters) =>
      prevFilters.filter(
        (activeFilter) =>
          activeFilter !== 'today' &&
          activeFilter !== 'tomorrow' &&
          activeFilter !== 'thisWeekend',
      ),
    );

    // Tambahkan filter pill ke dalam activeFilters
    setActiveFilters((prevFilters) => [...prevFilters, filter]);
  };

  // Fungsi untuk menangani perubahan status checkbox Price
  const handlePriceChange = (filter) => {
    setPriceFilters({
      paid: filter === 'paid',
      free: filter === 'free',
    });

    // Hapus filter pills yang tidak sesuai dengan filter yang dipilih
    setActiveFilters((prevFilters) =>
      prevFilters.filter(
        (activeFilter) => activeFilter !== 'free' && activeFilter !== 'paid',
      ),
    );

    // Tambahkan filter pill ke dalam activeFilters
    setActiveFilters((prevFilters) => [...prevFilters, filter]);
  };

  // Fungsi untuk menangani perubahan status checkbox Category
  const handleCategoryChange = (category) => {
    // Hapus semua filter pills category sebelumnya
    setActiveFilters((prevFilters) =>
      prevFilters.filter(
        (activeFilter) => !activeFilter.startsWith('Category:'),
      ),
    );

    // Tambahkan filter pill ke dalam activeFilters jika checkbox dipilih
    if (selectedCategory !== category) {
      setSelectedCategory(category);
      setActiveFilters((prevFilters) => [
        ...prevFilters,
        `Category: ${category}`,
      ]);
    } else {
      // Jika category sama dengan prevCategory, set prevCategory menjadi string kosong
      setSelectedCategory('');
    }
  };

  //fungsi untuk membuka modal
  const handleOpenModal = () => {
    setSelectedButton('filter');
  };

  // Terapkan nilai filter dari FilterModal ke state filter di SearchPage
  const applyFilters = (modalFilters) => {
    setOnlineEventFilter(modalFilters.onlineEventFilter);
    setDateFilters(modalFilters.dateFilters);
    setPriceFilters(modalFilters.priceFilters);
    setSelectedCategory(modalFilters.selectedCategory);
  };

  // Hapus filter Pills
  const removeFilter = (filter) => {
    setActiveFilters((prevFilters) =>
      prevFilters.filter((activeFilter) => activeFilter !== filter),
    );

    // Mendapatkan jenis filter dari filter yang dihapus
    const filterType = filter.split(':')[0];

    // Menghapus filter berdasarkan jenisnya (Date, Price, Category)
    switch (filterType) {
      case 'today':
      case 'tomorrow':
      case 'thisWeekend':
        setDateFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: false,
        }));
        break;
      case 'paid':
      case 'free':
        setPriceFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: false,
        }));
        break;
      case 'Category':
        setSelectedCategory('');
        break;
      case 'Online':
        setOnlineEventFilter(false);
        break;
      default:
        break;
    }
  };
  // Pemanggilan API untuk mendapatkan daftar kategori
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

  //pemanggilan API
  useEffect(() => {
    // Pemanggilan API dengan parameter query yang sesuai
    const fetchData = async () => {
      const filters = {
        is_online: onlineEventFilter,
        is_free:
          priceFilters.free || (priceFilters.paid ? { is_free: false } : null),
        category: selectedCategory.toString(),
        search: debounceValue,
        page: currentPage.toString(),
      };

      if (dateFilters.today) {
        filters.start_date = new Date().toISOString().split('T')[0];
        filters.end_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0]; // Next day
      } else if (dateFilters.tomorrow) {
        filters.start_date = new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .split('T')[0];
        filters.end_date = new Date(
          new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .split('T')[0]; // Next day
      } else if (dateFilters.thisWeekend) {
        const today = new Date();
        const daysUntilWeekend = 5 - today.getDay(); // 5 is Saturday
        const todayForWeekend = new Date(today);
        todayForWeekend.setDate(todayForWeekend.getDate() + daysUntilWeekend);
        todayForWeekend.setHours(0, 0, 0, 0);
        const nextMonday = new Date(todayForWeekend);
        nextMonday.setDate(todayForWeekend.getDate() + 2); // 2 days for the weekend

        filters.start_date = todayForWeekend.toISOString().split('T')[0];
        filters.end_date = nextMonday.toISOString().split('T')[0];
      }

      const activeFilters = Object.keys(filters).reduce((acc, key) => {
        if (filters[key]) {
          acc[key] = filters[key];
        }
        return acc;
      }, {});

      const queryParams = new URLSearchParams(activeFilters).toString();

      try {
        const response = await axios.get(
          `http://localhost:8000/event/discovery?${queryParams}`,
        );
        const fetchedData = response.data;
        setData(fetchedData);

        // Lakukan sesuatu dengan data hasil pencarian
      } catch (error) {
        console.error('Error fetching search results:', error);
        setData([]);
      }
    };

    fetchData();
  }, [
    debounceValue,
    onlineEventFilter,
    dateFilters,
    priceFilters,
    selectedCategory,
    currentPage,
  ]);

  return (
    <div className=" wrapper flex flex-col md:flex-row-reverse min-h-screen">
      <main className="w-full md:w-full lg:w-5/6 px-6 pb-6 ">
        <h1 className="text-3xl font-semibold mb-4">Find Event</h1>

        <form className="mb-4 md:flex md:items-center w-full sm:w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-l mb-2 w-full md:mb-0 md:flex-1"
          />
        </form>

        {/* Mobile Filter */}
        <div className="flex flex-row lg:hidden gap-5 pb-5 w-full  ">
          <FilterButton onClick={handleOpenModal} />
        </div>
        <FilterModal
          isOpen={selectedButton === 'filter'}
          onClose={() => setSelectedButton(null)}
          applyFilters={applyFilters}
        />
        <div className="mb-4 flex">
          {activeFilters.map((filter, index) => (
            <FilterPill
              key={index}
              label={filter}
              onRemove={() => removeFilter(filter)}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((event) => (
              <div className="flex justify-center" key={event.id}>
                <Card event={event} />
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
        {/* Menampilkan tombol pagination */}
        <div className="mt-4 flex justify-center items-center">
          {/* Tombol Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-2 border rounded"
          >
            Previous
          </button>

          {/* Nomor halaman saat ini */}
          <span className="mx-2">{currentPage}</span>

          {/* Tombol Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={data.length < pageSize} // Misalkan, jika panjang data kurang dari pageSize, tandanya tidak ada halaman berikutnya
            className="px-3 py-1 mx-2 border rounded"
          >
            Next
          </button>
        </div>
      </main>

      <aside className=" hidden lg:block w-1/6 p-6 pl-0 pt-0">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Filters</h2>
          {/* Online filter */}
          <label className="block mb-2 text-base">
            <input
              type="checkbox"
              className="mr-2"
              checked={onlineEventFilter}
              onChange={handleOnlineEventChange}
            />
            Online Event
          </label>
        </div>
        {/* Checkbox Date */}
        <h2 className="text-base font-semibold mb-2">Date</h2>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={dateFilters.today}
            onChange={() => handleDateChange('today')}
          />
          Today
        </label>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={dateFilters.tomorrow}
            onChange={() => handleDateChange('tomorrow')}
          />
          Tomorrow
        </label>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={dateFilters.thisWeekend}
            onChange={() => handleDateChange('thisWeekend')}
          />
          This Weekend
        </label>
        {/* Checkbox Price */}
        <h2 className="text-base font-semibold mb-2">Price</h2>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={priceFilters.paid}
            onChange={() => handlePriceChange('paid')}
          />
          Paid
        </label>
        <label className="block mb-2 text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={priceFilters.free}
            onChange={() => handlePriceChange('free')}
          />
          Free
        </label>
        {/* Filter Category */}
        <div className="mb-4 mt-4">
          <h2 className="text-base font-semibold mb-2">Category</h2>
          {categories
            .slice(0, isViewMore ? categories.length : MAX_DISPLAY_CATEGORIES)
            .map((category) => (
              <label key={category} className="block mb-2 text-base">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}

          {/* Tombol View More/View Less */}
          {categories.length > MAX_DISPLAY_CATEGORIES && (
            <button
              className="text-blue-500 underline mt-2"
              onClick={() => setIsViewMore((prev) => !prev)}
            >
              {isViewMore ? 'View Less' : 'View More'}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SearchPage;
