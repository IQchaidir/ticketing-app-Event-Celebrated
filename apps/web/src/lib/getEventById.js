export default async function getEventById(id) {
  try {
    const res = await fetch(`http://localhost:8000/event/${id}`);

    if (!res.ok) {
      const errorMessage = `Failed to fetch data. Status: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Melemparkan kembali kesalahan untuk ditangani di tingkat yang lebih tinggi jika perlu
  }
}
