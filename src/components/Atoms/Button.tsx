import { forwardRef, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import styled from '@emotion/styled'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Component = forwardRef<HTMLButtonElement, Props>((props, ref) => <button type="button" {...props} ref={ref} />)

const StyledComponent = styled(Component)`
  -moz-apperance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0.25em 1em;
  font-size: 1em;
  border-radius: 3px;
  border: 0;
  transition: 0.3s;
  cursor: pointer;

  :focus:not(:focus-visible) {
    outline: 0;
  }
`

const StyledTransparentComponent = styled(StyledComponent)`
  border: none;
  background: none;
`

export const Button = StyledComponent
export const TransparentButton = StyledTransparentComponent
