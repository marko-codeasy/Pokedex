import { Pokemon } from '../types/pokemon'
import { capitalize } from '../helpers/capitalize'

interface Props extends Pokemon {
  captured: boolean
  onCaptured?: (pokemonId: number) => void
}

export default function PokemonCard({ id, name, types, captured, onCaptured }: Props): JSX.Element | null {
  return (
    <div className="w-full bg-white rounded-lg p-4 flex flex-col justify-center items-center shadow">
      <div className="mb-2">
        <img
          className="object-center object-cover rounded-full h-36 w-36"
          src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`}
          alt="photo"
        />
      </div>
      <div className="text-center mb-4">
        <p className="text-xl text-gray-700 font-bold mb-2">{capitalize(name)}</p>
        {types.map((type) => (
          <span
            key={type}
            className="inline-block rounded-full text-gray-600 bg-gray-100 px-2 py-1 text-xss font-bold mr-3"
          >
            {type.toUpperCase()}
          </span>
        ))}
      </div>
      <div>
        <label className="flex justify-start items-start">
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
    </div>
  )
}
