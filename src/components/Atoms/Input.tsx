import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react'
import styled from '@emotion/styled'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Component = forwardRef<HTMLInputElement, Props>((props, ref) => <input {...props} aria-label={props.name} ref={ref} />)

const StyledComponent = styled(Component)`
  padding: 0.25em;
  border: 1px solid #000;
  border-radius: 0.25em;
`

export const Input = StyledComponent
