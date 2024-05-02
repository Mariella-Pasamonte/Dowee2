function Tooltips(props) {
    return props.isOpen ? (
        <div id={props.id} role="tooltip" className="w-fit px-2 absolute z-10 font-Inter shadow-md rounded-md border-[1px] shadow-black/80 tooltip bg-white/10 text-white py-1 backdrop-blur-md">
            {props.children}
        </div>
    ) : null;
};

export default Tooltips;