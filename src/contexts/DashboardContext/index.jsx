import { createContext, useContext, useMemo, useState } from 'react'
import { DASHBOARD_INIT_VALUES } from './constants/params'

const context = createContext({
  ...DASHBOARD_INIT_VALUES,
  setDashboardData: () => {}
})

const useDashboardContext = () => useContext(context)

const DashboardContextProvider = ({ children }) => {
  const [data, setData] = useState(DASHBOARD_INIT_VALUES)

  const value = useMemo(() => ({
    ...data,
    setDashboardData: (newData) => setData({ ...data, ...newData }),
  }), [data])

  return (
    <context.Provider value={value}>
      { children }
    </context.Provider>
  )
}

export { DashboardContextProvider, useDashboardContext }
