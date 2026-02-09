import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

type Msg = {
  text: string;
  position: "left" | "right";
  date: Date;
};

export const Route = createFileRoute("/__private/contact/$chat")({
  component: Chat,
});

export default function Chat() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "1",
      text: "Oi!",
      position: "left",
      date: new Date(),
    },
  ]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function sendMessage() {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
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

  return (
    <div className="flex  flex-col h-screen bg-gray-100">
      <div
        ref={bottomRef}
        className="flex-1 overflow-y-auto pb-50  p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.position === `right` ? `justify-end` : `justify-start`}`}
          >
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

      <div className="p-4 h-20 w-full bg-white absolute bottom-0 left-0 right-0 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className=" py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
