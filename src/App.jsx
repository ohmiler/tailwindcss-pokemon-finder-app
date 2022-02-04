import { useState, useEffect  } from 'react'
import logo from './logo.svg'
import { TailSpin } from  'react-loader-spinner'
import './App.css'

function App() {
  const [name, setName] = useState("eevee");
  const [data, setData] = useState([])
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(name);

  async function getPokemon() {
    setIsLoading(true);
    try {
      setErr(false);
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemonData = await res.json();
      setData(pokemonData);
    } catch(err) {
      setData(false);
      setErr(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getPokemon();
    console.log(data);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-indigo-800">
        <div className="bg-white text-center rounded-3xl border shadow-lg p-10 max-w-xs">
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="p-3 border-solid border-2 border-indigo-600 rounded-md" placeholder="Search by name" />
          <button className="bg-indigo-600 px-2 mt-5 text-lg rounded text-gray-100">Search</button>
        </form>

        {err ? (
            <p className='my-5'>No data was found!</p>
          ) : (
            <>
              {isLoading ? (
                <p className="my-5">Loading...</p>
              ) : (
                <>
                  <img className='my-5 w-50 h-50 rounded-xl shadow-lg mx-auto' alt={`${data.name}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt="" />
                  <h1 className='text-lg text-gray-700'>{data.name}</h1>
                  <h3 className='text-md text-gray-500'>Weight: {data.weight}</h3>
                </>
              )}
            </>
          )}
          
        </div>
    </div>
  )
}

export default App
