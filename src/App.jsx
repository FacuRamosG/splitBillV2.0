
import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { SelectBar } from './components/SelectBar'
import { Table } from './components/Table'
import { CheckList } from './components/CheckList'
import divideGastos from './components/handles/divGastos'

function App() {
  const [integrants, setIntegrants] = useState(()=> localStorage.getItem('integrants') ? JSON.parse(localStorage.getItem('integrants')) : [])
  const [integrant, setIntegrant] = useState('')
  const [checked, setChecked] = useState(()=> localStorage.getItem('checked') ? JSON.parse(localStorage.getItem('checked')) : [])
  const [gastos, setGastos] = useState([])
  const [nombreGasto, setNombreGasto] = useState('')
  const [spents, setSpents] = useState(()=> localStorage.getItem('spents') ? JSON.parse(localStorage.getItem('spents')) : [])
  const [integrantSelected, setIntegrantSelected] = useState("")
  const [integrantSelectedId, setIntegrantSelectedId] = useState(null)
  const [deudas, setDeudas] = useState([])
  const [swipe, setSwipe] = useState(false)
  const [cargaDeParticipantes, setCargaDeParticipantes] = useState(()=> localStorage.getItem('cargaDeParticipantes') ? JSON.parse(localStorage.getItem('cargaDeParticipantes')) : false)

  useEffect(() => {
    localStorage.setItem('integrants', JSON.stringify(integrants))
  },[integrants] )
  useEffect(() => {
    localStorage.setItem('spents', JSON.stringify(spents))
  },[spents] )
  useEffect(() => {
    setChecked(integrants.map(() => false))
  },[integrants])
  useEffect(() => {
    localStorage.setItem('cargaDeParticipantes', JSON.stringify(cargaDeParticipantes))
  },[cargaDeParticipantes] )

  const handleSubmit = (e) => {
    e.preventDefault()
    setSwipe(false)
    if(!integrant || integrant === '') return
    if (integrants.find((inte) => inte.toLowerCase() === integrant.toLowerCase())) {
      alert('El participante ya existe.');
      return;
    }
    
    setIntegrants([...integrants, integrant.charAt(0).toUpperCase() + integrant.slice(1)])
    setChecked([...checked, false])
    e.target.value = ''
    setIntegrant('')
  }
  const handleChange = (e) => {
    setIntegrant(e.target.value)
  }
  const handleChangeInput = (index) => {
    setChecked(checked.map((check, i) => {
      if(index === i) {
        return !check
      }
      
      return check
    }))
    
  }

  const handleGasto = (e) => {
    setGastos(e.target.value)
  }
  const handleNombreGasto = (e) => { 
    setNombreGasto(e.target.value)

  }

  const handleSelectIntegrant = (e) => {
    setIntegrantSelected(e.target.value)
    setIntegrantSelectedId(e.target.selectedIndex - 1)
    
  }

  const handleSubmitAddSpent = (e) => {
    e.preventDefault()
    console.log(checked)

    const integrantsSelected = integrants.filter((integrant, index) => checked[index])
    const integrantsSelectedId = checked.map((check, index) => check ? index : null).filter((index) => index !== null)
    if(!integrantsSelected.length) {
      alert('Por favor, seleccione al menos un integrante')
      return
    }
    if(!nombreGasto || nombreGasto === '') {
      alert('Por favor, ingrese el nombre del gasto')
      return
    }
    if(integrantSelected === '' || integrantSelected === 'Select an integrant') {
      alert('Por favor, seleccione el integrante que pagó el gasto')
      return
    }
    if(!gastos || gastos === '') {
      alert('Por favor, ingrese el monto del gasto')
      return
    }

    const spent = {
      integrant: integrantSelected,
      integrantId: integrantSelectedId,
      nombreGasto,
      gastos,
      integrants: integrantsSelected,
      integrantsId: integrantsSelectedId
    }
    setNombreGasto('')
    setGastos('')
    setSpents([...spents, spent])
  }
  const handleDelete = (e) => {
    const index = e.target.parentElement.parentElement.rowIndex - 1
    const newSpents = spents.filter((spent, i) => i !== index)
    setSpents(newSpents)
  }

  const handleAgregarGasto = () => {
    setSwipe(!swipe)
    setChecked(checked.map(() => false))
  }

  const handleRestart = () => {
    if(confirm('¿Está seguro que desea reiniciar?')) {
      setIntegrants([])
      setIntegrant('')
      setChecked([])
      setGastos([])
      setNombreGasto('')
      setSpents([])
      setIntegrantSelected('')
      setIntegrantSelectedId(null)
      setDeudas([])
      setSwipe(false)
      setCargaDeParticipantes(false)
    }
  }

  const finalizarCarga = () => {
    if(integrants.length === 0) {
      alert('Por favor, ingrese al menos un participante.')
      return
    }
    setCargaDeParticipantes(true)
  }



  return (
    <section className='p-4 max-w-3xl m-auto'>
      {integrants.length <= 0 && !cargaDeParticipantes && 
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-4xl font-semibold text-gray-900 dark:text-white'>Divide tus gastos</h1>
          <p className='text-gray-700 dark:text-gray-300'>Ingresa los participantes que van a dividir los gastos</p>
        </div>
      }
      <div className='my-5'>
        <form onSubmit={handleSubmit} className='flex gap-4 justify-center items-center'>
          <input 
            type="text"
            className='px-3 py-2.5 w-64 border border-gray-300 focus:ring-4 focus:ring-gray-100 focus:border-gray-100 rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-gray-700 dark:focus:border-gray-700 dark:text-white'
            value={integrant}
            onChange={handleChange} />
          <button className='text-gray-900 px-3 py-2.5 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' >Sumar participante</button>
          {/* arreglar boton */}
          {!cargaDeParticipantes && <button onClick={finalizarCarga} className='border px-3 py-2.5 rounded-lg text-sm' >Finalizar</button>}
            
        </form>
        {integrants.length > 0 && !cargaDeParticipantes && 
          <div className='flex justify-center items-center mt-5'>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {integrants.map((integrant, index) => (
            <li key={index} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex justify-between items-center p-2">
                <p className='text-xl font-normal'>{integrant}</p>
                <button onClick={()=>setIntegrants(integrants.filter((inte, i) => i !== index))} className='text-xl text-red-600 text-center'>X</button>
              </div>
            </li>
          ))}
          
        </ul>
          </div>
        }
      </div>

      {integrants.length > 0 && cargaDeParticipantes  && 
      <>
        { !swipe && <button className='p-3 border rounded-xl mx-auto w-full ' onClick={handleAgregarGasto}>Agregar gasto</button>}

        { swipe && <form className={`flex-col justify-center align-middle gap-4 mb-4  ${swipe ? 'mostrar' : 'hidden'}`}>
          <div className='flex flex-col'>
            <label htmlFor="" className="text-sm font-medium text-gray-900 dark:text-white">Nombre del gasto</label>  
            <input type="text" placeholder='Ingrese el nombre del gasto' onChange={handleNombreGasto} value={nombreGasto} className='w-64 h-16 p-3'/>

            <label htmlFor="" className="text-sm font-medium text-gray-900 dark:text-white">Monto</label>
            <input type="number" placeholder='Ingrese el monto' onChange={handleGasto} value={gastos} className='w-64 h-16 p-3'/>

            <label htmlFor="integrants" className="text-sm font-medium text-gray-900 dark:text-white">Pagado por</label>
            <select id="integrants" onChange={handleSelectIntegrant} className="bg-gray-50 border w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="Select an integrant">Pagado por</option>
                {integrants.map((integrant, index) => (
                    <option key={index} value={integrant}>{integrant}</option>
                ))}
            </select>

          </div>

          <div className='flex items-center gap-28'>
              <div>
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Integrantes</h3>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {integrants.map((integrant, index) => (
                    <li key={index} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input id={`${integrant}-checkbox`} onChange={()=> handleChangeInput(index)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor={`${integrant}-checkbox`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{integrant}</label>
                      </div>
                    </li>
                  ))}
                  
                </ul>

              </div>
              <div className='flex flex-col justify-center items-center gap-2'>              

              </div>
          </div>
          <button className='bg-blue-500 text-white text-3xl sm:w-1/2   p-3 rounded-lg'onClick={handleSubmitAddSpent} >+</button>
          <button className='p-3 border border-red-400 text-red-400 sm:w-1/2 rounded-lg'onClick={handleAgregarGasto} >Calcelar</button>

        </form>

        }

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10 mt-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                        Nombre del gasto
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Ha sido pagado por
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Monto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Participantes
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {spents.map((spent, index) => (
                      <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {spent.nombreGasto}                            
                          </th>
                          <td className="px-6 py-4">
                              {spent.integrant}
                          </td>
                          <td className="px-6 py-4">
                              {spent.gastos}
                          </td>
                          <td className="px-6 py-4">
                              {spent.integrants.map((integrant, index) => (
                                <span key={index} className="px-2 py-1 mr-1 text-xs font-medium text-white bg-blue-500 rounded-full dark:bg-blue-600">{integrant}</span>
                              ))}
                          </td>
                          <td className="px-6 py-4 flex justify-center items-center">
                              <button onClick={handleDelete} className='text-red-600 text-center'>
                              X
                              </button>
                          </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className='flex flex-col justify-center items-center'> 
          <div>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={()=>setDeudas(divideGastos(spents))}>Calcular</button>
            <button onClick={handleRestart} className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>Reiniciar</button>
          </div>
          {deudas.length > 0 && 
            <div className='flex flex-col justify-center items-center gap-2 w-full mt-5'>
              <ul className='grid grid-cols-fluid gap-3 w-full'>
                {deudas.map((deuda, index) => (
                  // <li key={index} className='p-2 border border-gray-400 '>{integrants[deuda.deudor]} le debe a {integrants[deuda.acredor]} {parseInt(deuda.saldo)}</li>
                  <li key={index} className='border border-blue-400 p-4 rounded-3xl text-center'>
                    <div className='flex flex-col gap-2'>
                      <span className='text-2xl'>{integrants[deuda.deudor]}</span>
                      <span>le debe a</span>
                      <span className='text-2xl'>{integrants[deuda.acredor]}</span>
                      <span className='text-xl'>${parseInt(deuda.saldo)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
        
      </>
      }
    </section>
    
  )
}

export default App

