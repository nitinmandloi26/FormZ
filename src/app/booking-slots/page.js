import Header from "@/components/header";
import Footer from "@/components/footer";
import bookingSlotsConfig from "@/config/bookingSlotsConfig";
import BookingSlotsPage from "@/components/booking-slots";

export default function BookingSlot(){
    return (
        <div className="min-h-screen w-full">
            <Header/>
            <BookingSlotsPage {...bookingSlotsConfig}/>
            <Footer/>
        </div>
    );
}