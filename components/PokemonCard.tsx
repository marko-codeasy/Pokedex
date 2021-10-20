import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pokemon, PokemonType, PokemonStatPrettifyMap } from '../types/pokemon'
import { capitalize } from '../util/capitalize'
import Image from 'next/image'

const PokemonTypeBgColorMap = Object.freeze({
  [PokemonType.Normal]: 'bg-gray-500',
  [PokemonType.Fire]: 'bg-red-500',
  [PokemonType.Fighting]: 'bg-red-800',
  [PokemonType.Water]: 'bg-blue-300',
  [PokemonType.Flying]: 'bg-indigo-500',
  [PokemonType.Grass]: 'bg-green-300',
  [PokemonType.Poison]: 'bg-indigo-700',
  [PokemonType.Electric]: 'bg-yellow-400',
  [PokemonType.Ground]: 'bg-yellow-900',
  [PokemonType.Psychic]: 'bg-pink-400',
  [PokemonType.Rock]: 'bg-yellow-700',
  [PokemonType.Ice]: 'bg-blue-200',
  [PokemonType.Bug]: 'bg-green-600',
  [PokemonType.Dragon]: 'bg-yellow-800',
  [PokemonType.Ghost]: 'bg-indigo-300',
  [PokemonType.Dark]: 'bg-gray-900',
  [PokemonType.Steel]: 'bg-gray-400',
  [PokemonType.Fairy]: 'bg-pink-300',
})

interface Props extends Pokemon {
  captured: boolean
  onCaptured?: (pokemonId: number) => void
}

export default function PokemonCard({ id, name, types, stats, captured, onCaptured }: Props): JSX.Element | null {
  const [detailsDisplayed, setDetailsDisplayed] = useState<boolean>(false)

  const handleCardClick = () => {
    setDetailsDisplayed(!detailsDisplayed)
  }

  return (
    <motion.div
      className="w-full bg-white rounded-lg p-4 flex flex-col justify-center items-center shadow cursor-pointer h-72"
      initial={{ opacity: 0.5, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...(detailsDisplayed && { rotateY: 180, scaleX: -1 }) }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ y: -5 }}
      onClick={handleCardClick}
    >
      {!detailsDisplayed ? (
        <>
          <div className="mb-2">
            <Image
              src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
              alt={name}
              width={128}
              height={128}
            />
          </div>
          <div className="text-center mb-4">
            <p className="text-xl text-gray-600 font-bold mb-2">{capitalize(name)}</p>
            {types.map((type) => (
              <span
                key={type}
                className={`inline-block rounded-full text-white px-2 py-1 text-xss font-bold mr-3 ${
                  PokemonTypeBgColorMap[type as PokemonType]
                }`}
              >
                {type.toUpperCase()}
              </span>
            ))}
          </div>
          <div>
            <label className="flex justify-center items-start" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white border-2 rounded border-gray-300 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-300">
                <input
                  type="checkbox"
                  checked={captured}
                  className="opacity-0 absolute cursor-pointer"
                  onChange={() => onCaptured && onCaptured(id)}
                />
                <svg className="fill-current hidden w-4 h-4 text-blue-300 pointer-events-none" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div className="select-none text-gray-400 cursor-pointer">Captured</div>
            </label>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <p className="text-xl text-gray-700 font-bold mr-2">{capitalize(name)}</p>
            <img
              className="object-center object-cover rounded-full h-8 w-8"
              src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
              alt="photo"
            />
          </div>
          {Object.keys(stats).map((stat) => (
            <div key={stat}>
              <span className="inline-block rounded-full text-gray-600 bg-gray-100 px-3 py-1 text-xs font-bold mb-1">
                {PokemonStatPrettifyMap[stat]} &nbsp; <b>{stats[stat]}</b>
              </span>
            </div>
          ))}
        </>
      )}
    </motion.div>
  )
}
