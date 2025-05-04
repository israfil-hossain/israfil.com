import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Highlight } from "../Highlight";

export function TimelineDemo() {
  const data = [
    {
      title: "2024 – Present",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm">
            Continuing as a{" "}
            <Highlight className="bg-yellow-100">Software Engineer</Highlight>,
            focusing on building scalable systems, enhancing performance, and
            mentoring junior developers, Working as <strong>Team Lead</strong>{" "}
            of my current project.
          </p>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Working in{" "}
            <strong>TechnoNext Map Portal Admin Dashboard.</strong>
          </div>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Working in <strong>TechnoNext Map Core Admin Dashboard.</strong>
          </div>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Working in Build Image ComprasorApplication Frotnend Side..
          </div>
          
          ❇️ Freelance Recognition: I promoted to <Highlight className="bg-green-100"> Level 2 Freelance Software Developer on Fiverr,
          </Highlight>
          known for delivering high-quality, client-focused solutions.
        </div>
        
      ),
    },
    {
        title: "2023 – 2024",
        content: (
          <div>
            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm">
             🔵 Promotod to  <Highlight className="bg-pink-100">Software Engineer</Highlight>  at TechnoNext{" "},
              focusing on building scalable systems, enhancing performanc.
            </p>
            <div className="text-xs text-neutral-700 md:text-sm py-1">
              ❇️ Working on <strong>Flight Safety Application</strong>
            </div>
            <div className="text-xs text-neutral-700 md:text-sm py-1">
              ❇️ Working on <strong>Fuel Efficienty Application</strong>
            </div>
          </div>
        ),
      },
    {
      title: "2022 - 2023",
      content: (
        <div>
          
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm ">
            🔵 Joined TechnoNext as a{" "}
            <Highlight className="bg-indigo-100 text-xs font-medium">
              Trainee Software Engineer
            </Highlight>
            . After 6 months of intensive training and contribution, promoted to
            Junior Software Engineer.
          </p>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Working on <strong>KIOSK Machine Project</strong> (Airport
            Boarding Pass Ticket Printing project)
          </div>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Working on{" "}
            <strong>USBExpress Multiprinting Windows Service</strong>
          </div>

          <p className="mb-5 mt-5 text-xs font-normal text-neutral-800 md:text-sm ">
            🔵 Promotod to <Highlight className="bg-red-100">Junior Software Engineer</Highlight> at TechnoNext, taking on
            greater responsibilities in architecture, development, and
            mentoring.
          </p>
          <div className="mb-8">
            <div className="text-xs text-neutral-700 md:text-sm py-1">
              ❇️ Working on <strong>CartUp Ecommerce Website</strong>
            </div>
            <div className="text-xs text-neutral-700 md:text-sm py-1">
              ❇️ Working on{" "}
              <strong>OTA (Online Travel Agency) Accounting Software</strong> -
              FirstTrip
            </div>
            <div className="text-xs text-neutral-700 md:text-sm py-1">
              ❇️ Working on <strong>FirstTrip ADMIN Panel</strong>
            </div>
          </div>
          
        </div>
      ),
    },
    {
      title: "2021 – 2022",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm ">
            🔵 Worked as a Frontend Engineer at{" "}
            <Highlight className="bg-green-100">Olivine Ltd.</Highlight>,
            contributing to user interface development and modern web solutions.
          </p>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Working on <strong>Prottoyon Project</strong> (Authentication Modules. 
                Holding Tax,  Trade Licence modules. )
          </div>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Work with HTML, CSS, JavaScript, React Js, tailwind css.Responsive UI DESIGN. 
          </div>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ Delivered a well-structured and efficient solution through team collaboration and strategic problem-solving.
            Olivine Ltd .
          </div>
          <p className="mt-5 mb-4 text-xs font-normal text-neutral-800 md:text-sm ">
            🔵 Served as a{" "}
            <Highlight className="bg-lime-100">
              {" "}
              Teaching Assistant at AIUB
            </Highlight>{" "}
            for 4 months, supporting academic instruction and student learning.
          </p>
         
           ❇️ Freelance Recognition: Start Freelancing well known Platform in  <Highlight className="bg-rose-100">fiver. 
          </Highlight>
        </div>
      ),
    },
    {
      title: "2018 – 2022",
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-gray-800 md:text-sm ">
            🔵 Completed B.Sc. in Computer Science and Software Engineering from
            American International University-Bangladesh (AIUB).
          </p>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ I was Completed{" "}
            <Highlight className="bg-orange-100">CCNA</Highlight> Course .
          </div>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ I was Earned <Highlight className="bg-teal-100">CEH</Highlight>{" "}
            Vendor Certificate .
          </div>
          <div className="text-xs text-neutral-700 md:text-sm py-1">
            ❇️ I participated in Competitive Programming.
          </div>
          
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
