import { useEffect } from 'react'

export function useOutsideClose(ref, closeDropdown) {
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      closeDropdown()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })
}
