"use client";
import { useState, useEffect } from "react";
import { Heading, Content, Label, Button, formatDate, Errors, Input, Select,TextArea  } from "@/components/ui";
import Image from "next/image";
const Step3 = ({hero,propertyType,prices,formData,handleChange,nextStep, prevStep }) => {
    const serviceFee = formData.serviceFee || 0;
    const taxPrice =  serviceFee * prices.taxFee.price / 100;
    const totalPrice = serviceFee + prices.plateformFee.price + taxPrice;
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
    firstName:formData?.firstName || "",
    lastName: formData?.lastName || "",
    email: formData?.email || "",
    phone:formData?.phone || "",
    street: formData?.location?.street || "",
    city: formData?.location?.city || "",
    state: formData?.location?.state || "",
    zip: formData?.location?.postcode || "",
    apartment: formData?.apartment || "",
    notes: formData?.notes || "",
    propertyType: formData?.propertyType || "",
    promotion: formData?.promotion || false,
    serviceFee:serviceFee,
    plateformFee:prices.plateformFee.price,
    taxFee: taxPrice,
    totalPrice: totalPrice
  });

  useEffect(() => {
  handleChange({ ...inputs });
}, [inputs]); // <- always provide dependency array

 const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) return error = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) return error = "Last name is required";
        break;
      case "email":
        if (!value.trim()) return error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) return error = "Invalid email format";
        break;
      case "phone":
        if (!value.trim()) return error = "Phone number is required";
        else if (!/^\+?\d{7,15}$/.test(value)) return error = "Invalid phone number";
        break;
      case "street":
        if (!value.trim()) return error = "Street address is required";
        break;
      case "city":
        if (!value.trim()) return error = "City is required";
        break;
      case "state":
        if (!value.trim()) return error = "State is required";
        break;
      case "zip":
        if (!value.trim()) return error = "ZIP code is required";
        else if (!/^\d{4,10}$/.test(value)) return error = "Invalid ZIP code";
        break;
      case "propertyType":
        if (!value.trim()) return error = "Please select a property type.";
        break;
      default:
        break;
    }

  };

  const validateError = (name,value) => { 
    setInputs({ ...inputs, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }


  // 🔘 Validate all fields before payment
 const handlePayment = () => {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "street",
    "city",
    "state",
    "zip",
    "propertyType",
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

  // stop if any errors exist
  if (Object.keys(newErrors).length > 0) return;

  // proceed to next step
  handleChange({ ...inputs });
  nextStep();
};
    
    return(
        <div className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="text-center mb-6 md:mb-12">
                    <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
                    <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0 italic`}>{hero.content}</Content>
                </div>
                <div className="grid grid-cols-[1.8fr_repeat(1,1fr)] gap-10 items-start">
                    <div className="border border-[#E5E7EB] rounded-2xl p-11">
                        <div className="mb-5">
                            <Heading level={3} size={4} className={`mb-7`}>Personal Information</Heading>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="mb-8">
                                        <Label>First Name *</Label>
                                        <Input placeholder="Enter your first name" value={inputs.firstName}
  onChange={(e) => validateError("firstName",e.target.value)}
/>            {errors.firstName  && ( <Errors>{errors.firstName }</Errors>  )}
                                    </div>
                                    <div className="mb-8">
                                        <Label>Last Name *</Label>
                                        <Input placeholder="Enter your last name" value={inputs.lastName}
  onChange={(e) =>validateError("lastName",e.target.value)}/>
   {errors.lastName  && ( <Errors>{errors.lastName }</Errors>  )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="mb-8">
                                        <Label>Email Address *</Label>
                                        <Input type="email" placeholder="your.email@example.com" value={inputs.email}
  onChange={(e) => validateError("email",e.target.value)}/>
  {errors.email  && ( <Errors>{errors.email }</Errors>  )}
                                    </div>
                                    <div className="mb-8">
                                        <Label>Phone Number *</Label>
                                        <Input placeholder="+1 (555) 123-4567" value={inputs.phone}
  onChange={(e) => validateError("phone",e.target.value)}/>
  {errors.phone  && ( <Errors>{errors.phone }</Errors>  )}
                                    </div>
                                </div>
                        </div>
                        <div className="mb-5">
                            <Heading level={3} size={4} className={`mb-7`}>Service Address</Heading>
                                <div className="mb-8">
                                    <Label>Street Address *</Label>
                                    <Input placeholder="123 Main Street" value={inputs.street}
  onChange={(e) => validateError("street",e.target.value)}/>
   {errors.street  && ( <Errors>{errors.street }</Errors>  )}
                                </div>
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="mb-8">
                                        <Label>City *</Label>
                                        <Input placeholder="New York" value={inputs.city}
  onChange={(e) => validateError("city",e.target.value)}/>
  {errors.city  && ( <Errors>{errors.city }</Errors>  )}
                                    </div>
                                    <div className="mb-8">
                                        <Label>State *</Label>
                                        <Input placeholder="Select State" value={inputs.state}
  onChange={(e) => validateError("state",e.target.value)}/>
                                        {errors.state  && ( <Errors>{errors.state }</Errors>  )}
                                    </div>
                                        <div className="mb-8">
                                        <Label>ZIP Code *</Label>
                                        <Input placeholder="10001" value={inputs.zip}
  onChange={(e) => validateError("zip",e.target.value)}/>
  {errors.zip  && ( <Errors>{errors.zip }</Errors>  )}
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <Label>Apartment/Unit (Optional)</Label>
                                    <Input placeholder="Apt 4B, Unit 12, etc." value={inputs.apartment}
  onChange={(e) => validateError("apartment",e.target.value)}/>
                                </div>
                        </div>
                        <div className="">
                            <Heading level={3} size={4} className={`mb-7`}>Additional Information</Heading>
                            <div className="mb-8">
                                    <Label>Special Instructions/Notes</Label>
                                    <TextArea className={`h-40 text-[16px] placeholder:w-130`} placeholder="Please include any special instructions, access codes, pet  information, or specific cleaning preferences..."
                                    value={inputs.notes}
  onChange={(e) => validateError("notes",e.target.value)}></TextArea>
                                </div>
                            <div className="mb-8">
                                    <Label>Property Type</Label>
                                    <div className="grid grid-cols-4 gap-4">
                                    {propertyType.map((property,index) => {
                                        const isSelected = inputs.propertyType === property;
                                        return (
                                        <div key={index} onClick={() =>validateError("propertyType",property)}
 className={`px-6 py-4 cursor-pointer border rounded-2xl flex items-center gap-4 transition-colors
            ${isSelected ? "border-black bg-[#1a1a1a] text-[#fff]" : "border-[#E5E5E5]"}`}
>
                                            <span className={`w-4 h-4 block border rounded-full ${
              isSelected ? "bg-[#fff] border-[#fff]" : "border-[#858585]"
            }`}
></span>{property}</div>
                                        )})}
                                    </div>
                                     {errors.propertyType  && ( <Errors>{errors.propertyType }</Errors>  )}
                            </div>
                            <div className="">
                                <div className=" flex gap-4 items-center">
                                <input className="w-4 h-4" id="promotion" type="checkbox" value={1} checked={inputs.promotion} 
                                onChange={(e) => setInputs({ ...inputs, promotion: e.target.checked })} />
                                <Label variant={2} htmlFor="promotion" className={`text-[#666666]`}>I would like to receive updates and promotional offers via email</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#F0F0F0] rounded-2xl p-8">
                        <Heading level={3} size={1} className={`mb-7`}>Booking Summary</Heading>
                    <div className="grid grid-col-1 gap-6">
                        <div className="grid grid-col-1 gap-6">
                            <div className="flex items-center gap-3">
                                <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
                                    <Image src={`images/services/clean.svg`} width={20} height={18} alt="service" />
                                </span>
                                <div className="">
                                    <Heading level={4} size={3}>Service</Heading>
                                    <Content variant={2}>{formData?.service?.service.title}</Content>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
                                    <Image src={`images/services/booking.svg`} width={25} height={25} alt="service" />
                                </span>
                                <div className="">
                                    <Heading level={4} size={3}>Booking Type</Heading>
                                    <Content variant={2}>{formData?.frequency?.option.label}</Content>
                                </div>
                            </div>
                        </div>
                        {[...formData.booking].reverse().map((b, idx) => (
                        <div key={idx} className="grid grid-col-1 gap-6 pb-6 border-b border-[#E5E5E5]">
                                {idx !== 0 && <h3 className="font-semibold text-lg text-[#1a1a1a]">Next Schedule</h3>}
                            <div  className="flex items-center gap-3">
                                <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
                                    <Image src={`images/services/date.svg`} width={16} height={18} alt="service" />
                                </span>
                                <div className="">
                                    <Heading level={4} size={3}>Date</Heading>
                                    <Content variant={2}>{formatDate(b.date)}</Content>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
                                    <Image src={`images/services/clock.svg`} width={18} height={18} alt="service" />
                                </span>
                                <div className="">
                                    <Heading level={4} size={3}>Time</Heading>
                                    <Content variant={2}>{b?.timeSlot?.time || "Not selected"}</Content>
                                </div>
                            </div>
                        </div>
                             )) }
                        <div className="">
                          
                            <table className="w-full">
                                <tbody>
                                <tr>
                                    <th className="text-left text-[#666666] text-[20px] font-normal py-1">{prices.serviceFee.label}</th>
                                    <td className="text-right text-[#1a1a1a] text-[20px] font-normal py-1">${serviceFee.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th className="text-left text-[#666666] text-[20px] font-normal py-1">{prices.plateformFee.label}</th>
                                    <td className="text-right text-[#1a1a1a] text-[20px] font-normal py-1">${prices.plateformFee.price.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th className="text-left text-[#666666] text-[20px] font-normal py-1 pb-3">{prices.taxFee.label}</th>
                                    <td className="text-right text-[#1a1a1a] text-[20px] font-normal py-1 pb-3">${taxPrice.toFixed(2)}</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr className="border-t border-[#E5E5E5]">
                                    <th className="text-left text-[#1a1a1a] text-[20px] font-semibold pt-3">{prices.totalPrice.label}</th>
                                    <td className="text-right text-[#1a1a1a] text-[24px] font-bold pt-3">${totalPrice.toFixed(2)}</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <Button variant={`lightGrayB`} type="button" onClick={prevStep} className={`block w-full`}>Back to Schedule</Button>
                            <Button type="button" className={`block w-full`} onClick={handlePayment}>Continue to Payment</Button>
                        </div>
                    </div>
                      


                    </div>
                </div>
            </div>
          
        </div>
    );
}
export default Step3;