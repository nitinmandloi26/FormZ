import Header from "@/components/header";
import Footer from "@/components/footer";
import BookingSteps from "@/components/booking-steps/booking-steps";

const bookingPage = () =>{
    return(
        <div className="min-h-screen w-full">
            <Header/>
            <BookingSteps />
            <Footer/>
        </div>
    );
}

export  default bookingPage;