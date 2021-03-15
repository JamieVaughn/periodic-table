import React, { useState } from 'react'
import Card from './Card'
import Placard from './Placard'
import { elements } from '../../data/elements'
import styles from './elements.module.scss'

export default function Elements (props) {
    const [hover, setHover] = useState(null)
    const [select, setSelect] = useState(null)

    const handleHover = element => setHover(element)
    const handleSelect = element => setSelect(element)

    const elementList = Object.values(elements).map( (el, i) => <Card key={i} element={el} handleHover={select ? null : handleHover} handleSelect={handleSelect} />)

    return (
        <article>
            <h5>(Double Click an element to pin its placard at the top. Click the pin icon in the upper right of the placard to unpin it.)</h5>
            <div className={styles['periodic-table']}>
                <Placard element={select ?? hover} handleSelect={select ? handleSelect : null} />
                {elementList}
                <div className={styles['nide-label']} style={{gridColumn: 3, gridRow: 7}}><span>Lanthanides</span></div>
                <div className={styles['nide-label']} style={{gridColumn: 3, gridRow: 8}}><span>Actinides</span></div>
            </div>
        </article>
    )
}