import React, { useState } from 'react'

import Card from './Card'

import styles from './elements.module.scss'
//'╳'

export default function Placard (props) {
    if(!props.element) return null
    const { element, isradial } = props
    
    return (
        <div className={`${styles.placard} ${isradial ? styles.inradial : ''}`}>
            <Details element={element} handleSelect={props.handleSelect} />
            <Card element={element} handleHover={null} inplacard={true}/>
        </div>
    )
}

function Details (props) {
    const [offset, setOffset] = useState(0)
    let properties = Object.entries(props.element).filter(e => !['name', 'number', 'symbol', 'atomic_mass', 'spectral_img', 'source', 'summary', 'ypos'].includes(e[0]));
    // const {
    //     appearance, boil, category, color, discovered_by, melt, molar_heat, named_by, period, phase, source, 
    //     spectral_img, summary, shells, ionization_energies,
    //     electron_configuration, electron_configuration_semantic, electron_affinity, electronegativity_pauling } = props.element
    properties.sort((a, b) => ['ionization_energies', 'shells', 'electron_configuration'].includes(a[0]) ? 1 : -1)
    
    properties = properties.map(p => {
        switch(p[0]) {
            case 'xpos':
                return ['group', p[1]]
            case 'boil':
                return ['Boiling Point', p[1] + ' K']
            case 'melt':
                return ['Melting Point', p[1] + ' K']
            case 'density':
                return [p[0], p[1] + ' g/cm3']
            case 'electron_configuration_semantic':
                return ['configuration shorthand', p[1]]
            case 'ionization_energies':
            case 'shells':
                if(!p[1].length) return []
                return [p[0].replaceAll('_', ' '), <div style={{columns: 2}}>{p[1].map((i, id) => <div key={id}>{i}</div>)}</div>]
            default:
                return [p[0].replaceAll('_', ' '), p[1]]
        }
    })
    
    const img_url = props.element.spectral_img ? props.element.spectral_img : null
    
    const listItems = properties.map(p => (
        p[1] 
            ? <li key={p[0]}>
                <strong>{p[0]}: </strong>
                <span>{p[1]}</span>
              </li> 
            : null
    ))
    return (
        <div className={styles.details} onScroll={e => setOffset(e.target.scrollTop)}>
            <span onClick={() => props.handleSelect(null)} style={{ position: 'absolute', top: offset, right: '2px', padding: '2px', cursor: 'pointer'}}>{props.handleSelect ? <img height='20px' width='20px' src='https://img.icons8.com/windows/344/pin3.png'/> : ''}</span>
            <ul className={styles['placard-list']}>
                {listItems}
            </ul>
            {img_url ? <a className={styles.spectra} href={img_url} alt={`Spectral img of ${props.element.name}`}>Spectra</a> : null}
            <p className={styles.tiny}>{props.element.summary}</p>
        </div>
    )
}