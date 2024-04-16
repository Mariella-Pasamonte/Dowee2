function InputLabel({ id, isFilled, classname, children }) {
    return isFilled ? (
        <div id={id} className={classname} >
            {children}
        </div>
    ) : (
        <div id={id} className={classname} >
            {children}
            <div className="flex text-red-400 items-center px-1 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </div>
        </div>
    );
};

export default InputLabel;