import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTarget } from '../lib/smoothScroll.js'

export default function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [pathname])
}
