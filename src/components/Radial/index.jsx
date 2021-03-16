import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'

import styles from './radial.module.scss'

import Placard from '../Table/Placard'

// https://github.com/d3/d3-force
// https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)
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
const colorTable = type => {
    return {
        "noble gas": "coral",
        "alkaline earth metal": "royalblue",
        "diatomic nonmetal": "plum",
        "polyatomic nonmetal": "rosybrown",
        "alkali metal": "firebrick",
        "transition metal": "gold",
        "post-transition metal": "darkgreen",
        lanthanide: "turquoise",
        actinide: "crimson",
        metalloid: "#73D2DE",
    }[type] || 'indigo'
}

const CircleElement = props => {
    const {dimensions, element, select, handleSelect} = props
    const [highlight, setHighlight] = useState(null)
    const origin = {
        x: dimensions.x - dimensions.r/2,
        y: dimensions.y - dimensions.r/2
    }
    const applyHighlight = name => {
        setHighlight(name)
    }
    useEffect(() => {
    }, [highlight])

    return (
        <g className={styles.group}
           transform={`rotate(${dimensions.turn} 0 0)`} 
           transform-origin='center' 
           onClick={() => handleSelect(element)}
           onMouseOver={() => applyHighlight(element.name)}
        >
            <circle 
                className="element"
                data-id={element.name}
                cx={dimensions.x} 
                cy={dimensions.y} 
                r={dimensions.r} 
                strokeWidth='5'
                stroke={colorTable(element.category)}
                fill={element.name === select?.name ? 'indigo' : 'transparent'}
            />
            <text 
                x={origin.x} 
                y={origin.y} 
                className={`${styles['circle-text']} ${element.number < 87 || select?.name === element.name ? styles.selected : ''}`}
                strokeWidth={element.atomic_mass > 275 ? '1' : '0'}
                transform-origin={`${origin.x} ${origin.y}`}
                transform={`rotate(${-dimensions.turn} 0 0) ${element.name === select?.name ? 'scale(1.5)' : ''}`} 
            >
                {element.symbol}
            </text>
        </g>
    )
}

function Slice (props) {
    const [hover, setHover] = useState(false)
    const { group, r, turnFrom, turnTo } = props

    const handleLeave = e => {
        if(e.relatedTarget.nodeName === 'circle' && e.relatedTarget.className.baseVal === 'element') {
            return
        }
        setHover(false)
    }

    const arc = d3.arc();
    const path = arc({
        innerRadius: 0,
        outerRadius: r/2,
        startAngle: turnFrom,
        endAngle: turnTo
    }); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
    return (
        <g 
            transform-origin='center'
            style={{transform: `rotate(${100}deg) translate(${r/2}px, ${r/2}px)`}} 
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
                transform: `rotate(${19*group - 150}deg) translate(${r/3}px, ${r/2.5}px)`
             }}
            >
                <text 
                data-group={group} 
                style={{
                    fontSize: '1.5rem', 
                    transformOrgin: 'center', 
                    transform: `rotate(${-19*group+50}deg) translate(${-75}px, ${0}px)`
                }}>
                    {groups(group)}
                </text>
            </g>
        </g>
    )
}

const orbitals = Array(10).fill(18.189) // in theory = 18 (max # of groups in a period), but somewhere between 18.18 - 18.25 spreads out better
const turnTable = group => orbitals[group]

const Cluster = props => {
    const { data, dimensions, select, handleSelect } = props
    const { r } = dimensions

    const getOffset = el => {
        const lanthanide = 'lanthanide'=== el.category ? 7 : null
        const nine = el.ypos === 7 ? 9 : null
        const actinide = 'actinide' === el.category ? 8 : null
        const uue = el.symbol === 'Uue' ? 10 : null
        return uue ?? nine ?? actinide ?? lanthanide ?? el.ypos
    }

    const elements = Object.values(data).map( (el, i) => (
        <CircleElement 
            key={i} 
            select={select}
            handleSelect={handleSelect}
            element={el} 
            dimensions={{
                // turn: 395*el.xpos*(turnTable(getOffset(el) - 1))/360, // keeps nobel gas and alkali metals next to each other
                turn: 360*el.xpos*(turnTable(getOffset(el) - 1))/(2*Math.PI), 
                r: el.atomic_mass/(getOffset(el)**1.1), 
                x: el.name == 'Helium' ? r/2 + ((getOffset(el) - 0.5)/18)*(r) : r/2 + ((getOffset(el) - 1)/18)*(r), 
                y: r/2}} 
        />
    ))
    const orbits = orbitals.map((_, i) => ( //[32, 64, 128, 192, 256, 320, 384, 448, 512]
        <circle key={i} cx={r/2} cy={r/2} r={(i || 0.5) * 64} fill="transparent" stroke={_ !== 1 ? "white" : "black"} strokeWidth="1" strokeDasharray="10 10" strokeDashoffset="10">
            <animate attributeName='stroke-dashoffset' dur={6.3 / ((_+1)/((i+1)**.5)) + 's'} repeatCount="indefinite" from="5" to="45" />
        </circle>
    ))
    
    const slices = Array(18).fill(1).map((_, i) => (
        <Slice group={i+1} r={1150} turnTo={(18.189*(i+1)/(55))} turnFrom={(18.189*i)/(55)} />
    ))

    return (
        <svg width={r} height={r} transform-origin={`${r/2}px ${r/2}px`} className={styles.cluster}>
            {orbits}
            {slices}
            {elements}
        </svg>
    )
}

export default function Radial (props) {
    const { data, dimensions } = props
    const { r } = dimensions
    const [select, setSelect] = useState(null)
    // const [select, setSelect] = useState(null)

    const handleSelect = element => setSelect(element)
    // const handleSelect = element => setSelect(element)

    return (
        <article>
            <div className={styles['radial-placard']}>
                <Placard element={select} isradial={true}/>
            </div>
            <div className={styles['radial-diagram']}>
                <Cluster data={data} dimensions={{r: r}} select={select} handleSelect={handleSelect} />
            </div>
        </article>
    )
}