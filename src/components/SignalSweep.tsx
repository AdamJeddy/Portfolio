'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { getSignalSweepTheme, shouldDismissSignalSweep, shouldSignalSweep, type SignalSweepTheme } from '@/lib/signal-sweep'

interface SweepState {
  background: string
  foreground: string
  label: string
  phase: 'covering' | 'revealing'
  x: number
  y: number
}

interface PendingNavigation {
  path: string
}

const routeLabel = (pathname: string) => {
  if (pathname.startsWith('/projects/layla-ai')) return 'Layla AI'
  if (pathname.startsWith('/projects/qeemat')) return 'Qeemat'
  if (pathname.startsWith('/projects')) return 'Projects'
  if (pathname.startsWith('/travel/almaty')) return 'Almaty'
  if (pathname.startsWith('/travel')) return 'Travel'
  if (pathname.startsWith('/writing')) return 'Commentary'
  if (pathname.startsWith('/about')) return 'About'
  if (pathname.startsWith('/contact')) return 'Contact'
  return 'Adam Ahsan'
}

const homeReplayTheme: SignalSweepTheme = {
  background: '#080907',
  foreground: '#ddf46a',
}

export default function SignalSweep() {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const [sweep, setSweep] = useState<SweepState | null>(null)
  const pendingNavigation = useRef<PendingNavigation | null>(null)
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const clearTimers = () => {
      if (navigationTimer.current) clearTimeout(navigationTimer.current)
      if (finishTimer.current) clearTimeout(finishTimer.current)
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!link) return

      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin) return

      const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      const shouldTransition = shouldSignalSweep({
        destinationPath: destination.pathname,
        currentPath: pathname,
        hasModifier,
        target: link.target,
        download: link.hasAttribute('download'),
      })
      if (!shouldTransition || pendingNavigation.current) return

      event.preventDefault()
      const bounds = link.getBoundingClientRect()
      const x = Math.round(((event.clientX || bounds.left + bounds.width / 2) / window.innerWidth) * 100)
      const y = Math.round(((event.clientY || bounds.top + bounds.height / 2) / window.innerHeight) * 100)
      const theme = getSignalSweepTheme(destination.pathname)
      pendingNavigation.current = { path: destination.pathname }
      setSweep({ ...theme, label: routeLabel(destination.pathname), phase: 'covering', x, y })

      navigationTimer.current = setTimeout(() => {
        router.push(`${destination.pathname}${destination.search}${destination.hash}`)
      }, 780)
    }

    document.addEventListener('click', onDocumentClick, true)
    return () => {
      document.removeEventListener('click', onDocumentClick, true)
      clearTimers()
    }
  }, [pathname, router])

  useEffect(() => {
    const pathnameChanged = previousPathname.current !== pathname
    previousPathname.current = pathname
    if (!pathnameChanged || !sweep) return

    if (shouldDismissSignalSweep({
      pendingPath: pendingNavigation.current?.path ?? null,
      pathname,
      pathnameChanged,
    })) {
      pendingNavigation.current = null
      if (navigationTimer.current) clearTimeout(navigationTimer.current)
      if (finishTimer.current) clearTimeout(finishTimer.current)
      setSweep(null)
      return
    }

    if (pendingNavigation.current?.path !== pathname) return

    pendingNavigation.current = null
    setSweep((current) => current ? { ...current, phase: 'revealing' } : null)
    finishTimer.current = setTimeout(() => setSweep(null), 950)
  }, [pathname, sweep])

  useEffect(() => {
    const onHomeReplay = (event: Event) => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (pendingNavigation.current) return

      const detail = (event as CustomEvent<{ x?: number; y?: number }>).detail
      if (navigationTimer.current) clearTimeout(navigationTimer.current)
      if (finishTimer.current) clearTimeout(finishTimer.current)

      setSweep({
        ...homeReplayTheme,
        label: 'Adam Ahsan',
        phase: 'covering',
        x: detail?.x ?? 50,
        y: detail?.y ?? 50,
      })

      navigationTimer.current = setTimeout(() => {
        setSweep((current) => current ? { ...current, phase: 'revealing' } : null)
        finishTimer.current = setTimeout(() => setSweep(null), 950)
      }, 780)
    }

    window.addEventListener('signal:sweep-home', onHomeReplay)
    return () => window.removeEventListener('signal:sweep-home', onHomeReplay)
  }, [])

  return (
    <div
      className="signal-sweep"
      data-phase={sweep?.phase ?? 'idle'}
      aria-hidden="true"
      style={sweep ? {
        '--signal-sweep-background': sweep.background,
        '--signal-sweep-foreground': sweep.foreground,
        '--signal-sweep-x': `${sweep.x}%`,
        '--signal-sweep-y': `${sweep.y}%`,
      } as CSSProperties : undefined}
    >
      <span className="signal-sweep-label">{sweep?.label}</span>
    </div>
  )
}
