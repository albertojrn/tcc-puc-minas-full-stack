import { createContext, useContext, useMemo, useState } from 'react'
import { LOADING_INIT_VALUES } from './constants/params'

const context = createContext({
  ...LOADING_INIT_VALUES,
  setLoading: () => {}
})

const useLoadingContext = () => useContext(context)

const LoadingContextProvider = ({ children }) => {
  const [data, setData] = useState(LOADING_INIT_VALUES)

  const value = useMemo(() => ({
    ...data,
    setLoading: (newData) => setData({ ...data, ...newData }),
  }), [data])

  return (
    <context.Provider value={value}>
      { children }
    </context.Provider>
  )
}

export { LoadingContextProvider, useLoadingContext }
