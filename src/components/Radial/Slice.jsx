import React, { useState } from 'react'
import * as d3 from 'd3'

const groups = group => ({
    17: 'alkali metals',
    16: 'coinage metals',
    15: 'alkaline earth metals',
    14: 'volatilve metals',
    12: 'post-transition metals',  // (icosagens), boron group
    10: 'metalloids',
    8: 'pnictogens',
    6: 'chalcogens',
    4: 'halides',
    2: 'noble gases',
}[group] || 'transition metals')

export default function Slice (props) {
    const [hover, setHover] = useState(false)
    const { group, radius, turnFrom, turnTo } = props
    const textRadius = radius/1.345
    const handleLeave = e => {
        if(e.relatedTarget.nodeName === 'circle' && e.relatedTarget.className.baseVal === 'element') {
            return
        }
        setHover(false)
    }

    const arc = d3.arc();
    const path = arc({
        innerRadius: 0,
        outerRadius: radius,
        startAngle: turnFrom,
        endAngle: turnTo
    }); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
    return (
        <g 
            transform-origin='center'
            style={{transform: `rotate(${100}deg) translate(${radius}px, ${radius}px)`}} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={handleLeave}>
                <defs>
                    <radialGradient id="linear" x1="100%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stop-color="white"/>
                    <stop offset="100%" stop-color="transparent"/>
                    </radialGradient>
                </defs>
            <path d={path} stroke="url(#linear)" strokeWidth="1" fill={hover ? "#20004244" : "transparent"} />
            <g 
             style={{
                display: hover ? 'block' : 'none',
                transform: `rotate(${19*group - 150}deg) translate(${textRadius}px, ${textRadius}px)`
             }}
            >
                <text 
                data-group={group} 
                style={{
                    fontSize: '1.5rem', 
                    transformOrgin: 'center', 
                    transform: `rotate(${-19*group+50}deg) translate(${-80}px, ${0}px)`
                }}>
                    {groups(group)}
                </text>
            </g>
        </g>
    )
}