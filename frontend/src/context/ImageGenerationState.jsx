import React, { useState } from "react";
import ImageGenerationContext from "./ImageGenerationContext";
import AiSample1 from "../assets/sample_img_1.png";
import Swal from "sweetalert2";

function ImageGenerationState(props) {
  const [image, setImage] = useState(AiSample1);
  const [loading, setLoading] = useState(false);
  // const [alerData, setAlerData] = useState(null);

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

  const alertFunc = (msg, success) => {
    if (success) {
      Toast.fire({
        icon: "success",
        title: msg,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: msg,
      });
    }
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
      alertFunc(error.message, false);
      setLoading(false);
    }
  };

  return (
    <ImageGenerationContext.Provider
      value={{
        getImageSrcUsingInputPropmt,
        image,
        loading,
      }}
    >
      {props.children}
    </ImageGenerationContext.Provider>
  );
}

export default ImageGenerationState;
