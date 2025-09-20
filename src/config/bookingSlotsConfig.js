const bookingSlotsConfig = {
    hero:{
        heading:"Select Date & Time",
        content:"Choose your preferred date and available time slot"
    },
    slots:{
        selectDate: "Select Date",
        availableSlot: "Available Time Slots",
        timeslots:[
            {
                label:"Morning",
                periods:[
                    {
                        time:"8:00 AM",
                        check:"available"
                    },
                    {
                        time:"9:00 AM",
                        check:"available"
                    },
                    {
                        time:"10:00 AM",
                        check:"available"
                    },
                    {
                        time:"11:00 AM",
                        check:"booked"
                    }
                ]
            },
            {
                label:"Afternoon",
                periods:[
                    {
                        time:"12:00 PM",
                        check:"available"
                    },
                    {
                        time:"1:00 PM",
                        check:"available"
                    },
                    {
                        time:"2:00 PM",
                        check:"available"
                    },
                    {
                        time:"3:00 PM",
                        check:"available"
                    }
                ]
            },
            {
                label:"Evening",
                periods:[
                    {
                        time:"4:00 PM",
                        check:"available"
                    },
                    {
                        time:"5:00 PM",
                        check:"available"
                    },
                    {
                        time:"6:00 PM",
                        check:"booked"
                    },
                    {
                        time:"7:00 PM",
                        check:"available"
                    }
                ]
            }
        ]
    }
}

export default bookingSlotsConfig;