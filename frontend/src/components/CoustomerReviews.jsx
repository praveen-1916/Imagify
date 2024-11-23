import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Rating,
  Button,
} from "@material-tailwind/react";
import { motion } from "motion/react";
import profileImage1 from "../assets/profile_img_1.png";
import profileImage2 from "../assets/profile_img_2.png";
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    reviewId: 1,
    coustomerName: "Donald Jackman",
    coustomerReview:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    coustomerProfile: profileImage1,
    coustomerRole: "Co-founder",
  },
  {
    reviewId: 2,
    coustomerName: "Richard Nelson",
    coustomerReview:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    coustomerProfile: profileImage2,
    coustomerRole: "Content Creator",
  },
  {
    reviewId: 3,
    coustomerName: "James Washington",
    coustomerReview:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    coustomerProfile: profileImage1,
    coustomerRole: "Co-founder",
  },
];

function CoustomerReviews() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/imageGeneration");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <Typography variant="h2">Customer testimonials</Typography>
          <Typography>What Our Users Are Saying</Typography>
        </div>

        <div className="grid max-w-4xl md:grid-cols-3 sm:grid-cols-2 gap-6 lg:mx-auto mx-10 mt-10">
          {reviews.map(
            (
              {
                coustomerName,
                coustomerProfile,
                coustomerRole,
                coustomerReview,
              },
              index
            ) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-transparent rounded-md border-[#E1E1E1] border">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    className="h-16 w-16 mx-auto rounded-full"
                  >
                    <img src={coustomerProfile} alt="profile-picture" />
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray">
                      {coustomerName}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                      textGradient
                    >
                      {coustomerRole}
                    </Typography>
                    <Rating value={5} readonly className="mt-2" />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Typography
                      color="blue-gray"
                      className="font-medium text-center"
                      textGradient
                    >
                      {coustomerReview}
                    </Typography>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.2, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="my-32 flex items-center flex-col justify-center"
      >
        <Typography variant="h2">See the magic. Try now</Typography>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
        >
          <Button
            size="lg"
            className="rounded-full px-12 mt-8"
            onClick={handleClick}
          >
            Generate Images ✨
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
}

export default CoustomerReviews;
