import React, { useEffect, useState } from 'react'

import styles from './radial.module.scss'

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

export default function CircleElement (props) {
    const {dimensions, element, select, handleSelect} = props
    const [highlight, setHighlight] = useState(null)
    const origin = {
        x: dimensions.x - dimensions.radius,
        y: dimensions.y - dimensions.radius
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
                r={dimensions.radius} 
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