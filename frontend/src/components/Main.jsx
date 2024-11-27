import React, { useState } from "react";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { motion } from "motion/react";
import { useContext } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import ImagifyContext from "../context/ImagifyContext";

function Main() {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(true);
  const [prompt, setPrompt] = React.useState("");
  const onChange = ({ target }) => setPrompt(target.value);

  const context = useContext(ImagifyContext);
  const { getImageSrcUsingInputPropmt, image, loading, creditBalance } =
    context;

  const handleClick = (e) => {
    e.preventDefault();
    if (creditBalance > 0) {
      setShowInput(false);
      getImageSrcUsingInputPropmt(prompt);
    } else {
      navigate("/buy");
    }
  };

  return (
    <>
      <Breadcrumbs className="bg-transparent sm:ml-20 ml-3 mt-16">
        <Link to="/" className="opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        <Link className="opacity-60 text-base">
          <span>Image Genaration</span>
        </Link>
      </Breadcrumbs>
      <div className="flex flex-col items-center justify-center gap-8 mt-12 sm:mx-0 mx-4">
        {loading ? (
          <div className="flex items-center justify-center w-[320px] h-[320px]">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="m-0 max-w-xs max-h-[320px] shrink-0 rounded-md"
          >
            <img
              src={image}
              alt="card-image"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        )}

        {showInput ? (
          <motion.div
            className="relative w-full max-w-[32rem]"
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleClick}>
              <Input
                type="text"
                required
                label="Image Prompt"
                size="lg"
                minLength={10}
                placeholder="Describe what you want to generate"
                onChange={onChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                color={prompt ? "gray" : "blue-gray"}
                disabled={!prompt}
                className="!absolute right-1 top-1.5"
                type="submit"
              >
                Generate
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center flex-col sm:flex-row items-center gap-5"
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outlined"
              size="lg"
              className="rounded-full px-12"
              onClick={() => setShowInput(true)}
            >
              Generate Image
            </Button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1 }}
              href={image}
              download
              className="bg-black text-white py-3 rounded-full px-12"
            >
              Download
            </motion.a>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Main;
