import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    // Create Customer (required for export compliance)
    const customer = await stripe.customers.create({
      name: "Nitin Mandloi",
      email: "nitinmandloi26@gmail.com",
      address: {
        line1: "123 Main Street",
        city: "New York",
        country: "US",
        postal_code: "10001",
      },
    });

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(data.amount), // e.g. 9201 = $92.01
      currency: "usd",
      description: "Export of digital cleaning service",
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
      metadata: {
        country_of_supply: "India",
        export_type: "service",
      },
      receipt_email: "nitinmandloi26@gmail.com",
    });

    

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("❌ Stripe Error:", err);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: "Method not allowed, use POST" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
