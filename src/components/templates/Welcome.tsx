import {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../environment/environment';
import {AppActions} from '../../store/app/app-actions';
import {AppDialogType} from '../../store/app/app-model';
import {AppSelectors} from '../../store/app/app-selectors';
import {GameActions} from '../../store/game/game-actions';
import {AppLogo} from '../atoms/app/AppLogo';
import {AppMenu, AppMenuItem} from '../atoms/app/AppMenu';
import {AppDarkMode} from '../molecules/app/AppDarkMode';
import {GameAudio} from '../atoms/game/GameAudio';
import {AUDIO_BG} from '../particles/audio.types';

export interface WelcomeProps {
    selectStart?: () => number;
}

export const Welcome: FC<WelcomeProps> = ({
    selectStart = AppSelectors.startLevel
}) => {
    const startLevel = useSelector(selectStart);
    const music = useSelector(AppSelectors.music);
    const musicVolume = useSelector(AppSelectors.musicVolume);
    const [isSplash, setSplash] = useState(true);

    const menu: Array<AppMenuItem> = useMemo(() => {
        return [
            {
                title: 'New Game',
                action: GameActions.start(startLevel),
                active: true
            },
            {
                title: 'High Scores',
                action: AppActions.open(AppDialogType.HIGH_SCORES)
            },
            {
                title: 'Settings',
                action: AppActions.open(AppDialogType.OPTIONS)
            }
        ];
    }, [startLevel]);

    if (isSplash) {
        return (
            <div className="flex h-full relative splash-bg bg-black opacity-100">
                <button
                    className="focus:outline-none outline-none text-3xl whitespace-nowrap absolute bottom-[15%] left-1/2 transform -translate-x-1/2"
                    onClick={() => {
                        setSplash(false);
                    }}
                >
                    Press here to continue
                </button>
            </div>
        );
    }

    return (
        // Main Screen Background
        <div className="flex flex-col h-full main-bg">
            <div className="mt-auto mb-14 picture"></div>
            <AppMenu className="w-44 ml-auto mr-auto" items={menu} />
            <div className="ml-auto mr-auto mt-5 mb-auto"></div>
            {music && (
                <GameAudio
                    src={AUDIO_BG}
                    volume={musicVolume / 100}
                    loop={true}
                />
            )}
        </div>
    );
};
