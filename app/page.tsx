import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ClientTestimonialsPage from "@/components/client-testimonials-page";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Service from "@/components/Service";
import Project from "@/components/Projects";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Project />
      <Service />
     
      <ClientTestimonialsPage />
      <ContactForm />
      <Footer />
    </>
  );
}
