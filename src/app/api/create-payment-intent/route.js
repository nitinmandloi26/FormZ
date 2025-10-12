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

    console.log("✅ PaymentIntent created:", paymentIntent.id);

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("❌ Stripe Error:", err);
    return Response.json({ error: err.message }, { status: 400 });
  }
}
