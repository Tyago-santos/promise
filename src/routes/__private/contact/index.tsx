import ContactMobile from "@/components/ContactMobile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__private/contact/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { media } = Route.useRouteContext();

  if (media) {
    return <ContactMobile />;
  }
  //   useEffect(() => {
  //     const media = window.matchMedia("(max-width: 768px)");

  //     const update = () => setIsMobile(media.matches);
  //     update();

  //     media.addEventListener("change", update);
  //     return () => media.removeEventListener("change", update);
  //   }, []);
  return <div>Olá </div>;
}
