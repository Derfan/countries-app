import { useMemo, useState } from 'react';

export const SelectInput = ({ name, value, options, placeholder, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const label = useMemo(
        () => value 
            ? options.find(option => option.value === value).label
            : null,
        [options, value],
    );

    const onLabelClick = (event) => {
        event.preventDefault();

        setIsOpen(prevValue => !prevValue);
    };
    const onOptionClick = (name, value) => {
        onChange(name, value);
        setIsOpen(false);
    }

    return (
        <div className="relative" tabIndex="0" onBlur={() => setIsOpen(false)}>
            <div
                className="flex items-center cursor-pointer rounded overflow-hidden shadow-md h-14 w-48 px-5 bg-white dark:bg-dmElements transition-shadow hover:shadow-xl"
                onClick={onLabelClick}
            >
                {label || <span className="text-emptyInput">{placeholder}</span>}
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
                            onClick={() => onOptionClick(name, option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
