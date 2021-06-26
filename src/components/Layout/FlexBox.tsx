import { VFC, ReactNode, CSSProperties } from 'react'
import styled from '@emotion/styled'

type CSSPropertyKey<T extends keyof CSSProperties> = Required<ValueOf<Pick<CSSProperties, T>>>

type Props = {
  children: ReactNode
  direction?: CSSPropertyKey<'flexDirection'>
  alignitems?: 'center' | 'flex-start' | 'flex-end' | 'baseline'
  justifycontent?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: number
  className?: string
}

const Component: VFC<Props> = ({ children, className }) => <div className={className}>{children}</div>

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.alignitems};
  justify-content: ${(props) => props.justifycontent || 'start'};
  gap: ${(props) => (props.gap ? `${props.gap}em` : 0)};
`

export const FlexBox = StyledComponent
