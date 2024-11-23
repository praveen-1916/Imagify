import { Button, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { motion } from "motion/react";
import AiSample1 from "../assets/sample_img_1.png";
import AiSample2 from "../assets/sample_img_2.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/imageGeneration");
  };

  return (
    <>
      <motion.div
        className="flex items-center flex-col gap-8 mt-11"
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Chip
            variant="outlined"
            value="Best text to image generator 🌟"
            className="rounded-full w-min bg-white border-[#c0bfbf] px-6"
          />
        </motion.div>

        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
        >
          <Typography className="md:text-6xl sm:text-5xl text-4xl text-center font-normal">
            Turn text to
          </Typography>
          <Typography className="md:text-6xl sm:text-5xl text-4xl text-center font-normal">
            <span className="text-pink-500">image,</span> in seconds.
          </Typography>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Typography
            variant="small"
            className="text-center md:text-lg text-sm mx-4"
          >
            Unleash your creativity with AI. Turn your imagination into visual
            art in <br /> seconds – just type, and watch the magic happen.
          </Typography>
        </motion.div>

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
            className="rounded-full px-12"
            onClick={handleClick}
          >
            Generate Images ✨
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="md:max-w-3xl mx-w-xl grid md:gap-4 gap-2 md:grid-cols-6 grid-cols-3 mx-8 mt-8"
        >
          {Array(6)
            .fill("")
            .map((item, index) => (
              <motion.img
                whileHover={{ scale: 1.05, duration: 0.1 }}
                key={index}
                src={index % 2 === 0 ? AiSample1 : AiSample2}
                alt="Sample 3D Image"
                className="rounded-md"
              />
            ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Generated images from imagify
        </motion.p>
      </motion.div>
    </>
  );
}

export default Home;
