import Image from "next/image";

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
        className="relative bg-white lg:p-16 ambermodal lg:min-w-[48rem] m-4 lg:m-0 p-4 mx-4 w-full lg:w-auto"
      >
      <Image className="absolute top-4 right-4 z-10 cursor-pointer squishy-click" src="/x.svg" alt="Close button" width={24} height={24} onClick={
        onClose
      } />
        {children}
      </div>
    </div>
  );
}
