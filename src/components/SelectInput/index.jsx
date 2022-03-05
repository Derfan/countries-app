import { useState } from 'react';

export const SelectInput = ({ name, value, options, placeholder, onChange }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    const onLabelClick = (event) => {
        event.preventDefault();

        setIsOpen(prevValue => !prevValue);
    };
    const changeHandler = (name, { label, value }) => {
        setCurrentValue(value ? label : "");
        onChange(name, value);
        setIsOpen(false);
    }

    return (
        <div className="relative" tabIndex="0" onBlur={() => setIsOpen(false)}>
            <div
                className="flex items-center cursor-pointer rounded overflow-hidden shadow-md h-14 w-48 px-5 bg-white dark:bg-dmElements transition-shadow hover:shadow-xl"
                onClick={onLabelClick}
            >
                {currentValue || <span className="text-emptyInput">{placeholder}</span>}
            </div>

            {isOpen && (
                <ul
                    className="absolute py-3 left-0 right-0 rounded shadow-md bg-white dark:bg-dmElements"
                    style={{ top: "calc(100% + 5px)" }}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="cursor-pointer px-5 py-1 transition-colors hover:bg-lmElementsHover dark:hover:bg-dmElementsHover"
                            onClick={() => changeHandler(name, option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
