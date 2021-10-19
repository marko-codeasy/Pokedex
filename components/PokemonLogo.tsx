import { useRouter } from 'next/router'

export default function PokemonLogo(): JSX.Element {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <img
        className="object-center object-cover h-20 cursor-pointer"
        src="https://www.pinclipart.com/picdir/big/379-3791327_pokemon-logos-png-vector-pokemon-logo-transparent-background.png"
        alt="logo"
        onClick={handleClick}
      />
    </div>
  )
}
