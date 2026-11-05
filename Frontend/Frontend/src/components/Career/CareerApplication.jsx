
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  UploadCloud,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// EmailJS configuration
const SERVICE_ID = "";
const TEMPLATE_ID = "";
const PUBLIC_KEY = "";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx)$/i;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const validateFile = (file) => {
  if (!file) return "";

  // Check the extension first.
  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    return "Please upload your CV as a PDF, DOC, or DOCX file.";
  }

  // Some browsers may not provide a MIME type.
  // If a MIME type is provided, ensure it is supported.
  if (file.type && !ALLOWED_TYPES.includes(file.type)) {
    return "The selected file type is not supported. Please upload a PDF, DOC, or DOCX file.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Your CV must be 5 MB or smaller.";
  }

  return "";
};

const CareerApplicationForm = () => {
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");

  const inputClass =
    "w-full rounded-xl border border-[#dce9e4] bg-white px-4 py-3.5 text-sm text-[#18332e] outline-none transition placeholder:text-[#8a9b95] focus:border-[#159b95] focus:ring-2 focus:ring-[#159b95]/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#18332e]";

  const showError = (message) => {
    setStatus("error");
    setFeedback(message);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setStatus("");
    setFeedback("");

    if (!file) {
      setFileName("");
      return;
    }

    const error = validateFile(file);

    if (error) {
      event.target.value = "";
      setFileName("");
      showError(error);
      return;
    }

    setFileName(file.name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = formRef.current;

    if (!form) {
      showError("Unable to read the form. Please refresh and try again.");
      return;
    }

    // Confirm that EmailJS is configured.
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      showError(
        "The email service is not configured. Please contact the website administrator."
      );
      return;
    }

    // Validate native HTML form fields.
    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);

    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "position",
    ];

    const missingField = requiredFields.find(
      (field) => !String(formData.get(field) || "").trim()
    );

    if (missingField) {
      showError("Please complete all required fields.");
      return;
    }

    // Validate the optional CV.
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      const fileError = validateFile(file);

      if (fileError) {
        showError(fileError);
        return;
      }
    }

    setIsSubmitting(true);
    setStatus("");
    setFeedback("");

    try {
      const response = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form,
        {
          publicKey: PUBLIC_KEY,
        }
      );

      if (response.status !== 200) {
        throw new Error(
          `Unexpected EmailJS status: ${response.status}`
        );
      }

      setStatus("success");
      setFeedback(
        "Your application has been submitted successfully. Thank you for your interest in joining our team."
      );

      form.reset();
      setFileName("");
    } catch (error) {
      // Log the detailed error for development and troubleshooting.
      console.error("EmailJS application error:", error);

      showError(
        error?.text
          ? `Unable to send your application: ${error.text}`
          : "We couldn't send your application. Please check your EmailJS configuration and try again, or contact info@circulogy.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className=" w-full bg-[#f8faf7] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#159b95]">
            Join our team
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[#102b26] sm:text-4xl">
            Apply for a position
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#64756e] sm:text-base">
            Tell us about yourself and upload your CV. Our recruitment
            team will review your application.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#e0ebe5] bg-white p-5 shadow-[0_12px_45px_rgba(10,55,44,0.05)] sm:p-8"
        >
          {/* Applicant name and contact details */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="first_name">
                First name *
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                placeholder="Enter your first name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="last_name">
                Last name *
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                placeholder="Enter your last name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                className={inputClass}
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <label className={labelClass} htmlFor="position">
              Position applying for *
            </label>
            <input
              id="position"
              name="position"
              type="text"
              placeholder="Enter the job title"
              className={inputClass}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className={labelClass} htmlFor="experience">
              Years of experience
            </label>
            <select
              id="experience"
              name="experience"
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select your experience
              </option>
              <option value="Fresher">Fresher</option>
              <option value="Less than 1 year">
                Less than 1 year
              </option>
              <option value="1–3 years">1–3 years</option>
              <option value="3–5 years">3–5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>

          {/* LinkedIn */}
          <div>
            <label className={labelClass} htmlFor="linkedin">
              LinkedIn profile
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
              className={inputClass}
            />
          </div>

          {/* Cover letter */}
          <div>
            <label className={labelClass} htmlFor="message">
              Cover letter / additional information
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your skills, experience, and why you'd like to join us."
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* CV upload
          <div>
            <label className={labelClass} htmlFor="resume">
              Upload your CV
            </label>

            <input
              ref={fileInputRef}
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              aria-describedby="resume-help"
              className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[#b9d7cd] bg-[#f8fcfa] p-4 text-left transition hover:border-[#159b95] hover:bg-[#f1faf6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dff3ed] text-[#087d78]">
                <UploadCloud size={21} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-[#18332e]">
                  {fileName || "Choose your CV"}
                </span>
                <span className="mt-1 block text-xs text-[#82938c]">
                  PDF, DOC, or DOCX · Maximum 5 MB
                </span>
              </span>
            </button>

            <p
              id="resume-help"
              className="mt-2 text-xs leading-5 text-[#82938c]"
            >
              Upload your CV as a PDF, DOC, or DOCX file.
            </p>
          </div> */}

          {/* Success and error feedback */}
          {feedback && (
            <div
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`flex items-start gap-3 rounded-xl p-4 text-sm leading-6 ${
                status === "success"
                  ? "bg-[#eaf8f0] text-[#176a45]"
                  : "bg-[#fff1ef] text-[#a83228]"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />
              )}

              <span>{feedback}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#087d78] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#056762] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Sending application...
              </>
            ) : (
              <>
                Apply Now
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="text-xs leading-5 text-[#82938c]">
            Your application details will be sent to our recruitment
            team. You can also contact info@circulogy.com.
          </p>
        </form>
      </div>
    </section>
  );
};

export default CareerApplicationForm;
