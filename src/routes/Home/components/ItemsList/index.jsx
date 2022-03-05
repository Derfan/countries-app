import { ItemCard } from '../ItemCard';

export const ItemsList = ({ entities }) => (
    <ul className="grid gap-5 md:grid-cols-2 md:gap-20 lg:grid-cols-3 xl:grid-cols-4">
        {entities?.map(item => (
            <ItemCard
                key={item.name}
                {...item}
            />
        ))}
    </ul>
);
