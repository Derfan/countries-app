import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CONTINENTS } from '../../../../constants';
import { formatNumber } from '../../../../utils';

export const ItemCard = ({ alpha3Code, flag, name, capital, population, region }) => (
    <li className="shadow-md rounded bg-white dark:bg-dmElements dark:text-white overflow-hidden transition-shadow hover:shadow-xl">
        <Link to={`/${alpha3Code.toLowerCase()}`}>
            <div
                className="h-40 w-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${flag})` }}
            />

            <div className="px-5 py-6">
                <h2 className="text-lg font-extrabold mb-3">{name}</h2>

                <p className="text-sm">
                    <span className="font-semibold">Population:</span> {formatNumber(population)}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Region:</span> {region}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Capital:</span> {capital}
                </p>
            </div>
        </Link>
    </li>
);

ItemCard.defaultProps = {
    capital: 'N/A',
};

ItemCard.propTypes = {
    alpha3Code: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.oneOf(CONTINENTS).isRequired,
    capital: PropTypes.string,
};
