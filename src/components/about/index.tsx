"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";
import { TimelineDemo } from "../time-line";
import { Highlight } from "../Highlight";

export default function About() {
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];
  return (
    <div>
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
        {images?.map((image, index) => (
          <motion.div
            key={image}
            initial={{
              opacity: 0,
              y: -50,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? 3 : -3,
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="about"
              className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
            />
          </motion.div>
        ))}
      </div> */}

      <h2 className="text-lg md:text-4xl mb-4 text-black  max-w-4xl pt-5">
      🔰 Hi, I'm Israfil Hossain — a passionate developer, creative writer, and
        design enthusiast.
      </h2>
      <Paragraph>
      🔰 <Highlight className="bg-yellow-100">Software Engineer with 3.5</Highlight>  years of experience in developing scalable
        web applications in dynamic and collaborative Agile environments.
        <Highlight className="bg-blue-100">Expertise</Highlight>: JavaScript, React, Next.js, React Native, and state
        management tools including Zustand, Redux Toolkit, and Context API.
        Styling Proficiency: Tailwind CSS, ShadCn, Bootstrap,AntD Version
        Control: Git, GitHub, GitLab, Bitbucket. Freelance Recognition:<Highlight className="bg-green-100">Level 2</Highlight> 
        Freelance Software Developer on <Highlight className="bg-emerald-200">Fiverr</Highlight>, known for delivering
        high-quality, client-focused solutions. Key Strengths: Component-Based
        Architecture, Responsive Design, Performance Optimization (FCP and LCP),
        and Progressive Web Application Development, Strong Problem Solving
        skill, Delivery high quality product according to requirements .
      </Paragraph>

      <TimelineDemo />

      <div className="max-w-4xl">
        <Paragraph className="mt-4">
        🔰 Since the early days of my journey, I&apos;ve been captivated by the
          art of crafting exceptional digital experiences. As a developer, I
          thrive on turning lines of code into functional and elegant solutions.
          My goal is to not just create software, but to build digital marvels
          that seamlessly merge form and function.
        </Paragraph>

        <Paragraph className="mt-4">
        🔰 But my journey doesn&apos;t stop at coding. With a heart full of words
          and a mind brimming with ideas, I&apos;ve ventured into the realm of
          writing. From tech articles that unravel complex concepts to creative
          tales that ignite the imagination, I weave words to inform, entertain,
          and inspire.
        </Paragraph>

        <Paragraph className="mt-4">
        🔰 What sets me apart is my unwavering appreciation for design. I believe
          that aesthetics and usability go hand in hand. My eye for awesome
          design ensures that every project I undertake not only works
          flawlessly under the hood but also looks stunning on the surface.
        </Paragraph>

        <Paragraph className="mt-4">
        🔰 Beyond the screen, I love traveling and exploring new cultures—it
          fuels my creativity and brings fresh perspectives to my work. I also
          enjoy learning about new technologies and experimenting with ideas to
          build SaaS applications. These experiments not only sharpen my
          technical skills but bring me closer to my long-term goal of building
          a startup that solves real-world problems.
        </Paragraph>

        <Paragraph className="mt-4">
        🔰 Through this website, I aim to share my insights, experiences, and
          creations with you. Whether you&apos;re a fellow developer seeking
          solutions, a fellow writer in search of inspiration, or simply someone
          who appreciates the finer aspects of design, there&apos;s something
          here for you.
        </Paragraph>

        <Paragraph className="mt-4">
        🔰 Join me on this journey of bytes and narratives, logic and creativity,
          code and prose. Together, we can explore the boundless possibilities
          of technology and storytelling, all while reveling in the sheer beauty
          of thoughtful design.
        </Paragraph>

        <Paragraph className="mt-4">
        🔰 Thank you for being here, and I can&apos;t wait to embark on this
          adventure with you.
        </Paragraph>
      </div>
    </div>
  );
}
