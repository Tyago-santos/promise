import { contacts } from "@/api";
import ContactMobile from "@/components/ContactMobile";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/__private/contact/")({
  component: RouteComponent,
});

type Msg = {
  id: string;
  text: string;
  position: "left" | "right";
  date: Date;
};

function RouteComponent() {
  const { media } = Route.useRouteContext();

  const bottomRef = useRef<HTMLDivElement>(null);

  if (media.matches) {
    return <ContactMobile media={media.matches} />;
  }

  const [messages, setMessages] = useState<Msg[]>(contacts[1].mensagens);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function sendMessage() {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        text: inputValue,
        position: "right",
        date: new Date(),
      },
    ]);
    setInputValue("");
  }

  useEffect(() => {
    bottomRef.current?.scrollTo({
      behavior: "smooth",
      top: bottomRef.current?.scrollHeight,
    });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const handler = () => {
      setOpen(window.visualViewport!.height < window.innerHeight);
    };

    window.visualViewport?.addEventListener("resize", handler);
    return () => window.visualViewport?.removeEventListener("resize", handler);
  }, []);

  //   useEffect(() => {
  //     const media = window.matchMedia("(max-width: 768px)");

  //     const update = () => setIsMobile(media.matches);
  //     update();

  //     media.addEventListener("change", update);
  //     return () => media.removeEventListener("change", update);
  //   }, []);
  return (
    <div className="flex h-dvh overflow-hidden">
      <ContactMobile media={media.matches} />

      {/* <div className="px-4 py-2 text-xs text-gray-500 "></div> */}
      <div ref={bottomRef} className=" flex-1 overflow-y-scroll  relative">
        <div className="flex-1  pb-50 z-0  p-4 space-y-4  ">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.position === `right` ? `justify-end` : `justify-start`}`}
            >
              {msg.position === "left" && (
                <Link
                  to="/perfil"
                  className="size-12 rounded-full mr-2  flex items-center justify-center"
                >
                  <img
                    className="h-full w-full object-cover rounded-full "
                    src={contacts[1].avatar}
                    alt=""
                  />
                </Link>
              )}

              <div
                className={`max-w-[200px] px-4 py-2 rounded-lg ${
                  msg.position === "right"
                    ? "bg-secondary text-white"
                    : "bg-primary text-black"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70">
                  {msg.date.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          <div className="p-4 h-20 w-[70%]   bg-gray-100 z-100 fixed bottom-0 right-0  ">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className={`flex-1 px-4 py-2 shadow-lg inset-shadow-sm rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 block`}
              />
              <button
                onClick={sendMessage}
                className=" p-4 bg-gradient-to-r from-primary to-secondary 
              text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
