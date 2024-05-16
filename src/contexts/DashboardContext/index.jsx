import { createContext, useContext, useMemo, useState } from 'react'
import { DASHBOARD_INIT_VALUES } from './constants/params'

const context = createContext({
  ...DASHBOARD_INIT_VALUES,
  setDashboardParams: () => {}
})

const useDashboardContext = () => useContext(context)

const DashboardContextProvider = ({ children }) => {
  const [data, setData] = useState(DASHBOARD_INIT_VALUES)

  const value = useMemo(() => ({
    ...data,
    setDashboardParams: (newData) => setData(prev => ({ ...prev, ...newData })),
  }), [data])

  return (
    <context.Provider value={value}>
      { children }
    </context.Provider>
  )
}

export { DashboardContextProvider, useDashboardContext }
