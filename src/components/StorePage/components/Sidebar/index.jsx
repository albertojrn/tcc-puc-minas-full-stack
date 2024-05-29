import React, { useEffect, useState } from 'react'
import SidebarMenu from '../SidebarMenu'
import { SidebarContainer } from './styles'
import SidebarSelectedFeatures from '../SidebarSelectedFeatures'
import { readFeatures } from '../../../../services/api/features'

function Sidebar({
  availableFeaturesValues,
  selectedFeatures,
}) {
  const [menuItems, setMenuItems] = useState([])

  async function loadMenuParams() {
    const query = {
      getvalues: true,
      featurevalues: availableFeaturesValues,
    }
    const resFeatures = await readFeatures(null, query)
    if (resFeatures.status === 200 && Array.isArray(resFeatures.data) && resFeatures.data.length) {
      setMenuItems(resFeatures.data)
    }
  }

  useEffect(() => {
    loadMenuParams()
  }, [availableFeaturesValues])

  return (
    <SidebarContainer
      direction='column'
      spacing={2}
    >
      {!!menuItems?.length
      && (
        <>
          <SidebarSelectedFeatures
            menuItems={menuItems}
            selectedFeatures={selectedFeatures}
          />
          <SidebarMenu
            menuItems={menuItems}
            selectedFeatures={selectedFeatures}
          />
        </>
      )}

    </SidebarContainer>
  )
}

export default Sidebar
