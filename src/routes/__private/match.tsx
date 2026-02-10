import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__private/match')({
  component: RouteComponent,
})

function RouteComponent() {
              <Heart className="w-20 h-20 text-white animate-tinder" />
