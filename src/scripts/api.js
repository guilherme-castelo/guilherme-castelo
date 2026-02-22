const DATA_URL = "src/data/profile.json";

export async function fetchProfileData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to load profile data: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Profile API Error:", error);
    throw error;
  }
}

