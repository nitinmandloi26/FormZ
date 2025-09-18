import Header from "@/components/header";
import Footer from "@/components/footer";
import BookingSlotsPage from "@/components/booking-slots";

export default function BookingSlot(){
    return (
        <div className="min-h-screen w-full">
            <Header/>
            <BookingSlotsPage />
            <Footer/>
        </div>
    );
}