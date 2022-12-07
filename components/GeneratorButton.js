import { useState, useEffect } from 'react'
import styles from '../styles/ideaGenerator.module.css'
import Star from "./Star"

const GeneratorButton = ({ selectIdea, selectedIdea, isLoading }) => {
  const buttonText = selectedIdea ? `Go again` : `Let's go!`
  return (
    <div className="flex justify-center absolute bottom-0 right-0">
      <button onClick={selectIdea} className={`relative font-medium text-black ${styles.generatorButton} ${isLoading ? styles.loading : ''}`}>
        <div className={`absolute inset-0 ${styles.spinning}`}>
          <Star />
        </div>
        <span className="absolute inset-0 flex p-2 items-center justify-center whitespace-nowrap text-lg">{buttonText}</span>
      </button>
    </div>
  )
}

export default GeneratorButton