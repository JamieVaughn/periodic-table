import React, { useState } from 'react'
import * as d3 from 'd3'

const groups = group => ({ // real group # in comment
    2: 'alkali metals', // 1
    4: 'alkaline earth metals', // 2
    3: 'coinage metals', // 11
    5: 'volatile metals', // 12
    7: 'post-transition metals',  // 13 (icosagens), boron group
    9: 'metalloids', // 14
    11: 'pnictogens', // 15
    13: 'chalcogens', // 16
    15: 'halides', // 17
    17: 'noble gases', // 18
}[group] || 'transition metals')

export default function Slice (props) {
    const [hover, setHover] = useState(false)
    const { group, radius, turnFrom, turnTo } = props
    const textRadius = radius/1.4
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
                // display: hover ? 'block' : 'none',
                transform: `rotate(${19*group - 150}deg) translate(${textRadius-50}px, ${textRadius+50}px)`
             }}
            >
                <text 
                data-group={group} 
                style={{
                    fontSize: '1.5rem', 
                    transformOrgin: 'center', 
                    transform: `rotate(${-19*group+50}deg) translate(${-80}px, ${0}px)`
                }}>
                    {groups(group )}
                </text>
            </g>
        </g>
    )
}