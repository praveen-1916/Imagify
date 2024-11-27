import React, { useContext, useEffect } from "react";
import { Button, Navbar, Typography } from "@material-tailwind/react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

import { PhotoIcon, StarIcon } from "@heroicons/react/24/solid";
import ImagifyContext from "../context/ImagifyContext";

function NavBar() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const { getCreditBalance, creditBalance } = useContext(ImagifyContext);

  useEffect(() => {
    if (isSignedIn) {
      getCreditBalance();
    }
  }, [isSignedIn]);

  return (
    <Navbar
      className="max-w-full md:px-20 sm:px-14 px-10 py-5 bg-transparent"
      blurred={false}
      shadow={false}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-1">
          <PhotoIcon className="h-7 w-7 text-pink-400" strokeWidth={2.5} />
          <Typography color="blue-gray" variant="h5">
            Imagify
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#D7EBFF] rounded-full px-3 sm:px-6  py-1 sm:py-1.5 flex items-center">
            <StarIcon className="h-4 w-4 mr-1 text-[#007aff]" />
            <Typography
              color="blue-gray"
              variant="small"
              className="flex items-center"
            >
              <span className="sm:block hidden">Credits</span> : {creditBalance}
            </Typography>
          </div>
          {!isSignedIn ? (
            <Button
              variant="gradient"
              onClick={() => openSignIn({})}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-2.5 px-6 sm:px-8 md:px-12 rounded-full"
            >
              Login
            </Button>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </Navbar>
  );
}

export default NavBar;
