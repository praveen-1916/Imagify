import React, { useState } from "react";
import ImageGenerationContext from "./ImagifyContext";
import AiSample1 from "../assets/sample_img_1.png";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";

function ImagifyState(props) {
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

  const { getToken } = useAuth();

  const getImageSrcUsingInputPropmt = async (prompt) => {
    setLoading(true);
    const promptData = { prompt: prompt };
    try {
      const token = await getToken();
      const url =
        import.meta.env.VITE_URL_END_POINT +
        import.meta.env.VITE_GENERATE_IMAGE;
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(promptData),
      });
      const data = await responce.json();

      if (data.success) {
        setImage(data.resultImage);
        setLoading(false);
        alertFunc(data.message, data.success);
        getCreditBalance();
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

  const [creditBalance, setCreditBalance] = useState(0);
  const getCreditBalance = async () => {
    try {
      const token = await getToken();
      const url =
        import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_GET_CREDITS;

      const responce = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await responce.json();
      if (data.success) {
        setCreditBalance(data.creditBalance);
      } else {
        alertFunc(data.message, data.success);
      }
    } catch (error) {
      console.error(error.message);
      alertFunc(error.message, false);
    }
  };

  const razorpayPayment = async (planId) => {
    try {
      const plan = { planId: planId };
      const token = await getToken();
      const url =
        import.meta.env.VITE_URL_END_POINT +
        import.meta.env.VITE_RAZORPAY_PAYMENT;
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(plan),
      });
      const data = await responce.json();
      if (data.success) {
        initPay(data.order);
      } else {
        alertFunc(data.message, data.success);
      }
    } catch (error) {
      console.error(error.message);
      alertFunc(error.message, false);
    }
  };

  const initPay = async (order) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Credits Payment", //your business name
        description: "Test Transaction",
        order_id: order.id, //T
        receipt: order.receipt,
        handler: async (responce) => {
          paymentVerification(responce);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error.message);
    }
  };

  const paymentVerification = async (orderDetails) => {
    try {
      const url =
        import.meta.env.VITE_URL_END_POINT +
        import.meta.env.VITE_RAZORPAY_PAYMENT_VERIFY;

      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });
      const data = await responce.json();
      if (data.success) {
        Navigate("/imageGeneration");
        alertFunc(data.message, data.success);
      } else {
        alertFunc(data.message, data.success);
      }
    } catch (error) {
      console.error(error.message);
      alertFunc(error.message, false);
    }
  };

  return (
    <ImageGenerationContext.Provider
      value={{
        getImageSrcUsingInputPropmt,
        image,
        loading,
        creditBalance,
        getCreditBalance,
        razorpayPayment,
      }}
    >
      {props.children}
    </ImageGenerationContext.Provider>
  );
}

export default ImagifyState;
