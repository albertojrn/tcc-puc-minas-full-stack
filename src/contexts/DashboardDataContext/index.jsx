import { createContext, useContext, useMemo, useState } from 'react'
import { INIT_VALUES } from './constants/params'

const context = createContext({
  ...INIT_VALUES,
  setDashboardData: () => {}
})

const useDashboardDataContext = () => useContext(context)

const DashboardDataContextProvider = ({ children }) => {
  const [data, setData] = useState(INIT_VALUES)

  const value = useMemo(() => ({
    ...data,
    setDashboardData: (newData) => setData(prev => ({ ...prev, ...newData })),
  }), [data])

  return (
    <context.Provider value={value}>
      { children }
    </context.Provider>
  )
}

export { DashboardDataContextProvider, useDashboardDataContext }
