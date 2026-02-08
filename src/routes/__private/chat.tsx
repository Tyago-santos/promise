import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__private/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__private/chat"!</div>
}
