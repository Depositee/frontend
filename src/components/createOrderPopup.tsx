export default function CreateOrderPopup({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClose}
      className="w-full h-full absolute z-50 top-0 left-0 backdrop-filter backdrop-brightness-50 justify-center items-center flex"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative bg-white p-16 ambermodal"
      >
        {children}
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
