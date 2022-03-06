import { useMemo, useRef } from 'react';

import { Glass } from '../../../../icons';
import { continentsOptions } from '../../../../constants';
import { SelectInput } from '../../../../components';

export const Controls = ({ filter, search, changeHandler }) => {
    const inputField = useRef();
    const options = useMemo(() => [{ label: 'All', value: '' }, ...continentsOptions], []);

    return (
        <div className="flex justify-between flex-col gap-y-5 md:items-center  md:flex-row">
            <div className="flex rounded overflow-hidden shadow-md h-14 transition-shadow hover:shadow-xl md:w-1/2">
                <button className="bg-white dark:bg-dmElements w-16" onClick={() => inputField.current.focus()}>
                    <Glass className="h-4 m-auto fill-emptyInput" />
                </button>
                <input
                    ref={inputField}
                    type="text"
                    name="search"
                    value={search}
                    className="w-full px-3 bg-white dark:bg-dmElements placeholder:text-emptyInput"
                    placeholder="Search for a country..."
                    onChange={(event) => changeHandler(event.target.name, event.target.value)}
                />
            </div>

            <SelectInput
                name="filter"
                value={filter}
                options={options}
                placeholder="Filter By Region"
                onChange={changeHandler}
            />
        </div>
    )
};
