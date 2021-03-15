import React from 'react'

import styles from './elements.module.scss'

export default function Card (props) {
    const { atomic_mass, category, phase, name, number, source, summary, symbol, xpos, ypos } = props.element
    const css = category.includes('unknown') ? 'unknown' : category.replaceAll(' ', '-')
    const inlineStyles = props.inplacard ? {} : {
        gridColumn: xpos,
        gridRow: ypos + 1
    }
    return (
        <div key={name}
            className={`${props.isplacard ? 'inplacard' : ''} ${styles.card} ${styles[css]} ${styles[phase]}`}
            onDoubleClick={() => props.handleSelect ? props.handleSelect(props.element) : null}
            onMouseOver={() => props.handleHover ? props.handleHover(props.element) : null}
            title={summary}
            style={inlineStyles}
        >
            <div className={styles['top-row']}>
                { props.inplacard ? <small className={styles.small}>Atomic Number</small> : null }
                { props.inplacard ? <small className={`${styles['right-align']} ${styles.small}`}>Atomic Mass</small> : null }
                <small className={props.inplacard ? styles.large : ''}>{number}</small>
                <small className={`${styles['right-align']} ${props.inplacard ? styles.medium : styles.tiny}`}>{atomic_mass.toFixed(2)}</small>
            </div>
            <strong className={props.inplacard ? styles.xlarge : styles.medium}>{symbol}</strong>
            <small className={props.inplacard ? styles.medium : styles.tiny}><a href={source}>{name}</a></small>
        </div>
    )
}