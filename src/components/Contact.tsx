"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  location: {
    value: "",
    error: "",
  },
  phone: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};

export const Contact = ({ type }: { type?: any }) => {
  const [formData, setFormData] = useState(defaultFormState);

  const validateForm = () => {
    let isValid = true;
    const newFormData = { ...formData };

    // Validate Name
    if (!newFormData.name.value.trim()) {
      newFormData.name.error = "Name is required";
      isValid = false;
    } else {
      newFormData.name.error = "";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newFormData.email.value.trim()) {
      newFormData.email.error = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(newFormData.email.value)) {
      newFormData.email.error = "Invalid email address";
      isValid = false;
    } else {
      newFormData.email.error = "";
    }

    // Validate Location (optional, no validation needed)
    newFormData.location.error = "";

    // Validate Phone
    const phoneRegex = /^\d{11}$/; // Example: 10-digit phone number
    if (!newFormData.phone.value.trim()) {
      newFormData.phone.error = "Phone is required";
      isValid = false;
    } else if (!phoneRegex.test(newFormData.phone.value)) {
      newFormData.phone.error = "Invalid phone number (10 digits required)";
      isValid = false;
    } else {
      newFormData.phone.error = "";
    }

    // Validate Message
    if (!newFormData.message.value.trim()) {
      newFormData.message.error = "Message is required";
      isValid = false;
    } else {
      newFormData.message.error = "";
    }

    setFormData(newFormData);
    return isValid;
  };

  const isFormValid = () => {
    return (
      formData.name.value.trim() &&
      !formData.name.error &&
      formData.email.value.trim() &&
      !formData.email.error &&
      formData.phone.value.trim() &&
      !formData.phone.error &&
      formData.message.value.trim() &&
      !formData.message.error
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const values = {
        name: formData.name.value,
        email: formData.email.value,
        location: formData.location.value,
        phone: formData.phone.value,
        message: formData.message.value,
      };

      onSubmit(values, {
        setSubmitting: (isSubmitting: boolean) => {
        },
        resetForm: () => {
          setFormData(defaultFormState);
        },
      });
    }
  };

  const onSubmit = async (values:any, { setSubmitting, resetForm }:{setSubmitting: any, resetForm: any}) => {
    const scriptUrl = process.env.NEXT_PUBLIC_APPSCRIPT_URL || "https://script.google.com/macros/s/AKfycbznnJ3OVd5hvocaB9HRLuGjy4FhJMT1VEsXrIcsZqsnJvCkTGyKSvv-V8mYKy2hGtaC/exec";
  
    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const result = await response.json();
      if (result.success) {
        toast.success("Form submitted successfully!");
        resetForm();
      } else {
        toast.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form");
    }
  
    setSubmitting(false);
  };
  

  

  return (
    <>
      <Toaster position="top-right" />
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
              value={formData.name.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: {
                    value: e.target.value,
                    error: "",
                  },
                });
              }}
            />
            {formData.name.error && (
              <p className="text-red-500 text-sm mt-1">{formData.name.error}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
              value={formData.email.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: {
                    value: e.target.value,
                    error: "",
                  },
                });
              }}
            />
            {formData.email.error && (
              <p className="text-red-500 text-sm mt-1">
                {formData.email.error}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Your Location"
              className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
              value={formData.location.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  location: {
                    value: e.target.value,
                    error: "",
                  },
                });
              }}
            />
            {formData.location.error && (
              <p className="text-red-500 text-sm mt-1">
                {formData.location.error}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
              value={formData.phone.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  phone: {
                    value: e.target.value,
                    error: "",
                  },
                });
              }}
            />
            {formData.phone.error && (
              <p className="text-red-500 text-sm mt-1">
                {formData.phone.error}
              </p>
            )}
          </div>
        </div>
        <div>
          <textarea
            placeholder="Your Message"
            rows={10}
            className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full"
            value={formData.message.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                message: {
                  value: e.target.value,
                  error: "",
                },
              });
            }}
          />
          {formData.message.error && (
            <p className="text-red-500 text-sm mt-1">
              {formData.message.error}
            </p>
          )}
        </div>
        <button
          className={`w-full px-2 py-2 mt-4 rounded-md font-bold text-white transition-all ${
            isFormValid()
              ? "bg-gradient-to-r from-indigo-800 to-purple-700 hover:from-indigo-900 hover:to-purple-900"
              : "bg-neutral-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </form>
    </>
  );
};
