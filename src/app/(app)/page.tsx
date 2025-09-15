"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import messages from "../../messages.json"

const Home = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 p-12">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the world of anonymous conversation
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore Mystery Message where your identity remains a secret
          </p>
        </section>

        {/* Carousel Section */}
        <div className="flex justify-center items-center w-full">
          <Carousel
            plugins={[Autoplay({ delay: 2500 })]}
            className="w-full max-w-md mx-auto"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-100 via-white to-pink-100">
                      <CardHeader className="flex flex-col items-center gap-2">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                          🕵️
                        </div>
                        <p className="text-sm text-gray-600">Anonymous says...</p>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center p-6">
                        <span className="text-lg font-semibold text-center leading-relaxed">
                          “{message.content}”
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6">
        © 2025 True Feedback. All rights reserved.
      </footer>
    </>
  )
}

export default Home
