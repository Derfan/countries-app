import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from '../../../../icons';

export const Controls = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button
                className="flex items-center gap-3 rounded px-8 py-3 shadow-md transition-shadow bg-white dark:bg-dmElements hover:shadow-lg"
                onClick={() => navigate('/')}
            >
                <ArrowLeft className="h-4 dark:fill-white" />
                <span>Back</span>
            </button>
        </div>
    )
};
