import { memo } from 'react'
import { Box } from './Box.js'
import { Dustbin } from './Dustbin.js'
import { useState } from 'react'

export const Container = memo(function Container({ buddy, setBuddy, latestName }) {

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }} className="grid grid-cols-2 gap-8">
        <div className="text-black bg-zinc-200 w-full h-96 flex items-center justify-center mb-8 rounded-3xl">
        <h1 className="text-3xl font-medium">{latestName}</h1>
        </div>
        <Dustbin buddy={buddy} />
      </div>
      <p className="mb-4 mt-8 font-medium text-xl">Group members without a buddy:</p>
      <div style={{ overflow: 'hidden', clear: 'both' }} className="flex gap-8">
        <Box name="Ulrike Iller" setBuddy={setBuddy} />
        <Box name="Sam Kugloch" setBuddy={setBuddy} />
        <Box name="Therease Amen" setBuddy={setBuddy} />
      </div>
    </div>
  )
})
