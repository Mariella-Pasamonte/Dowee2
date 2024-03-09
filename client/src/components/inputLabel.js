function InputLabel({ id, isFilled, classname, children }) {
    return isFilled ? (
        <div id={id} className={classname} >
            {children}
        </div>
    ) : (
        <div id={id} className={classname} >
            {children}
            <div className="flex text-red-400 items-center ps-1 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </div>
        </div>
    );
};

export default InputLabel;