import React, {useId} from "react";
import "./index.css";

function Select({options, label, classname, ...props}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className=""></label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 border duration-200 border-gray-200 w-full ${classname}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

// anothe way to use forwardRef hook
export default React.forwardRef(Select);
