import React from 'react'
import * as Rebass from 'rebass'
import createScope from '@rebass/markdown'
import { ScopeProvider } from '@compositor/x0/components'

export default ({ route, routes, ...props }) => (
  <ScopeProvider scope={{ ...Rebass, ...createScope() }}>
    <Rebass.Provider>
      <Rebass.Box p={[2, 4, 4]} {...props} />
    </Rebass.Provider>
  </ScopeProvider>
)
