import './select.css'
import njsx from 'njsx'
import { Select as FS } from 'react-functional-select'
import { SelectProps } from 'react-functional-select/dist/Select'
import { useBoolean } from 'react-hanger'

import caret from './select.caret'
import { colors } from 'src/styles/theme'

const { gray, blue } = colors

const FunctionalSelect = njsx(FS)

const Select = <T>({
  options,
  ...props
}: { options: T[] } & SelectProps) => ([
  initialValue,
  onOptionChange,
]: [T, (data: T) => void]):
  | false
  | typeof FunctionalSelect => {
  const {
    setFalse: onMenuClose,
    setTrue: onMenuOpen,
    value: isOpen,
  } = useBoolean(false)
  const renderCaret = caret(isOpen)
  return (
    typeof window !== 'undefined' &&
    FunctionalSelect({
      ...props,
      addClassNames: true,
      caretIcon: renderCaret(),
      initialValue,
      onMenuClose,
      onMenuOpen,
      onOptionChange,
      options,
      themeConfig: {
        color: {
          border: gray[700],
          iconSeparator: gray[500],
          primary: blue[500],
        },
        control: {
          boxShadow: 'none',
          focusedBorderColor: blue[500],
        },
        icon: {
          color: gray[400],
          colorHover: gray[300],
          padding: '8px',
        },
        menu: {
          backgroundColor: gray[700],
          option: {
            focusedBgColor: gray[600],
            selectedBgColor: gray[500],
          },
        },
      },
    })
  )
}

export default Select
