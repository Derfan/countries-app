import { useMemo, useRef } from 'react';

import { Glass } from '../../../../icons';
import { continentsOptions } from '../../../../constants';
import { SelectInput } from '../../../../components';

export const Controls = ({ filter, search, changeHandler }) => {
    const inputField = useRef();
    const options = useMemo(() => [{ label: 'All', value: '' }, ...continentsOptions], []);

    return (
        <div className="flex justify-between flex-col gap-y-5 md:items-center  md:flex-row">
            <div className="relative w-full md:w-1/2">
                <Glass className="absolute inset-y-1/2 left-8 h-4 m-auto fill-emptyInput" />

                <input
                    ref={inputField}
                    type="text"
                    name="search"
                    value={search}
                    className="rounded w-full h-14 pl-20 pr-3 bg-white dark:bg-dmElements transition-shadow shadow-md hover:shadow-xl placeholder:text-emptyInput"
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
