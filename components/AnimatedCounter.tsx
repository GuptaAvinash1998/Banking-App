'use client';
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount=0}) => {
  return (
    <div>
      <CountUp end={amount} decimal=',' prefix='$'/>
    </div>
  )
}

export default AnimatedCounter
