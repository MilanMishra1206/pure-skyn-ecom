import * as yup from "yup";

const getAddReviewValidation = () =>
  yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Please Enter Valid Email")
      .required("Email is required"),
    rating: yup.number().required("Rating is required"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(250, "Description cannot exceed 250 characters")
      .test(
        "word-count",
        "Description must be between 2 and 50 words",
        (value) => {
          const wordCount = value ? value.trim().split(/\s+/).length : 0;
          return wordCount >= 2 && wordCount <= 50;
        }
      ),
  });

export default getAddReviewValidation;
