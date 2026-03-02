import {useEffect, useState} from 'react'

const App = () => {
  const [divisas, setDivisas] = useState([])
  const[seleccion, setSeleccion] = useState('')
  const [divisaDefinitiva, setDivisaDefinitiva] = useState(null)

  useEffect(() => {
   consultar()
   console.log(divisas)
  }, [])

  const consultar = async () => {
    let url = "https://co.dolarapi.com/v1/cotizaciones"
     const resultado = await fetch(url)
     const data = await resultado.json()
     setDivisas(data)
     return resultado.json()
  }
  const cambioDivisa = (idDivisa) => {
    console.log("divisa seleccionada",idDivisa)
    setSeleccion(idDivisa)
    setDivisaDefinitiva(buscarDivisa(idDivisa))
    console.log("divisa encontrada", divisaDefinitiva)
  }

  const buscarDivisa = (idDivisa) => {
    let divisaEncontrada = divisas.find(objdivisa => 
      objdivisa.moneda === idDivisa)
      
    return divisaEncontrada
  }

  return (
    <>  <div className="contenedor">
        <h1>Convertir desde COP</h1>
        <input type="number" id="valor" placeholder="Cantidad en pesos (COP)"/>
      
        <select id="opcionesDivisas"
         onChange={(evento) => cambioDivisa(evento.target.value)}>
            <option value="">Cargando divisas...</option>
        { divisas &&
          divisas.map (divisa => {
            return <option value={divisa.moneda}>{divisa.nombre}</option>
          })
        }
        </select>

        {/* <button >Convertir</button> */}
        <p id="resultado"></p>
        {divisaDefinitiva?.ultimoCierre}
    </div>
</>
  )
}

export default App