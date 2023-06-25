import { memo } from 'react'
import { Box } from './Box.js'
import { Dustbin } from './Dustbin.js'
export const Container = memo(function Container() {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin />
      </div>
      <p className="mb-4 mt-8 font-medium text-xl">Other group members:</p>
      <div style={{ overflow: 'hidden', clear: 'both' }} className="flex gap-8">
        <Box name="Ulrike Iller" />
        <Box name="Sam Kugloch" />
        <Box name="Therease Amen" />
      </div>
    </div>
  )
})
