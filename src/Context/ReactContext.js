import React from 'react'

const ReactContext = React.createContext({
  navItemsHide: true,
  toggleNavItemsHide: () => {},
  headerActiveTabHome: true,
  onChangeHeaderActiveTabFalse: () => {},
  onChangeHeaderActiveTabTrue: () => {},
})

export default ReactContext
