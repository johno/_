/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Alert as DSAlert, Button as DSButton } from 'johno-ds'
export {
  Box,
  Badge,
  Card,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Td
} from 'johno-ds'

export const Alert = (props) => (
  <DSAlert sx={{ p: { all: 'unset' } }} {...props} />
)
export const Button = (props) => (
  <DSButton sx={{ p: { all: 'unset' } }} {...props} />
)
