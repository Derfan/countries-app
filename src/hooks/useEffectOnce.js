import { useEffect } from 'react';

export const useEffectOnce = (fn) => {
    useEffect(() => {
        fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
