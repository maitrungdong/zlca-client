import { useEffect, useState } from 'react'
import { reduxStore } from 'domain/stores/redux/reduxStore'

const refEquality = (a, b) => a === b

export const useCustomSelector = (selector, equalityFn = refEquality) => {
  const [value, setValue] = useState(() => {
    return selector(reduxStore.getState())
  })

  useEffect(() => {
    const unSubscribe = reduxStore.subscribe(() => {
      const selectedValue = selector(reduxStore.getState())
      if (!equalityFn(value, selectedValue)) {
        setValue(selectedValue)
      }
    })

    return () => {
      unSubscribe()
    }
  }, [])
  return value
}
