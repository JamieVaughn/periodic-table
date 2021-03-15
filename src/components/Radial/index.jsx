import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'

import styles from './radial.module.scss'

import Placard from '../Table/Placard'

// https://github.com/d3/d3-force
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
        // console.log('check', highlight)
    }, [highlight])

    return (
        <g className={styles.group}
           transform={`rotate(${dimensions.turn} 0 0)`} 
           transform-origin='center' 
           onClick={() => handleSelect(element)}
           onMouseOver={() => applyHighlight(element.name)}
        >
            <circle 
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

const orbitals = [2, 8, 8, 18, 18, 18, 18, 18, 18, 1]

const turnTable = group => orbitals[group]

const Cluster = props => {
    const { data, dimensions, select, handleSelect } = props
    const { w, h } = dimensions
    const elements = Object.values(data).map( (el, i) => {
        
        const lanthanide = 'lanthanide'=== el.category ? 7 : null
        const nine = el.ypos === 7 ? 9 : null
        const actinide = 'actinide' === el.category ? 8 : null
        const uue = el.symbol === 'Uue' ? 10 : null
        const offset = uue ?? nine ?? actinide ?? lanthanide ?? el.ypos
        return <CircleElement 
                    key={i} 
                    select={select}
                    handleSelect={handleSelect}
                    element={el} 
                    dimensions={{
                        turn: 360*i*(turnTable(offset - 1))/(2*Math.PI), 
                        r: el.atomic_mass/(offset**1.1), 
                        x: el.name == 'Helium' ? w/2 + ((offset - 0.5)/18)*(w) : w/2 + ((offset - 1)/18)*(w), 
                        y: h/2}} 
                />
    })
    const orbits = orbitals.map((_, i) => ( //[32, 64, 128, 192, 256, 320, 384, 448, 512]
        <circle key={i} cx={w/2} cy={h/2} r={(i || 0.5) * 64} fill="transparent" stroke={_ !== 1 ? "white" : "black"} strokeWidth="1" strokeDasharray="10 10" strokeDashoffset="10">
            <animate attributeName='stroke-dashoffset' dur={6.3 / ((_+1)/((i+1)**.5)) + 's'} repeatCount="indefinite" from="5" to="45" />
        </circle>
    ))
    return (
        <svg width={w} height={h} transform-origin={`${w/2}px ${h/2}px`} className={styles.cluster}>
            {orbits}
            {elements}
        </svg>
    )
}

export default function Radial (props) {
    const { data, dimensions } = props
    const { w, h } = dimensions
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
                <Cluster data={data} dimensions={{w: w, h: h}} select={select} handleSelect={handleSelect} />
            </div>
        </article>
    )
}