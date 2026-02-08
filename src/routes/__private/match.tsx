import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__private/match')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__private/match"!</div>
}
