import React from 'react'
import { Tab } from '@mui/material'
import { Home, Person, ShoppingCart } from '@mui/icons-material'
import TabsContent from './components/TabsContent'
import { GridItem, MainGridContainer } from '../../styles'
import { TabsOptions } from './styles'
import MyAccount from './components/MyAccount'
import UserAddress from './components/UserAddress'
import MyOrders from './components/MyOrders'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function ProfilePage() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <MainGridContainer container spacing={2} maxWidth={{ md: '1200px' }}>
      <GridItem item xs={12}>
        <TabsOptions
          onChange={handleChange}
          value={value}
          variant='fullWidth'
        >
          <Tab icon={<Person />} iconPosition='start' label='Minha Conta' {...a11yProps(0)} />
          <Tab icon={<ShoppingCart />} iconPosition='start' label='Meus Pedidos' {...a11yProps(1)} />
          <Tab icon={<Home />} iconPosition='start' label='Meus Endereços' {...a11yProps(2)} />
        </TabsOptions>
      </GridItem>
      <GridItem item xs={12}>
        <TabsContent value={value} index={0}>
          <MyAccount />
        </TabsContent>
        <TabsContent value={value} index={1}>
          <MyOrders />
        </TabsContent>
        <TabsContent value={value} index={2}>
          <UserAddress />
        </TabsContent>
      </GridItem>
    </MainGridContainer>
  )
}

export default ProfilePage
