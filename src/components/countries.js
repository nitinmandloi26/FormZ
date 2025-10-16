const fetchCountry = async () => {
  try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        const data = await res.json();
        // Sort countries alphabetically
        const sorted = data
          .map((c) => ({ name: c.name.common, code: c.cca2 }))
          .sort((a, b) => a.name.localeCompare(b.name));
          return sorted; 
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        return []; 
      }
}
export default fetchCountry;