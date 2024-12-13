"use client";

export const Modal = ({ title, onClose, onConfirm, children }) => {
      return (
            <>
                  {/* Overlay */}
                  <div className="z-40 bg-black opacity-70 w-full h-full top-0 left-0 fixed transition-all"></div>

                  {/* Modal Container */}
                  <div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border rounded-xl flex justify-start items-start flex-col min-w-[800px] min-h-[500px] overflow-hidden gap-4"
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                  >
                        {/* Modal Header */}
                        <div className="text-sm text-background bg-portblue relative top-0 p-4 border-b w-full">
                              {title}
                        </div>

                        {/* Modal Body */}
                        <div className="px-4 w-full">{children}</div>

                        {/* Modal Footer */}
                        <div className="flex gap-2 px-4 mb-4">
                              <button
                                    className="px-4 py-2 bg-portgray text-white rounded text-sm hover:bg-red-500"
                                    onClick={onClose}
                              >
                                    CANCEL
                              </button>
                              <button
                                    className="px-4 py-2 bg-portblue text-background rounded text-sm hover:bg-white"
                                    onClick={onConfirm}
                              >
                                    CONFIRM
                              </button>
                        </div>
                  </div>
            </>
      );
};

export default Modal;
