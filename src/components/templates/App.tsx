import {useMediaQuery} from '@material-ui/core';
import {FC, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../environment/environment';
import {GameSelectors} from '../../store/game/game-selectors';
import {CreditsDialog} from '../organisms/dialogs/CreditsDialog';
import {FinishDialog} from '../organisms/dialogs/FinishDialog';
import {HighScoresDialog} from '../organisms/dialogs/HighScoresDialog';
import {OptionsDialog} from '../organisms/dialogs/OptionsDialog';
import {SettingsDialog} from '../organisms/dialogs/SettingsDialog';
import {PauseDialog} from '../organisms/dialogs/PauseDialog';
import {UiThemeProvider} from '../particles/contexts/UiThemeContext';
import {usePageView} from '../particles/hooks/usePageView';
import {usePersist} from '../particles/hooks/usePersist';
import {useTitle} from '../particles/hooks/useTitle';
import {GameDesktop} from './GameDesktop';
import {GameMobile} from './GameMobile';
import {Welcome} from './Welcome';
import {random} from 'lodash';
import {AppSelectors} from '../../store/app/app-selectors';

export const App: FC = () => {
    const welcoming = useSelector(GameSelectors.welcoming);
    const season = useSelector(AppSelectors.season);
    const isWideScreen = useMediaQuery('(min-width:600px)');
    const isShortScreen = useMediaQuery('(max-height:850px)');
    const isNarrowScreen = useMediaQuery('(max-width:380px)');
    usePageView('/');
    usePersist(environment.storageKey);
    useTitle();

    const game = useMemo(() => {
        return (
            <UiThemeProvider
                transparent={!isWideScreen}
                large={!isWideScreen && !isNarrowScreen}
            >
                {isWideScreen ? (
                    <GameDesktop floatControls={isShortScreen} />
                ) : (
                    <GameMobile />
                )}
            </UiThemeProvider>
        );
    }, [isWideScreen, isShortScreen, isNarrowScreen]);
    // const ran = Object.values(bg);
    // function shuffle<T>(array: T[]): T[] {
    //     let currentindex = array.length,
    //         randomIndex;
    //     while (currentindex != 0) {
    //         randomIndex = Math.floor(Math.random() * currentindex);
    //         currentindex--;

    //         [array[currentindex], array[randomIndex]] = [
    //             array[randomIndex],
    //             array[currentindex]
    //         ];
    //     }
    //     return array;
    // }
    const level = useSelector(GameSelectors.level) as unknown as
        | '10'
        | '20'
        | '30';
    const bg = ['bg-spring', 'bg-summer', 'bg-autumn', 'bg-winter'];
    // const bgValues = Object.values(bg);
    // const [shuffledBg, setShuffledBg] = useState<string | undefined>(
    //     bgValues[0]
    // );
    // const randomBg1 = shuffle(Object.values(bg))[1];
    // const randomBg2 = shuffle(Object.values(bg))[2];

    // useEffect(() => {
    //     const shuffledArray = [...bgValues];
    //     for (let i = shuffledArray.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [shuffledArray[i], shuffledArray[j]] = [
    //             shuffledArray[j],
    //             shuffledArray[i]
    //         ];
    //     }
    //     setShuffledBg(shuffledArray[0]);
    // }, [level]);

    useEffect(() => {
        console.log(level);
    }, [level]);
    return (
        <div className={`flex flex-col w-full h-full ${bg[season]}`}>
            {welcoming ? <Welcome /> : game}
            <PauseDialog />
            <FinishDialog />
            <HighScoresDialog />
            <OptionsDialog />
            <SettingsDialog />
            <CreditsDialog />
        </div>
    );
};
