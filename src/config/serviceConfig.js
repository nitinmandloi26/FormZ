const serviceConfig = {
    hero:{
        heading:"Choose Your Service",
        content:"Select the cleaning service that best fits your needs. We'll connect you with trusted professionals in your area."
    },
    services:[
        {
            icon:"images/services/home.svg",
            title:"Residential Cleaning",
            content:"Complete home cleaning services for apartments, houses, and condos.",
            tags:["Kitchen","Bathrooms","Living Areas"]
        },
        {
            icon:"images/services/commercial.svg",
            title:"Commercial",
            content:"Professional cleaning for offices, retail spaces, and businesses.",
            tags:["Offices","Retail","Restaurants"]
        },
        {
            icon:"images/services/mark.svg",
            title:"Deep Cleaning",
            content:"Thorough top-to-bottom cleaning for move- ins, spring cleaning, or special occasions.",
            tags:["Inside Appliances","Baseboards","Light Fixtures"]
        },
        {
            icon:"images/services/carpet.svg",
            title:"Carpet & Upholstery",
            content:"Specialized cleaning for carpets, rugs, and upholstered furniture.",
            tags:["Steam Cleaning","Stain Removal","Deodorizing"]
        },
        {
            icon:"images/services/window.svg",
            title:"Window Cleaning",
            content:"Crystal clear window cleaning for homes and businesses.",
            tags:["Interior & Exterior","Screen Cleaning","Sill Wiping"]
        },
        {
            icon:"images/services/truck.svg",
            title:"Move-in/Move-out",
            content:"Complete cleaning for property transitions and new beginnings.",
            tags:["Deep Clean","Sanitization","Move-ready"]
        }
    ],
    fields:{
        location:{
            label:"Service Location",
            placeholder:"Enter your address or zip code",
            suffix:"images/services/location.svg",
        },
        frequency:{
            label:"Cleaning Frequency",
            options:[
                {
                    label:"One-time",
                    value:"Multi-Date Booking"
                },
                {
                    label:"Weekly",
                    value:"Every week"
                },
                {
                    label:"Bi-weekly",
                    value:"Every 2 weeks"
                },
                {
                    label:"Monthly",
                    value:"Once a month"
                }
            ]
        },
        buttonShedule: "Continue to Schedule",
        buttonQuote:"Get Instant Quote"
    },
    errorMsg:{
        service:"Please select a service.",
        frequency: "Please select a frequency.",
        location:"Please enter a location."
    }
}

export default serviceConfig;