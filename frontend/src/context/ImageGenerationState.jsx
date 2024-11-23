import React, { useState } from "react";
import ImageGenerationContext from "./ImageGenerationContext";
import AiSample1 from "../assets/sample_img_1.png";

function ImageGenerationState(props) {
  const [image, setImage] = useState(AiSample1);
  const [loading, setLoading] = useState(false);
  const [alerData, setAlerData] = useState(null);

  const alertFunc = (msg, success) => {
    setAlerData({
      msg: msg,
      success: success,
    });

    setTimeout(() => {
      setAlerData(null);
    }, 4000);
  };

  const getImageSrcUsingInputPropmt = async (prompt) => {
    setLoading(true);
    const promptData = { prompt: prompt };
    try {
      const url =
        import.meta.env.VITE_URL_END_POINT +
        import.meta.env.VITE_GENERATE_IMAGE;
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      });
      const data = await responce.json();

      if (data.success) {
        setImage(data.resultImage);
        setLoading(false);
        alertFunc(data.message, data.success);
      } else {
        setLoading(false);
        alertFunc(data.message, data.success);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  return (
    <ImageGenerationContext.Provider
      value={{
        getImageSrcUsingInputPropmt,
        image,
        loading,
        alerData,
      }}
    >
      {props.children}
    </ImageGenerationContext.Provider>
  );
}

export default ImageGenerationState;
