import React from "react";
import {
  ArrowDownTrayIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";

const workingProcedure = [
  {
    number: 1,
    icon: EyeIcon,
    heading: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
  },
  {
    number: 2,
    icon: SparklesIcon,
    heading: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
  },
  {
    number: 3,
    icon: ArrowDownTrayIcon,
    heading: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
  },
];

function Working() {
  return (
    <div className="my-28">
      <div className="text-center">
        <Typography variant="h2">How it works</Typography>
        <Typography>Transform Words Into Stunning Images</Typography>
      </div>

      <div className="flex flex-col gap-4 items-center mx-5 mt-10">
        {workingProcedure.map(({ icon, heading, description }, index) => (
          <Card
            key={index}
            className="max-w-3xl w-full bg-transparent rounded-md border-[#E1E1E1] border"
          >
            <CardBody className="flex pt-4 pb-7 gap-3 text-start">
              <IconButton
                size="sm"
                className="bg-[#dee3e1] shadow-none mt-[2px]"
              >
                {React.createElement(icon, {
                  className: "h-4 w-4",
                  color: "black",
                  strokeWidth: 2,
                })}
              </IconButton>
              <div>
                <Typography className="text-black text-xl font-normal">
                  {heading}
                </Typography>
                <Typography className="text-sm text-[#7c7c7c] font-normal">
                  "{description}"
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Working;
