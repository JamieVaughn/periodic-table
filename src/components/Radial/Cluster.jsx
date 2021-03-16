import React from 'react'

import CircleElement from './CircleElement'
import Slice from './Slice'
import styles from './radial.module.scss'

const orbitals = Array(10).fill(18.189) // in theory = 18 (max # of Groups per Period), but ~18.18-18.25 spreads out better
const turnTable = group => orbitals[group]

const getOffset = el => {
    const lanthanide = 'lanthanide'=== el.category ? 8 : null
    const nine = el.ypos === 7 ? 9 : null
    const actinide = 'actinide' === el.category ? 9 : null
    const uue = el.symbol === 'Uue' ? 10 : null
    return uue ?? actinide ?? lanthanide ?? el.ypos
}

export default function Cluster (props) {
    const { data, dimensions, select, handleSelect } = props
    const { radius, w, h } = dimensions

    const elements = Object.values(data).map( (el, i) => (
        <CircleElement 
            key={i} 
            select={select}
            handleSelect={handleSelect}
            element={el} 
            dimensions={{
                // turn: 395*el.xpos*(turnTable(getOffset(el) - 1))/360, // keeps nobel gas and alkali metals next to each other
                turn: 360*el.xpos*(turnTable(getOffset(el) - 1))/(2*Math.PI), 
                radius: el.atomic_mass/(getOffset(el)**1.1), 
                x: el.name == 'Helium' ? radius + ((getOffset(el) - 0.5)/18)*(radius*2) : radius + ((getOffset(el) - 1)/18)*(radius*2), 
                y: radius
            }} 
        />
    ))
    const orbits = orbitals.map((_, i) => ( //[32, 64, 128, 192, 256, 320, 384, 448, 512]
        <circle key={i} cx={radius} cy={radius} r={(i || 0.5) * 64} fill="transparent" stroke={_ !== 1 ? "white" : "black"} strokeWidth="1" strokeDasharray="10 10" strokeDashoffset="10">
            <animate attributeName='stroke-dashoffset' dur={6.3 / ((_+1)/((i+1)**.5)) + 's'} repeatCount="indefinite" from="5" to="45" />
        </circle>
    ))
    
    const slices = Array(18).fill(1).map((_, i) => (
        <Slice group={i+1} radius={radius} turnTo={(18.189*(i+1)/(55))} turnFrom={(18.189*i)/(55)} />
    ))

    return (
        <svg width={w} height={h} transform-origin={`${radius}px ${radius}px`} className={styles.cluster}>
            {orbits}
            {slices}
            {elements}
        </svg>
    )
}