import { Button, Chip, Typography } from "@material-tailwind/react";
import React from "react";

import AiSample1 from "../assets/sample_img_1.png";
import AiSample2 from "../assets/sample_img_2.png";

function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-8 mt-11">
        <Chip
          variant="outlined"
          value="Best text to image generator 🌟"
          className="rounded-full w-min bg-white border-[#c0bfbf] px-6"
        />
        <div>
          <Typography className="md:text-6xl sm:text-5xl text-4xl text-center font-normal">
            Turn text to
          </Typography>
          <Typography className="md:text-6xl sm:text-5xl text-4xl text-center font-normal">
            <span className="text-pink-500">image,</span> in seconds.
          </Typography>
        </div>

        <Typography
          variant="small"
          className="text-center md:text-lg text-sm mx-4"
        >
          Unleash your creativity with AI. Turn your imagination into visual art
          in <br /> seconds – just type, and watch the magic happen.
        </Typography>

        <Button size="lg" className="rounded-full px-12">
          Generate Images ✨
        </Button>

        <div className="md:max-w-3xl mx-w-xl grid md:gap-4 gap-2 grid-cols-6 mx-8 mt-8">
          <img src={AiSample1} alt="Sample 3D Image" className="rounded-md" />
          <img src={AiSample2} alt="Sample 3D Image" className="rounded-md" />
          <img src={AiSample1} alt="Sample 3D Image" className="rounded-md" />
          <img src={AiSample2} alt="Sample 3D Image" className="rounded-md" />
          <img src={AiSample1} alt="Sample 3D Image" className="rounded-md" />
          <img src={AiSample2} alt="Sample 3D Image" className="rounded-md" />
        </div>
      </div>
    </>
  );
}

export default Home;
