export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postalcode = searchParams.get("postalcode");
  const country = searchParams.get("country") || "IN";

  if (!postalcode)
    return new Response(JSON.stringify({ error: "postalcode required" }), { status: 400 });

  const username = "YOUR_USERNAME"; // store in .env.local
  const url = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${postalcode}&country=${country}&username=${username}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("GeoNames request failed");

    const data = await res.json();
    if (!data.postalcodes?.length)
      return new Response(JSON.stringify({ error: "No data found" }), { status: 404 });

    const place = data.postalcodes[0];
    return Response.json({
      postalcode: place.postalcode,
      city: place.placeName,
      state: place.adminName1,
      country: place.countryCode,
      lat: place.lat,
      lng: place.lng,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
