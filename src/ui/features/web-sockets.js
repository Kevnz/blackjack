import React from 'react'
import { Container } from '@brightleaf/elements'
import { useNes } from '@brightleaf/react-hooks/lib/use-nes'

export default () => {
  const { message, error, connecting, connected } = useNes(
    'wss://kev-pi.herokuapp.com'
  )
  // client.subscribe('/games/general', handler);
  console.log('message', message)
  return (
    <Container>
      {error && <div>Error</div>}
      {connecting && <div>connecting</div>}
      {connected && <div>connected</div>}
    </Container>
  )
}
