"use client";
import { Heading, Content, Label, Input, Select } from "@/components/ui";
const Step3 = ({hero}) => {
    return(
        <div className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="text-center mb-6 md:mb-12">
                    <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
                    <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0 italic`}>{hero.content}</Content>
                </div>
                <div className="grid grid-cols-[1.8fr_repeat(1,1fr)] gap-10">
                    <div className="border border-[#E5E7EB] rounded-2xl p-11">
                        <div className="mb-5">
                            <Heading level={3} size={4} className={`mb-7`}>Personal Information</Heading>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="mb-8">
                                        <Label>First Name *</Label>
                                        <Input placeholder="Enter your first name" />
                                    </div>
                                    <div className="mb-8">
                                        <Label>Last Name *</Label>
                                        <Input placeholder="Enter your last name" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="mb-8">
                                        <Label>Email Address *</Label>
                                        <Input type="email" placeholder="your.email@example.com" />
                                    </div>
                                    <div className="mb-8">
                                        <Label>Phone Number *</Label>
                                        <Input placeholder="+1 (555) 123-4567" />
                                    </div>
                                </div>
                        </div>
                        <div className="mb-5">
                            <Heading level={3} size={4} className={`mb-7`}>Service Address</Heading>
                                <div className="mb-8">
                                    <Label>Street Address *</Label>
                                    <Input placeholder="123 Main Street" />
                                </div>
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="mb-8">
                                        <Label>City *</Label>
                                        <Input placeholder="New York" />
                                    </div>
                                    <div className="mb-8">
                                        <Label>State *</Label>
                                        <Select>
                                            <option value="">Select State</option>
                                            <option value="test1">Test 1</option>
                                        </Select>
                                    </div>
                                        <div className="mb-8">
                                        <Label>ZIP Code *</Label>
                                        <Input placeholder="10001" />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <Label>Apartment/Unit (Optional)</Label>
                                    <Input placeholder="Apt 4B, Unit 12, etc." />
                                </div>
                        </div>
                        <div className="">
                            <Heading level={3} size={4} className={`mb-7`}>Additional Information</Heading>
                            <div className="mb-8">
                                    <Label>Special Instructions/Notes</Label>
                                    <Input placeholder="Apt 4B, Unit 12, etc." />
                                </div>
                        </div>
                    </div>
                    <div className="bg-[#F0F0F0] rounded-2xl p-8">
                        <Heading level={3} size={1}>Booking Summary</Heading>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Step3;