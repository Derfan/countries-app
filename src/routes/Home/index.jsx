import { memo, useEffect } from 'react';

import { Layout } from '../../components';
import { Controls, ItemsList } from './components';
import { useCountriesList } from './hooks';

export const Home = memo(() => {
    const { data, fetchData, handleSearch, handleFilter } = useCountriesList();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <Controls
                onSearch={handleSearch}
                onFilter={handleFilter}
            />

            {data && (
                <ItemsList
                    entities={data}
                />
            )}
        </Layout>
    );
});
