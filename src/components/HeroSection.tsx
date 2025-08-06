import Avatar from "@/app/(home)/components/Avatar";
import Link from "next/link";
import { RainbowButton } from "./ui/rainbow-button";
import { Link as ScrollLink } from 'react-scroll';
import { bricolage_grotesque, inter } from "@/utils/fonts";

export default function HeroSection() {
  return (
    <div className="w-full flex justify-center py-5 pt-36 dark:bg-black">
      <div className="w-2/3 max-sm:w-full flex flex-col items-center">
        <Avatar />

        <div className="mt-4 px-32 max-sm:px-4 text-center">
          <h1 className={`!text-[3rem] mt-2 max-sm:!text-[1.6rem] font-bold tracking-tight ${bricolage_grotesque}`}>
            Hi, I&apos;m Varun Singh
          </h1>
          <p className={`mt-4 max-sm:mt-3 text-base max-sm:!text-sm font-normal leading-6 ${inter}`}>
         Full-Stack Developer with hands-on experience in React, Next.js, Node.js, and MongoDB. Passionate about crafting performant, scalable web applications and integrating AI-driven features to enhance user experiences.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          {/* Call button */}
          <RainbowButton>
            <a href="tel:+918433808081">Make a call</a>
          </RainbowButton>

          {/* Email button */}
          <RainbowButton>
            <a href="mailto:varunsinghh2409@gmail.com">Email me</a>
          </RainbowButton>

          {/* Scroll to contact section */}
          <RainbowButton>
            <ScrollLink to="contact-section" activeClass="active" smooth={true} offset={-120} duration={1100}>
              Get in touch
            </ScrollLink>
          </RainbowButton>
        </div>
      </div>
    </div>
  );
}
