"use client";
import { useState, useEffect, useRef } from "react";

export default function AddressAutocomplete({ value, onChange, onSelect, inputRef }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const fetchTimeout = useRef(null);

  useEffect(() => {
    if (isSelecting) {
      // Skip fetching right after user selects
      setIsSelecting(false);
      return;
    }

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    clearTimeout(fetchTimeout.current);
    fetchTimeout.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(fetchTimeout.current);
  }, [query]);

  useEffect(() => {
    if (onChange) onChange(query);
  }, [query]);

  const extractAddress = (props, coords) => ({
    street: [props.name,props.street,props.locality,props.county].filter(Boolean)
      .join(", "),
    city: props.city || props.town || props.village || "",
    state: props.state || "",
    country: props.country || "",
    postcode: props.postcode || "",
    countrycode: props.countrycode,
    lat: coords[1],
    lon: coords[0],
    fullAddress: [
      props.name,
      props.street,
      props.locality,
      props.county,
      props.city,
      props.state,
      props.country,
      props.postcode,
    ]
      .filter(Boolean)
      .join(", "),
  });


  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type address..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-[#E5E5E5] rounded-[8px] md:rounded-[12px] font-normal text-[13px] md:text-[16px] placeholder:text-[#ADAEBC] text-[#666666] leading-6.5 md:leading-9 px-4 md:px-6 py-2 md:py-3"
      />
      {loading && <div className="absolute right-2 top-2 text-gray-400">...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 hover:bg-blue-100 cursor-pointer text-sm"
              onClick={() => {
                const address = extractAddress(s.properties, s.geometry.coordinates);
                setIsSelecting(true); // prevent re-fetch
                setQuery(address.fullAddress);
                setSuggestions([]);
                if (onSelect) onSelect(address);
              }}
            >
              {[s.properties.name, s.properties.street, s.properties.locality, s.properties.county, s.properties.city || s.properties.town || s.properties.village, s.properties.country, s.properties.postcode]
  .filter(Boolean)
  .join(", ")}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
