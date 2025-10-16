// config/home.config.js

const homeConfig = {
  heroSection: {
    hero:{
      heading: "Spotless Cleaning, Just a Click Away",
      content:
      "Book trusted cleaning professionals for your home, office, or business. Simply choose your service, pick a time, and enjoy spotless results.",
      buttonLabel: "Book Now",
      buttonLink: "/booking",
    },
    card:{
      img: "images/credit-card.svg",
      text: "No credit card needed",
    },
    image:{
      desktop:"images/home-img-1.png",
      mobile:"images/home-img-11.png"
    },
    steps:{
      heading: "A Simpler Way to Book Cleaning",
      content: "Get your space cleaned in just three simple steps.",
      items: [
      {
        icon: "images/credit-card.svg",
        title: "1. Select Cleaning Type",
        content:
          "Choose from residential, commercial, deep cleaning, or specialized services.",
      },
      {
        icon: "images/calender.svg",
        title: "2. Pick a Time & Date",
        content:
          "Select a convenient time slot that fits, perfectly into your busy schedule.",
      },
      {
        icon: "images/mark.svg",
        title: "3. Relax & Enjoy",
        content:
          "Our vetted cleaning professionals will arrive on time and deliver spotless results.",
      },
    ]
    }
  },

  cleaningServices: {
    heading: "Choose Your Cleaning Service",
    content: "Select the perfect cleaning solution for your needs.",
    cards: [
      {
        src: "images/residental.png",
        title: "Residential Cleaning",
        content: "Complete home cleaning services",
      },
      {
        src: "images/commercial.png",
        title: "Commercial Cleaning",
        content: "Office and business cleaning solutions",
      },
      {
        src: "images/deep.png",
        title: "Deep Cleaning",
        content: "Thorough top-to-bottom cleaning",
      },
      {
        src: "images/carpet.png",
        title: "Carpet & Upholstery",
        content: "Specialized fabric cleaning services",
      },
      {
        src: "images/window.png",
        title: "Window Cleaning",
        content: "Crystal clear window solutions",
      },
      {
        src: "images/move.png",
        title: "Move-in/Move-out",
        content: "Complete transition cleaning",
      },
    ],
    buttonLabel: "View All Cleaning Services",
    buttonLink: "#",
  },

  testimonial: {
    heading: "Trusted by Thousands Worldwide",
    content: "See what our happy customers are saying about cleanly.",
    items: [
      {
        src: "images/sarah.jpg",
        name: "Sarah L.",
        position: "Homeowner",
        content:
          '"Cleanly has been a lifesaver! The booking process is incredibly simple and the quality of cleaning is consistently top-notch. My house has never looked better."',
      },
      {
        src: "images/michael.jpg",
        name: "Michael B.",
        position: "Office Manager",
        content:
          '"We use Cleanly for our weekly office cleanings. The platform makes it easy to manage schedules and payments. Our workspace is always spotless and professional."',
      },
      {
        src: "images/jessica.jpg",
        name: "Jessica P.",
        position: "Busy Professional",
        content:
          '"The deep cleaning service was amazing! They got into every corner and crevice. I love coming home to a perfectly clean space without lifting a finger."',
      },
    ],
  },
};

export default homeConfig;