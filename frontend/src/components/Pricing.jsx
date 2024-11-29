import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useEffect } from "react";
import { motion } from "motion/react";
import favicon from "../assets/favicon.svg";
import ImagifyContext from "../context/ImagifyContext";
import Swal from "sweetalert2";

const plansData = [
  {
    planid: "Basic",
    credits: 100,
    amount: 10,
    description: "Best for personal use",
  },
  {
    planid: "Advanced",
    credits: 500,
    amount: 50,
    description: "Best for business use.",
  },
  {
    planid: "Business",
    credits: 5000,
    amount: 250,
    description: "Best for enterprise use.",
  },
];

function Pricing() {
  const { razorpayPayment } = useContext(ImagifyContext);
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    Toast.fire({
      icon: "warning",
      title: "Insufficient Credits. Please Buy Credits!",
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-75px)] md:pt-20 py-20">
      <motion.div
        className=""
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
            size="lg"
            value="Our Plans"
            className="rounded-full mx-auto text-center w-min bg-white border-[#c0bfbf] px-6"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Typography variant="h3" className="text-center my-8">
            Choose The Plan
          </Typography>
        </motion.div>
        <div className="grid max-w-[850px] md:grid-cols-3 sm:grid-cols-2 gap-6 lg:mx-auto mx-12">
          {plansData.map(({ planid, credits, amount, description }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="" key={index}>
                <CardBody className="mt-8 flex flex-col justify-center">
                  <img src={favicon} alt="Website Logo" className="w-min" />
                  <Typography className="mt-4" variant="h6">
                    {planid}
                  </Typography>
                  <Typography className="mb-4" variant="small">
                    {description}
                  </Typography>
                  <div className="flex items-end">
                    <Typography className="text-2xl font-medium">
                      ${amount}
                    </Typography>
                    <Typography>/{credits} credits</Typography>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    fullWidth
                    variant="gradient"
                    onClick={() => razorpayPayment(planid)}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Pricing;
