import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import AiSample1 from "../assets/sample_img_1.png";

function About() {
  return (
    <div className="grid max-w-5xl mx-auto mb-28">
      <div className="text-center">
        <Typography variant="h2">Create AI Images</Typography>
        <Typography>Turn your imagination into visuals</Typography>
      </div>
      <Card shadow={false} className="bg-transparent md:flex-row mt-10">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 md:w-2/6 w-1/2 shrink-0 md:ml-4 mx-auto rounded-md"
        >
          <img
            src={AiSample1}
            alt="card-image"
            className="h-full w-full object-cover object-center"
          />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h6"
            color="gray"
            className="mb-4 uppercase md:text-start text-center"
          >
            About My Project
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Introducing the AI-Powered Text to Image Generator
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
          </Typography>
          <Typography color="gray" className="font-normal">
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don’t yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default About;
