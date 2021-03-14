import React from 'react'
import { elements } from '../../data/elements'
import styles from './elements.module.scss'

export default function Elements (props) {


    const table = Object.values(elements).map( el => {
        const css = el.category.includes('unknown') ? 'unknown' : el.category.replaceAll(' ', '-')
        console.log( css.length ? css : el.category)
        return (
            <div key={el.name}
                className={`${styles[css]} ${styles[el.phase]}`}
                title={el.summary}
                style={{
                    gridColumn: el.xpos,
                    gridRow: el.ypos
                }}
            >
                <div className={styles['top-row']}>
                    <small className={styles['left-align']}>{el.number}</small>
                    <small className={styles.tiny}>{el.atomic_mass.toFixed(2)}</small>
                </div>
                <strong>{el.symbol}</strong>
                <small className={styles.tiny}>{el.name}</small>
            </div>
        )
    })

    return (
        <article>
            <h1>Periodic Table of the Elements</h1>
            <div className={styles['periodic-table']}>
                {table}
            </div>
        </article>
    )
}