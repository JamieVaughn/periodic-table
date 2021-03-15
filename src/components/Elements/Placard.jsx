import React from 'react'

import Card from './Card'

import styles from './elements.module.scss'
//'╳'

export default function Placard (props) {
    if(!props.element) return null
    const { element } = props
    
    return (
        <div className={styles.placard}>
            <Details element={element} handleSelect={props.handleSelect} />
            <Card element={element} handleHover={null} inplacard={true}/>
        </div>
    )
}

function Details (props) {
    let properties = Object.entries(props.element).filter(e => !['name', 'number', 'symbol', 'atomic_mass', 'spectral_img', 'source', 'summary', 'xpos', 'ypos'].includes(e[0]));
    // const {
    //     appearance, boil, category, color, discovered_by, melt, molar_heat, named_by, period, phase, source, 
    //     spectral_img, summary, shells, ionization_energies,
    //     electron_configuration, electron_configuration_semantic, electron_affinity, electronegativity_pauling } = props.element
    properties = properties.map(p => {
        switch(p[0]) {
            case 'boil':
                return ['Boiling Point', p[1]]
            case 'melt':
                return ['Melting Point', p[1]]
            case 'electron_configuration_semantic':
                return ['configuration shorthand', p[1]]
            case 'ionization_energies':
                return ['ionization energies', <div style={{columns: 2}}>{p[1].map(i => <div key={i}>{i}</div>)}</div>]
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
        <div className={styles.details}>
            <span onClick={() => props.handleSelect(null)} style={{position: 'absolute', top: 0, right: '2px', padding: '2px', cursor: 'pointer'}}>{props.handleSelect ? <img height='20px' width='20px' src='https://img.icons8.com/windows/344/pin3.png'/> : ''}</span>
            <ul className={styles['placard-list']}>
                {listItems}
            </ul>
            {img_url ? <a className={styles.spectra} href={img_url} alt={`Spectral img of ${props.element.name}`}>Spectra</a> : null}
            <p className={styles.tiny}>{props.element.summary}</p>
        </div>
    )
}

let example = [
    {
        "name": "Tungsten",
        "appearance": "grayish white, lustrous",
        "atomic_mass": 183.841,
        "boil": 6203,
        "category": "transition metal",
        "color": null,
        "density": 19.25,
        "discovered_by": "Carl Wilhelm Scheele",
        "melt": 3695,
        "molar_heat": 24.27,
        "named_by": null,
        "number": 74,
        "period": 6,
        "phase": "Solid",
        "source": "https://en.wikipedia.org/wiki/Tungsten",
        "spectral_img": null,
        "summary": "Tungsten, also known as wolfram, is a chemical element with symbol W and atomic number 74. The word tungsten comes from the Swedish language tung sten, which directly translates to heavy stone. Its name in Swedish is volfram, however, in order to distinguish it from scheelite, which in Swedish is alternatively named tungsten.",
        "symbol": "W",
        "xpos": 6,
        "ypos": 6,
        "shells": [
            2,
            8,
            18,
            32,
            12,
            2
        ],
        "electron_configuration": "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d4",
        "electron_configuration_semantic": "[Xe] 4f14 5d4 6s2",
        "electron_affinity": 78.76,
        "electronegativity_pauling": 2.36,
        "ionization_energies": [
            770,
            1700
        ]
    }
]