export function ContactForm() {
  return (
    <div className="flex flex-col justify-center items-center bg-button p-5 rounded m-2 h-full">
      <form className="flex flex-col gap-5 flex-none" action="">
        <div className="flex flex-col justify-start items-center gap-2 box-content">
          <label
            className="font-cinzel tracking-wide text-lg font-semibold"
            htmlFor="name"
          >
            Nombre y Apellido
          </label>
          <input className="w-full h-8 rounded" type="text" name="name" />
        </div>
        <div className="flex flex-col justify-start items-center gap-2 box-content">
          <label
            className="font-cinzel tracking-wide text-lg font-semibold"
            htmlFor="message"
          >
            Mensaje
          </label>
          <textarea className="w-full rounded" name="message"></textarea>
        </div>
        <div>
          <button className="bg-secondary px-4 py-2 w-full rounded font-playfair">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
