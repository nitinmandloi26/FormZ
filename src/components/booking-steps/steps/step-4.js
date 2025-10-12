"use client";
/* eslint-disable react/no-unescaped-entities */
import { Heading, Content, Label, Input,formatDate, Select, Button, Errors } from "@/components/ui";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement,} from "@stripe/react-stripe-js";
import Image from "next/image";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const Step4Form  = ({hero,booking,priceBreakdown,paymentInformation,formData,handleChange,nextStep, prevStep}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errors, setErrors] = useState({});
    const [showFull, setShowFull] = useState(false);
    const [inputs, setInputs] = useState({
        email: formData?.email || "",
        card_holder: formData?.card_holder || "",
        billing_address: formData?.billing_address || "",
        save_payment: formData?.save_payment || false,
        agree: formData?.agree || false,
        fullAddress: [formData?.street,formData?.city,formData?.state,formData?.zip].filter(Boolean)
      .join(", "),
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleChange({ ...inputs });
    }, [inputs]); 

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "email":
                if (!value.trim()) return error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) return error = "Invalid email format";
                break;
            case "card_holder":
                if (!value.trim()) return error = "Card holder name is required";
                break;
            case "billing_address":
                if (!value.trim()) return error = "Billing address is required";
                break;
            case "agree":
                if (!value) return error = "Terms and conditions is required";
                break;
            default:
                break;
        }
    }

    const validateError = (name,value) => { 
        setInputs({ ...inputs, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }

    const handlePayment = async () => {
        const requiredFields = [
            "email","card_holder","billing_address","agree"
        ];

        const newErrors = {};

        requiredFields.forEach((field) => {
            const value = inputs[field];
            let error = "";
            error = validateField(field, value);   
            if (error) {
                newErrors[field] = error; // collect errors
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        if (!stripe || !elements) {
    setErrors({ stripe: "Stripe not initialized yet." });
    return;
  }

        setLoading(true);

      try {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(Math.round(formData?.totalPrice * 100)) }),
    });

    const data = await res.json();
    console.log("👉 Backend response:", data);

    if (!data.clientSecret) {
      throw new Error("Missing clientSecret from backend response.");
    }

    const card = elements.getElement(CardElement);
    console.log(card);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: inputs.card_holder,
            email: inputs.email,
          },
        },
      }
    );

    if (error) {
      setErrors({ stripe: error.message });
    } else if (paymentIntent.status === "succeeded") {
      console.log("✅ Payment successful:", paymentIntent.id);
      nextStep();
    }
  } catch (err) {
    console.error("❌ Payment failed:", err);
    setErrors({ stripe: err.message || "Payment failed. Please try again." });
  } finally {
    setLoading(false);
  }
    }

    return( 
        <div className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="text-center mb-6 md:mb-12">
                    <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
                    <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
                </div>
                <div className="grid grid-cols-[0.7452fr_repeat(1,1fr)] gap-10 items-start">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-[#F0F0F0] rounded-2xl p-8">
                            <Heading level={3} size={4} className={`mb-6`}>{booking.heading}</Heading>
                            <div className="grid grid-cols-1 gap-6">
                              <div className="grid grid-cols-[44px_1fr_60px] gap-4 items-start">
                                <span className="flex items-center justify-center w-11 h-11 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/clean.svg`} width={17} height={16} alt="service" /></span>
                                <div className="">
                                    <h4 className="text-[#1a1a1a] text-[16px] font-semibold">{formData?.service?.service.title}</h4>
                                    <Content variant={3} className={`mb-2`}>{formData?.service?.service.content}</Content>
                                    <div className="flex gap-4 text-[12px]">
                                        {formData?.service?.service?.tags.map((tag,index) => (
                                            <span key={index} className="bg-[#FFFFFF] block px-3 py-1 text-[#666666] rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <span className="text-[#1a1a1a] text-[16px] font-semibold text-right">${formData?.service?.service.price.toFixed(2)}</span>
                              </div>
                              {[...formData.booking].reverse().map((b, idx) => (
                              <div key={idx} className="border-t-1 border-[#E5E5E5] pt-6">
                                {idx !== 0 && <h3 className="font-semibold text-[16px] text-[#1a1a1a] mb-4">Next Schedule</h3>}
                                <div className="grid grid-cols-2 gap-6 ">
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/date.svg`} width={16} height={16} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Date</h4>
                                        <p className="text-[#666] text-[14px] font-normal">{formatDate(b.date)}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/clock.svg`} width={20} height={20} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a0e0e] text-[14px] font-medium">Time</h4>
                                        <p className="text-[#666] text-[14px] font-normal">{b?.timeSlot?.time || "Not selected"}</p>
                                    </div>
                                </div>
                                </div>
                              </div>
                              ))}
                             
                              <div className="grid grid-cols-2 gap-6 border-t-1 border-[#E5E5E5] pt-6 items-start">
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/address.svg`} width={16} height={16} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Service Address</h4>
                                        <p onClick={() => setShowFull(!showFull)}
      title={!showFull ? inputs.fullAddress : ""}
 className="text-[#666] text-[14px] font-normal cursor-pointer">
    {showFull
        ? inputs.fullAddress
        : inputs.fullAddress.length > 40
        ? inputs.fullAddress.slice(0, 40) + "..."
        : inputs.fullAddress}
 </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/booking.svg`} width={20} height={20} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Booking Type</h4>
                                        <p className="text-[#666] text-[14px] font-normal">{formData.frequency.option.label}</p>
                                    </div>
                                </div>                                
                              </div>
                               <div className="grid grid-cols-1 gap-6 border-t-1 border-[#E5E5E5] pt-6 items-start">
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/user.svg`} width={16} height={16} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Contact Information</h4>
                                        <p className="text-[#666] text-[14px] font-normal">{formData.firstName} {formData.lastName} <br/> {formData.email} • {formData.phone}</p>
                                    </div>
                                </div>
                               </div>
                            </div>
                        </div>
                        <div className="border border-[#E5E5E5] rounded-2xl grid grid-cols-1 gap-3 p-6">
                            <Heading level={3} size={4}>{priceBreakdown.heading}</Heading>
                            <div className="text-[16px] font-normal grid grid-cols-1 gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#666666]">Deep Cleaning Service</span>
                                    <span className="text-[#1a1a1a]">${formData?.serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#666666]">Platform Fee</span>
                                    <span className="text-[#1a1a1a]">${formData?.plateformFee.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#666666]">Tax (8.25%)</span>
                                    <span className="text-[#1a1a1a]">${formData?.taxFee.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-4">
                                    <span className="text-[#1a1a1a] font-semibold text-[20px]">Total</span>
                                    <span className="text-[#1a1a1a] text-[24px] font-bold">${formData?.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="bg-[#F0F0F0] rounded-[12px] p-4 grid grid-cols-[16px_1fr] gap-3 items-center">
                                    <Image src={priceBreakdown.usp.icon} width={16} height={16} alt="Security" />
                                <div className="">
                                    <h5 className="text-[#1a1a1a] text-[14px] font-medium">{priceBreakdown.usp.heading}</h5>
                                    <p className="text-[#666666] text-[12px] font-normal">{priceBreakdown.usp.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        <div className="bg-[#fff] border border-[#E5E5E5] rounded-[20px] p-10">
                            <Heading level={3} size={5} className={`mb-7`}>{paymentInformation.heading}</Heading>
                            <div className="grid grid-col-1 gap-7.5">
                                <div className="">
                                    <Label>Email Address</Label>
                                    <Input type="email" className={`bg-[#F0F0F0]`} placeholder="john.smith@email.com" value={inputs.email}
                                    onChange={(e) => validateError("email",e.target.value)}
                                    readOnly/>
                                    {errors.email  && ( <Errors>{errors.email }</Errors>  )}
                                </div>
                                <div className="">
                                    <Label>Card Information</Label>
                                    <div className="border p-3 rounded-md bg-[#F0F0F0]">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "18px",
                          color: "#1A1A1A",
                          "::placeholder": { color: "#999" },
                        },
                      },
                    }}
                  />
                </div>
                {errors.stripe && <Errors>{errors.stripe}</Errors>}
                                </div>
                               
                                <div className="">
                                    <Label>Cardholder Name</Label>
                                    <Input placeholder="John Smith" onChange={(e) => validateError("card_holder",e.target.value)}  />
                                    {errors.card_holder  && ( <Errors>{errors.card_holder }</Errors>  )}
                                </div>
                                <div className="">
                                    <Label>Billing Address</Label>
                                    <div className="relative ">
                                       <Select className={`appearance-none text-[#1A1A1A]`} 
                                       onChange={(e) => validateError("billing_address",e.target.value)} >
                                           <option value="">Select Address...</option>
                                           <option value="Same as service address">Same as service address</option>
                                       </Select>
                                        <span className="absolute inset-y-0 right-6 flex items-center  pointer-events-none text-gray-500">
                                            <Image src={`images/services/arrow-bottom.svg`}  width={21} height={12} alt="arrow-bottom" />
                                        </span>
                                    </div>
                                    {errors.billing_address  && ( <Errors>{errors.billing_address }</Errors>  )}
                                </div>
                                <div className="border-t border-[#E5E5E5] pt-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className=" flex gap-4 items-center">
                                            <input className="w-4 h-4" id="save_payment" type="checkbox"  checked={inputs.save_payment}
                                            onChange={(e) => setInputs({ ...inputs, save_payment: e.target.checked })}/>
                                            <Label variant={2} htmlFor="save_payment" className={`text-[#666666]`}>Save payment method for future bookings</Label>
                                        </div>
                                        <div className="">
                                           <div className=" flex gap-4 items-center">
                                              <input className="w-4 h-4" id="agree" type="checkbox"  checked={inputs.agree} 
                                              onChange={(e) => validateError("agree",e.target.checked)}/>
                                              <Label variant={2} htmlFor="agree" className={`text-[#666666]`}>I agree to the <a href="#"  className="text-[#1a1a1a] underline">Terms of Service</a> and Privacy <a href="#" className="text-[#1a1a1a] underline">Privacy Policy</a></Label>
                                            </div>
                                           {errors.agree  && ( <Errors>{errors.agree }</Errors>  )}
                                        </div>
                                        <div className="">
  <Button
    type="button"
    onClick={handlePayment}
    disabled={loading} // disable while processing
    className={`flex justify-center items-center gap-4 w-full md:text-[21px] md:py-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Processing...
      </span>
    ) : (
      <>
        <Image src="images/services/lock.svg" width={21} height={24} alt="lock" />
        Complete Payment - ${formData?.totalPrice.toFixed(2)}
      </>
    )}
  </Button>
</div>

                                        <div className="">
                                            <div className="flex justify-center items-center gap-5">
                                                <Image src={paymentInformation.usp.icon}  width={20} height={21} alt="Security"/>
                                                <span className="text-[#666666] text-[14px]">{paymentInformation.usp.heading}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F0F0F0] rounded-[20px] p-8">
                            <h5 className="text-[#1A1A1A] text-[21px] font-semibold mb-4">We Accept</h5>
                            <div className="flex items-center gap-5">
                                <Image src="images/services/gpay.svg" width={39} height={31} alt="G pay" />
                                <Image src="images/services/apay.svg" width={39} height={31} alt="A pay" />
                                <Image src="images/services/discover.svg" width={39} height={31} alt="Discover" />
                                <Image src="images/services/american.svg" width={39} height={31} alt="American" />
                                <Image src="images/services/master.svg" width={39} height={31} alt="Master" />
                                <Image src="images/services/visa.svg" width={39} height={31} alt="Visa" />            
                            </div>
                        </div>
                        <div className="">
                            <Button type="button" onClick={prevStep} variant={`lightGrayB`} className="w-full flex gap-3 justify-center md:text-[21px] bg-[#fff]"><Image src="images/services/back.svg" width={18} height={21} alt="back"/>Back to Details</Button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default function Step4(props) {
  return (
    <Elements stripe={stripePromise}>
      <Step4Form {...props} />
    </Elements>
  );
}
