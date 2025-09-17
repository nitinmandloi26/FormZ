import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesPage from "@/components/services";
import serviceConfig from "@/config/serviceConfig";

export default function Services(){
    return(
        <div className="min-h-screen w-full">
            <Header/>
            <ServicesPage {...serviceConfig}/>
            <Footer/>
        </div>
    );
}