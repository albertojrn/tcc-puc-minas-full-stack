import { createContext, useContext, useMemo, useState } from 'react'

const DASHBOARD_INIT_VALUES = {
  dialogChild: null,
  openDialog: false,
  orderConfirmationSlug: '',
}

const context = createContext({
  ...DASHBOARD_INIT_VALUES,
  setStorePersistent: () => {}
})

const useStoreContext = () => useContext(context)

const StoreContextProvider = ({ children }) => {
  const [data, setData] = useState(DASHBOARD_INIT_VALUES)

  const value = useMemo(() => ({
    ...data,
    setStorePersistent: (newData) => setData(prev => ({ ...prev, ...newData })),
  }), [data])

  return (
    <context.Provider value={value}>
      { children }
    </context.Provider>
  )
}

export { StoreContextProvider, useStoreContext }
