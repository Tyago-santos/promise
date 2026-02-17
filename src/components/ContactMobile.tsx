import HeaderPerfil from "./HeaderPerfil";

import { contacts } from "@/api";
import { Link } from "@tanstack/react-router";

type PropsType = {
  media: boolean;
};

export default function ContactMobile({ media }: PropsType) {
  return (
    <main
      className={
        !media ? `w-100 bg-green-blue-400 overflow-y-scroll` : "w-full"
      }
    >
      <HeaderPerfil name="Tiago dos Santos" />
      <div className="h-screen ">
        <h3 className="font-display   font-bold p-4 text-xl">Mensagens</h3>

        {contacts.map((contact, i) => (
          <Link
            to={media ? `/contact/$chat` : `/contact/`}
            key={contact.id}
            from="/contact/"
            params={{ chat: String(i) }}
            className="flex hover:bg-gray-100 p-4 gap-2 border-b border-gray-300"
          >
            <div
              className="rounded-full size-12 flex items-center 
            justify-center  relative  "
            >
              <img
                className="relative z-0 h-full w-full rounded-full object-cover"
                src={contact.avatar}
                alt=""
              />

              {contact.online && (
                <span
                  className="bg-green-500 size-3 absolute top-0 right-0 z-10 
              translate-x-1/4 translate-y-1/4 rounded-full border-white border-2"
                ></span>
              )}
            </div>

            <div>
              <span className="font-bold text-display ">{contact.nome}</span>
              <div>
                <p className="text-text font-sans text-sm w-[200px] text-ellipsis  whitespace-nowrap overflow-hidden">
                  {contact.ultimaMensagem}
                </p>
                <span className="font-fans">{contact.ultimoHorario}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
