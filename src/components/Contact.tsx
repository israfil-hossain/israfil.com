"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const defaultFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required "),
  message: Yup.string().required("Message is required"),
});

export const Contact = ({ type }: { type?: any }) => {
  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    const scriptUrl = process.env.NEXT_PUBLIC_APPSCRIPT_URL || "https://script.google.com/macros/s/AKfycbznnJ3OVd5hvocaB9HRLuGjy4FhJMT1VEsXrIcsZqsnJvCkTGyKSvv-V8mYKy2hGtaC/exec";

    const formData = new URLSearchParams();
    formData.append("entry.463545241", values.name);
    formData.append("entry.212771309", values.email);
    formData.append("entry.532917720", values.subject);
    formData.append("entry.1689604989", values.message);

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const result = await response;
      if (result) {
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
      <Formik
        initialValues={defaultFormState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }:{isSubmitting: any}) => (
          <Form className="form">
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="w-full">
                <Field
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="w-full">
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5 mt-4">
              <div className="w-full">
                <Field
                  type="text"
                  name="subject"
                  placeholder="Your Subject"
                  className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
                />
                <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {/* <div className="w-full">
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div> */}
            </div>
            <div>
              <Field
                as="textarea"
                name="message"
                placeholder="Your Message"
                rows={10}
                className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full"
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
              className={`mx-auto lg:w-[200px] w-[150px] items-center flex justify-center px-2 py-2 mt-4 rounded-md font-bold text-white transition-all ${
                !isSubmitting
                  ? "bg-gradient-to-r from-indigo-800 to-purple-700 hover:from-indigo-900 hover:to-purple-900"
                  : "bg-neutral-300 cursor-not-allowed"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};