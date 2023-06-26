import { memo } from 'react'
import { Box } from './Box.js'
import { Dustbin } from './Dustbin.js'
import { useState } from 'react'

export const Container = memo(function Container({ buddy, setBuddy }) {

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin buddy={buddy} />
      </div>
      <p className="mb-4 mt-8 font-medium text-xl">Other group members:</p>
      <div style={{ overflow: 'hidden', clear: 'both' }} className="flex gap-8">
        <Box name="Ulrike Iller" setBuddy={setBuddy} />
        <Box name="Sam Kugloch" setBuddy={setBuddy} />
        <Box name="Therease Amen" setBuddy={setBuddy} />
      </div>
    </div>
  )
})
