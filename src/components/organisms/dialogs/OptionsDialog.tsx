import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameSelectors} from '../../../store/game/game-selectors';
import {AppCopyright} from '../../atoms/app/AppCopyright';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {GameOptions} from '../game/GameOptions';
import {AppDarkMode} from '../../molecules/app/AppDarkMode';
import {UiButton} from '../../particles/ui/UiButton';
import {AppActions} from '../../../store/app/app-actions';
import {AppBar, AppBarTool} from '../../atoms/app/AppBar';
import {
    MUSIC_ICON,
    MUSIC_TOOLTIP,
    SOUND_ICON,
    SOUND_TOOLTIP
} from '../../particles/audio.types';
export interface OptionsDialogProps {
    selectWelcoming?: () => boolean;

    selectMusic?: () => boolean;

    selectSound?: () => boolean;
}

export const OptionsDialog: FC<OptionsDialogProps & Partial<AppDialogControl>> =
    ({
        selectMusic = AppSelectors.music,
        selectSound = AppSelectors.sound,
        selectWelcoming = GameSelectors.welcoming,
        selectOpen = AppSelectors.isOpen(AppDialogType.OPTIONS)
        //selectStart = AppSelectors.startLevel
    }) => {
        const welcoming = useSelector(selectWelcoming);
        const music = useSelector(selectMusic);
        const sound = useSelector(selectSound);
        //const startLevel = useSelector(selectStart);
        const tools = useMemo((): AppBarTool[] => {
            return [
                {
                    icon: SOUND_ICON[sound.toString()],
                    toolTip: SOUND_TOOLTIP[sound.toString()],
                    active: sound,
                    action: AppActions.sound()
                },
                {
                    icon: MUSIC_ICON[music.toString()],
                    toolTip: MUSIC_TOOLTIP[music.toString()],
                    active: music,
                    action: AppActions.music()
                }
            ];
        }, [music, sound]);

        return (
            <AppDialog
                className="max-w-[22rem]"
                title="Settings"
                large={true}
                selectOpen={selectOpen}
            >
                <AppBar
                    className="mb-5 !justify-center gap-x-5"
                    tools={tools}
                />
                <GameOptions darkMode={!welcoming} />
            </AppDialog>
        );
    };
