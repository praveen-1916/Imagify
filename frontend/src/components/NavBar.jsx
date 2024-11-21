import React from "react";
import { Button, Navbar, Typography } from "@material-tailwind/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { PhotoIcon } from "@heroicons/react/24/solid";

function NavBar() {
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

        <SignedOut>
          <SignInButton className="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] rounded-full px-6 sm:px-8 md:px-12 text-sm" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </Navbar>
  );
}

export default NavBar;
