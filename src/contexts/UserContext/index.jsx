import { createContext, useContext, useMemo, useState } from 'react'
import { USER_INIT_VALUES } from './constants/params'

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

  return (
    <context.Provider value={value}>
      { children }
    </context.Provider>
  )
}

export { UserContextProvider, useUserContext }
