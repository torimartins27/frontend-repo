export const fetchFeaturedArtworks = async () => {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?limit=20&fields=id,title,image_id,artist_display"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch artworks");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }
};

export async function fetchArtworkDetail(id) {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching artwork details:", error);
    throw error;
  }
}

export async function fetchArtworks(limit = 100) {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?limit=${limit}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
}
