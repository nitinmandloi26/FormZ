import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesPage from "@/components/services";

export default function Services(){
    return(
        <div className="min-h-screen">
            <Header/>
            <ServicesPage />
            <Footer/>
        </div>
    );
}