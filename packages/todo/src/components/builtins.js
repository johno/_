/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Alert as DSAlert } from 'johno-ds'
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

export const Alert = (props) => <DSAlert sx={{ p: { m: 0 } }} {...props} />
