import SubmitButton  from "./SubmitButton";
import { useState } from "react";



export default function SubmissionForm() {
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        fullName: "",
        email: "",
        relationToEvanston: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.description.trim()) {
            newErrors.description = "Idea description cannot be blank.";
        }
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Please enter your name.";
        }
        if (!formData.category.trim()) {
            newErrors.category = "Please select or enter a category.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.relationToEvanston.trim()) {
            newErrors.relationToEvanston = "Please select your relation to Evanston.";
        }

        return newErrors;
    }
    async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5000/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit proposal.");
      }

      setFormData({
        category: "",
        description: "",
        fullName: "",
        email: "",
        relationToEvanston: "",
      });

      setErrors({});
      setSuccessMessage("Proposal submitted successfully.");
    } catch (error) {
      setSuccessMessage("");
      setErrors({
        submit: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Select the category that fits the best:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <p>{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="description">Describe your idea in detail:</label>
        <textarea
          id = "description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Keep your ideas clear and actionable for the best community support"
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p>{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
  <p>Relation to Evanston</p>

  <label htmlFor="currentResident">
    <input
      id="currentResident"
      type="radio"
      name="relationToEvanston"
      value="Current Resident"
      checked={formData.relationToEvanston === "Current Resident"}
      onChange={handleChange}
    />
    Current Resident
  </label>

  <label htmlFor="formerResident">
    <input
      id="formerResident"
      type="radio"
      name="relationToEvanston"
      value="Former Resident"
      checked={formData.relationToEvanston === "Former Resident"}
      onChange={handleChange}
    />
    Former Resident
  </label>

  {errors.relationToEvanston && <p>{errors.relationToEvanston}</p>}
</div>

      <SubmitButton onClick={handleSubmit}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </SubmitButton>

      {successMessage && <p>{successMessage}</p>}
      {errors.submit && <p>{errors.submit}</p>}
    </form>
  );
}

