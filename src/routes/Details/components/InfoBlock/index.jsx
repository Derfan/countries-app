import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { formatNumber } from '../../../../utils';

const List = ({ entries }) => (
    <ul className="flex flex-col gap-y-2">
        {entries.map(([title, value]) => (
            <li key={title}>
                <p><b>{title}:</b> {value}</p>
            </li>
        ))}
    </ul>
);

export const InfoBlock = ({
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
}) => {
    const navigate = useNavigate();

    const handleBorderCountryClick = (countryCode) => (event) => {
        event.preventDefault();

        navigate(`/${countryCode.toLowerCase()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="flex flex-col flex-1 gap-7">
            <h2 className="text-3xl font-extrabold">{name}</h2>

            <div className="flex flex-col gap-7 md:flex-row md:justify-between">
                <List
                    entries={[
                        ['Native Name', nativeName],
                        ['Population', formatNumber(population)],
                        ['Region', region],
                        ['Sub Region', subregion],
                        ['Capital', capital],
                    ]}
                />

                <List
                    entries={[
                        ['Top Level Domain', topLevelDomain.join(', ')],
                        ['Currencies', currencies.join(', ')],
                        ['Languages', languages.join(', ')],
                    ]}
                />
            </div>

            {borders.length
                ? (
                    <div>
                        <div className="flex flex-col">
                            <b>Border Countries:</b>
                            <ul className="inline-flex flex-wrap gap-2">
                                {borders.map(border => (
                                    <li
                                        key={border.name}
                                        className="cursor-pointer inline-block shadow-md py-1 px-3 hover:shadow-lg bg-white dark:bg-dmElements"
                                        onClick={handleBorderCountryClick(border.countryCode)}
                                    >
                                        {border.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
                : null}
        </section>
    )
};

InfoBlock.propTypes = {
    name: PropTypes.string.isRequired,
    nativeName: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    topLevelDomain: PropTypes.arrayOf(PropTypes.string).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    borders: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
    })).isRequired,
};
