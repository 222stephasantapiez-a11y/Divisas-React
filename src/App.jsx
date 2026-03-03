import { useEffect, useState } from 'react'

const App = () => {
  const [divisas, setDivisas] = useState([])
  const [seleccion, setSeleccion] = useState('')
  const [divisaDefinitiva, setDivisaDefinitiva] = useState(null)
  const [valor, setValor] = useState('')
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    consultar()
  }, [])

  const consultar = async () => {
    let url = "https://co.dolarapi.com/v1/cotizaciones"
    const respuesta = await fetch(url)
    const data = await respuesta.json()
    setDivisas(data)
  }

  const cambioDivisa = (idDivisa) => {
    setSeleccion(idDivisa)
    const encontrada = buscarDivisa(idDivisa)
    setDivisaDefinitiva(encontrada)
  }

  const buscarDivisa = (idDivisa) => {
    return divisas.find(objdivisa => 
      objdivisa.moneda === idDivisa
    )
  }

  const convertir = () => {
    if (!valor || !divisaDefinitiva) return

    const tasa = divisaDefinitiva.ultimoCierre
    const conversion = valor / tasa
    setResultado(conversion.toFixed(2))
  }

  return (
    <div className="contenedor">
      <h1>Convertir desde COP</h1>

      <input 
        type="number" 
        placeholder="Cantidad en pesos (COP)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <select
        onChange={(evento) => cambioDivisa(evento.target.value)}
      >
        <option value="">Selecciona una divisa</option>
        {divisas.map(divisa => (
          <option key={divisa.moneda} value={divisa.moneda}>
            {divisa.nombre}
          </option>
        ))}
      </select>

      <button onClick={convertir}>Convertir</button>

      {resultado && (
        <p>
          Resultado: {resultado} {seleccion}
        </p>
      )}
    </div>
  )
}

export default App