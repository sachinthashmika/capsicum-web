"use client"

import LayoutWrapper from "@/components/ui/LayoutWrapper"
import { Button } from "./ui/Button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Contact() {
  return (
    <LayoutWrapper>
      <section className="bg-dark-bg py-16 px-4">
        <h1 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight uppercase text-center text-white">
          CONTACT US
        </h1>
      </section>

      <section className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-6xl bg-[#111111] rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Side - Contact Information with Background Image */}
            <div className="relative p-8 md:p-12 overflow-hidden bg-gradient-to-br from-[#111111] to-[#1a1a1a]">
              {/* Background Image */}
              <div 
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage: "url('/contactbg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              ></div>
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-[#c9c9c9] text-base mb-12">
                {"Let's connect and bring your vision to life."}
                </p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-base">+94 767962610</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-base">info@capsicum.lk</span>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-white text-base leading-snug">
                      <div>474/1, Wathurapatha,</div>
                      <div>Heiyanthuduwa</div>
                    </div>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-16">
                  {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 border border-brand rounded-lg flex items-center justify-center hover:bg-brand transition-colors cursor-pointer bg-black bg-opacity-30 backdrop-blur-sm"
                    >
                      <Icon className="w-5 h-5 text-brand hover:text-white" />
                    </div>
                  ))}
                </div>

                {/* Bell Pepper Icon - positioned like in UI */}
                <div className="absolute -bottom-30 -right-20 w-48 h-56 overflow-hidden">
                  <Image
                    src="/icon.png"
                    alt="Bell Pepper Icon"
                    width={240}
                    height={288}
                    className="object-contain opacity-90 transform scale-x-[-1]"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-[#303030] p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">First Name</label>
                    <Input
                      className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 py-3 text-white placeholder:text-gray-400 focus:border-brand focus:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Last Name</label>
                    <Input
                      className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 py-3 text-white placeholder:text-gray-400 focus:border-brand focus:ring-0"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 py-3 text-white placeholder:text-gray-400 focus:border-brand focus:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Phone Number</label>
                    <Input
                      type="tel"
                      className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 py-3 text-white placeholder:text-gray-400 focus:border-brand focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-3 text-white placeholder:text-gray-400 focus:border-brand focus:ring-0 min-h-[120px] resize-none"
                    placeholder="Write your message..."
                  />
                </div>

                <div className="flex justify-end pt-8">
                  <Button
                    type="submit"
                    className="bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                  >
                    Send a Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}