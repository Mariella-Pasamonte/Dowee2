function Tooltips(props) {
    return props.isOpen ? (
        <div id={props.id} role="tooltip" className="w-fit absolute z-10 font-Inter shadow-md shadow-black/80 bg-slate-300 tooltip text-slate-700 py-1">
            <div className={props.tooltipArrowClassName} data-popper-arrow></div>
            {props.children}
            
        </div>
    ) : null;
};

export default Tooltips;