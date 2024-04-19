import {FC, RefObject} from 'react';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameAudio} from '../../atoms/game/GameAudio';
import {AUDIO_FILES} from '../../particles/audio.types';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';

export const GameMusic: FC = () => {
    const music = useSelector(AppSelectors.music);
    const musicVolume = useSelector(AppSelectors.musicVolume);
    const season = useSelector(AppSelectors.season);
    const dispatch = useAppDispatch();

    const onNextSeason = (ref?: RefObject<HTMLAudioElement>) => {
        dispatch(AppActions.nextSeason());
        ref && ref.current!.play();
    };

    return (
        <>
            <GameAudio
                src={AUDIO_FILES[season]}
                volume={musicVolume / 100}
                muted={!music}
                onDone={onNextSeason}
            />
        </>
    );
};
