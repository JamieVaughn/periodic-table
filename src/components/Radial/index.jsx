import React, { useState } from 'react'

import styles from './radial.module.scss'

import Cluster from './Cluster'
import Placard from '../Table/Placard'

// https://github.com/d3/d3-force
// https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)

export default function Radial (props) {
    const { data, dimensions } = props
    const { radius } = dimensions
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
                <Cluster data={data} dimensions={{radius: radius, w: radius*2, h: radius*2}} select={select} handleSelect={handleSelect} />
            </div>
        </article>
    )
}