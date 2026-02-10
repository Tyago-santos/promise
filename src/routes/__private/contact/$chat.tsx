import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { contacts } from "@/api";

import HeaderPerfil from "@/components/HeaderPerfil";

type Msg = {
  id: string;
  text: string;
  position: "left" | "right";
  date: Date;
};

export const Route = createFileRoute("/__private/contact/$chat")({
  component: Chat,
});

export default function Chat() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const { chat } = Route.useParams();
  const chatId = Number(chat);

  const [messages, setMessages] = useState<Msg[]>(contacts[chat].mensagens);
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

    console.log(messages);
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

  return (
    <div className="flex  flex-col h-screen bg-gray-100">
      <HeaderPerfil name={contacts[chat].nome} />

      <div className="px-4 py-2 text-xs text-gray-500"></div>

      <div
        ref={bottomRef}
        className="flex-1 overflow-y-auto pb-50 z-0  p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.position === `right` ? `justify-end` : `justify-start`}`}
          >
            {msg.position === "left" && (
              <img
                className="max-h-10 max-w-10 object-cove rounded-full mr-2"
                src={contacts[chatId].avatar}
                alt=""
              />
            )}

            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.position === "right"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70">
                {msg.date.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          transform: open ? "translateY(-250px)" : "translateY(0px)",
        }}
        className="p-4 h-20 w-full  bg-gray-100 z-100 absolute bottom-0 left-0 right-0 "
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className={
              open
                ? `flex-1 px-4 py-2 shadow-lg inset-shadow-sm rounded-lg 
                focus:outline-none transform duration-300  translateY(-400px) 
                focus:ring-2 focus:ring-blue-500 transition-transform`
                : `flex-1 px-4 py-2 shadow-lg inset-shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`
            }
          />
          <button
            onClick={sendMessage}
            className=" p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
