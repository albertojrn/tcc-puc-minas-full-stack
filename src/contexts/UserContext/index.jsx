import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_INIT_VALUES } from './constants/params'
import { readCartProduct } from '../../services/api/cart'
import { readUserAddress } from '../../services/api/address'
import { validateUser } from '../../services/api/auth'

const context = createContext({
  ...USER_INIT_VALUES,
  setUser: () => {},
  logoutUser: () => {},
})

const useUserContext = () => useContext(context)

const UserContextProvider = ({ children }) => {
  const [data, setData] = useState(USER_INIT_VALUES)
  const navigate = useNavigate()

  const value = useMemo(() => ({
    ...data,
    setUser: (newData) => setData(prev => ({ ...prev, ...newData })),
    logoutUser: (redirectUrl) => logoutUser(redirectUrl)
  }), [data])

  async function loadDataOnLoggedIn() {
    const id = data.id
    const token = data.token
    if (data.token) {
      if (data.id) {
        const promises = [readCartProduct(id, token), readUserAddress(id, token)]
        const res = await Promise.all(promises)
        const newData = {}
        if (res[0]?.status === 200 && Array.isArray(res[0]?.data) && res[0]?.data.length) {
          newData.cart = res[0].data
        }
        if (res[1]?.status === 200 && Array.isArray(res[1]?.data) && res[1]?.data.length) {
          newData.addresses = res[1].data
        }
        if (Object.keys(newData).length) {
          setData(prev => ({ ...prev, ...newData }))
        }
      }
    }
    else {
      const savedToken = sessionStorage.getItem('token') ?? localStorage.getItem('token')
      if (savedToken) {
        const resValidation = await validateUser(savedToken)
        if (resValidation.status === 200 && resValidation.data?.id) {
          setData(prev => ({ ...prev, ...resValidation.data, token: savedToken }))
        }
      }
    }
  }

  function logoutUser(redirectUrl) {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setData(USER_INIT_VALUES)
    const navigateTo = redirectUrl ?? '/'
    navigate(navigateTo)
  }

  useEffect(() => {
    loadDataOnLoggedIn()
  }, [data.token])

  return (
    <context.Provider value={value}>
      { children }
    </context.Provider>
  )
}

export { UserContextProvider, useUserContext }
