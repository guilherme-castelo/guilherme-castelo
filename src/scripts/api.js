export async function fetchProfileData() {
  try {
    const response = await fetch("src/data/profile.json");
    if (!response.ok) throw new Error("Failed to load profile data");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
