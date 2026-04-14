import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Header from '../Header'
import MobileBottomNav from '../MobileBottomNav'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

vi.mock('../ThemeToggle', () => ({
  default: () => <button type="button">Theme</button>,
}))

describe('app navigation layout', () => {
  it('renders top nav links', () => {
    render(<Header />)

    expect(screen.getByText('AckMoney')).toBeTruthy()
    expect(screen.getByText('Dashboard')).toBeTruthy()
    expect(screen.getByText('Transactions')).toBeTruthy()
    expect(screen.getByText('Budgets')).toBeTruthy()
    expect(screen.getByText('Accounts')).toBeTruthy()
    expect(screen.getByText('Reports')).toBeTruthy()
  })

  it('renders mobile bottom nav links', () => {
    render(<MobileBottomNav />)

    expect(screen.getByText('Dashboard')).toBeTruthy()
    expect(screen.getByText('Transactions')).toBeTruthy()
    expect(screen.getByText('Budgets')).toBeTruthy()
    expect(screen.getByText('Accounts')).toBeTruthy()
    expect(screen.getByText('Reports')).toBeTruthy()
  })
})
