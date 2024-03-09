function Tooltips({ isOpen, children }) {
    return isOpen ? (
        <div role="tooltip" className="absolute font-Inter shadow-md shadow-black/80 top-36 left-36 bg-slate-300 bg-opacity-90 text-slate-700 px-2 py-1">
            <div className="">
                {children}
                <div className="tooltip-arrow" dataPopperArrow></div>
            </div>
        </div>
    ) : null;
};

export default Tooltips;