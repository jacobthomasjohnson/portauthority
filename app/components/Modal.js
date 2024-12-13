"use client";

import PropTypes from "prop-types";

const Modal = ({ title, onClose, onConfirm, children, className, style }) => {
      return (
            <>
                  {/* Overlay */}
                  <div
                        className="z-40 bg-black opacity-70 w-full h-full fixed top-0 left-0 transition-all"
                        onClick={onClose} // Close modal on overlay click
                  ></div>

                  {/* Modal Container */}
                  <div
                        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border rounded-xl flex flex-col justify-between overflow-hidden ${className}`}
                        style={style}
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                  >
                        {/* Modal Header */}
                        {title && (
                              <div className="text-sm text-background bg-portblue p-4 border-b">
                                    {title}
                              </div>
                        )}

                        {/* Modal Body */}
                        <div className="p-4 grow w-full">{children}</div>

                        {/* Modal Footer */}
                        <div className="flex gap-2 p-4">
                              <button
                                    className="px-4 py-2 bg-portgray text-white rounded text-sm hover:bg-red-500"
                                    onClick={onClose}
                              >
                                    Cancel
                              </button>
                              <button
                                    className="px-4 py-2 bg-portblue text-background rounded text-sm hover:bg-white"
                                    onClick={onConfirm}
                              >
                                    Confirm
                              </button>
                        </div>
                  </div>
            </>
      );
};

Modal.propTypes = {
      title: PropTypes.string, // Title is optional
      onClose: PropTypes.func.isRequired, // Function to close the modal
      onConfirm: PropTypes.func.isRequired, // Function to confirm the action
      children: PropTypes.node.isRequired, // Content inside the modal
      className: PropTypes.string, // Custom className for additional styling
      style: PropTypes.object, // Inline styles for custom styling
};

Modal.defaultProps = {
      className: "min-w-[800px] min-h-[500px]", // Default modal dimensions
      style: {}, // Empty object for inline styles
};

export default Modal;
