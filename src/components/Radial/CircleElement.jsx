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

    const applyHighlight = name => {
        setHighlight(name)
    }
    
    useEffect(() => {
    }, [highlight])

    return (
        <g className={styles.group}
           transform={`rotate(${-dimensions.turn} 0 0)`} 
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
                x={dimensions.x} 
                y={dimensions.y} 
                className={`${styles['circle-text']} ${element.ypos < 8 || select?.name === element.name ? styles.selected : ''}`}
                strokeWidth={element.atomic_mass > 275 ? '1' : '0'}
                transform-origin={`${dimensions.x} ${dimensions.y}`}
                transform={`rotate(${+dimensions.turn} 0 0) ${element.name === select?.name ? 'scale(1.5)' : ''}`} 
            >
                {element.symbol}
            </text>
        </g>
    )
}