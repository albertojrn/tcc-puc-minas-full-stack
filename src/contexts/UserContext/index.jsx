import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { USER_INIT_VALUES } from './constants/params'
import { readCartProduct } from '../../services/api/cart'

const context = createContext({
  ...USER_INIT_VALUES,
  setUser: () => {}
})

const useUserContext = () => useContext(context)

const UserContextProvider = ({ children }) => {
  const [data, setData] = useState(USER_INIT_VALUES)

  const value = useMemo(() => ({
    ...data,
    setUser: (newData) => setData(prev => ({ ...prev, ...newData })),
  }), [data])

  async function loadDataOnLoggedIn() {
    if (data.token) {
      if (data.id) {
        const res = await readCartProduct(data.id, data.token)
        if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
          setData(prev => ({ ...prev, cart: res.data }))
        }
      }
    }
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
