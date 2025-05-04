"use client";
import { cn } from "@/lib/utils";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandTwitter,
  IconLayoutNavbarCollapse,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  isDesktop = true,
}: {
  items: { label: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  isDesktop?: boolean;
}) => {
  return (
    <>
      {isDesktop ? (
        <FloatingDockDesktop items={items} className={desktopClassName} />
      ) : (
        <FloatingDockMobile items={items} className={mobileClassName} />
      )}
    </>
  );
};

const iconComponents = {
  IconBrandGithub: IconBrandGithub,
  IconBrandFacebook: IconBrandFacebook,
  IconBrandLinkedin: IconBrandLinkedin,
  IconBrandTwitter: IconBrandTwitter,
  IconBrandMedium: IconBrandMedium,
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { label: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => {
              const IconComponent =
                iconComponents[item.icon as keyof typeof iconComponents];
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <a
                    href={item.href}
                    key={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0c3d60] hover:bg-sky-800 shadow-lg hover:shadow-2xl shadow-sky-900"
                  >
                    <IconComponent className="h-4 w-4 text-white"/>
                
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { label: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto lg:hidden flex justify-center h-16 items-center gap-4 rounded-full bg-gradient-to-r from-[#0c3d60] to-[#0c3d60]/50 backdrop-blur-lg  shadow-lg px-4 md:flex mb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.label} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  label,
  icon,
  href,
}: {
  mouseX: MotionValue;
  label: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 "
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 "
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
