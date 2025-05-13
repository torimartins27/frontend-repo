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
