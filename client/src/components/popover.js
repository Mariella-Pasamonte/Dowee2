function Popover({ isOpen, children }) {
    return isOpen ? (
        <div data-popover id="popover-default" role="tooltip" className="absolute inline-block font-Inter shadow-md shadow-black/80 -top-14 bg-slate-300 bg-opacity-90 text-slate-700 px-2 py-1">
            <div className="">
                {children}
            </div>
            <div data-popper-arrow className=""></div>
        </div>
    ) : null;
};

export default Popover;