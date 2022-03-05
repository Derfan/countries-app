import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Glass } from '../../../../icons';
import { continentsOptions } from '../../../../constants';
import { SelectInput } from '../../../../components';

export const Controls = ({ onSearch, onFilter }) => {
    const inputField = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const handlersByType = { search: onSearch, filter: onFilter };

    const handleButtonClick = () => inputField.current.focus();
    const handler = (name, value) => {
        const changeHandler = handlersByType[name];
        const params = Object.fromEntries([...searchParams]);

        setSearchParams({ ...params, search: value });
        changeHandler(value);
    };

    return (
        <div className="flex justify-between flex-col gap-y-5 md:items-center  md:flex-row">
            <div className="flex rounded overflow-hidden shadow-md h-14 transition-shadow hover:shadow-xl md:w-1/2">
                <button className="bg-white dark:bg-dmElements w-16" onClick={handleButtonClick}>
                    <Glass className="h-4 m-auto fill-emptyInput" />
                </button>
                <input
                    ref={inputField}
                    type="text"
                    name="search"
                    className="w-full px-3 bg-white dark:bg-dmElements placeholder:text-emptyInput"
                    placeholder="Search for a country..."
                    onChange={(event) => handler(event.target.name, event.target.value)}
                />
            </div>

            <SelectInput
                name="filter"
                value=""
                options={[{ label: 'All', value: '' }, ...continentsOptions]}
                placeholder="Filter By Region"
                onChange={handler}
            />
        </div>
    )
};
