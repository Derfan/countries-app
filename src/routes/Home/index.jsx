import { memo, useEffect } from 'react';

import { useEffectOnce } from '../../hooks';
import { Layout } from '../../components';
import { Controls, ItemsList } from './components';
import { useCountriesList, useControls } from './hooks';

export const Home = memo(() => {
    const { data, fetchData, applyFilters } = useCountriesList();
    const { values, changeHandler } = useControls();

    const handleControlValueChange = (name, value) => {
        changeHandler(name, value);
    };

    useEffectOnce(() => fetchData({ filters: values }));
    useEffect(() => {
        applyFilters(values);
    }, [values, applyFilters]);

    return (
        <Layout>
            <Controls {...values} changeHandler={handleControlValueChange} />

            {data && <ItemsList entities={data} />}
        </Layout>
    );
});
