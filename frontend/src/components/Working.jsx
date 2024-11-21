import React from 'react'
import { EyeIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Typography } from '@material-tailwind/react';


function Working() {
  return (
    <div className="mt-28 text-center">
    <Typography variant="h2">How it works</Typography>
    <Typography>Transform Words Into Stunning Images</Typography>
    <div>
      <Card>
        <CardBody>
            <IconButton>
                <EyeIcon className="h-8 w-8" strokeWidth={2} />
            </IconButton>
            <div>
                <Typo
            </div>
        </CardBody>
      </Card>
    </div>
  </div>
  )
}

export default Working