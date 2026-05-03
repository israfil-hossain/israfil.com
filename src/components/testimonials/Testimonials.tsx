"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import Image from "next/image";
import toast from "react-hot-toast";

const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave }: any) => (
  <svg
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={`${filled ? "text-yellow-400" : "text-gray-300"} cursor-pointer transition-colors hover:text-yellow-400`}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const StarRating = ({ rating, interactive = false, onChange }: any) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= (hoverRating || rating)}
          interactive={interactive}
          onClick={() => interactive && onChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: any) => {
  const initials = testimonial.authorName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {testimonial.authorAvatar ? (
            <Image
              src={testimonial.authorAvatar}
              alt={testimonial.authorName}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">
              {testimonial.authorName}
            </h4>
            <span className="text-xs text-gray-400">
              {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <StarRating rating={testimonial.rating} />
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {testimonial.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials = ({ projectId, testimonials, averageRating }: any) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    authorAvatar: "",
    rating: 0,
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.authorName || !formData.authorEmail || !formData.rating || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.content.length < 10) {
      toast.error("Testimonial must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Testimonial submitted! It will appear after approval.");
        setFormData({ authorName: "", authorEmail: "", authorAvatar: "", rating: 0, content: "" });
        setIsFormOpen(false);
      } else {
        toast.error(data.error || "Failed to submit testimonial");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Heading as="h2" className="font-black text-2xl">
            Testimonials
          </Heading>
          {testimonials?.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={Math.round(averageRating) || 0} />
              <span className="text-sm text-gray-500">
                {averageRating?.toFixed(1) || "0"} ({testimonials.length}{" "}
                {testimonials.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {isFormOpen ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) =>
                    setFormData({ ...formData, authorName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.authorEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, authorEmail: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL (optional)
              </label>
              <input
                type="url"
                value={formData.authorAvatar}
                onChange={(e) =>
                  setFormData({ ...formData, authorAvatar: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating <span className="text-red-500">*</span>
              </label>
              <StarRating
                rating={formData.rating}
                interactive
                onChange={(rating: number) =>
                  setFormData({ ...formData, rating })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Share your experience with this project..."
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {formData.content.length}/2000 characters (min 10)
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </motion.div>
      )}

      {testimonials?.length > 0 ? (
        <div className="space-y-4">
          {testimonials.map((testimonial: any) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">
            No testimonials yet. Be the first to leave a review!
          </p>
        </div>
      )}
    </div>
  );
};
