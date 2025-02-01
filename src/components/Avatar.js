import React from 'react'
import styles from '../styles/Avatar.module.css'

//This component displays an avatar image with customizable size and optional text.
const Avatar = ({ src, height = 45, text }) => {
    return (
        <span>
            <img className={styles.Avatar} src={src}
                height={height} width={height} alt="avatar" />
        </span>
    )
}

export default Avatar