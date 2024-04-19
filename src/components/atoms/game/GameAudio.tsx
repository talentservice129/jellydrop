import {FC, RefObject, useEffect, useRef} from 'react';

export interface GameAudioProps {
    autoPlay?: boolean;

    loop?: boolean;

    muted?: boolean;

    onDone?: (ref?: RefObject<HTMLAudioElement>) => void;

    onLoaded?: () => void;

    src: string;

    volume?: number;
}

export const GameAudio: FC<GameAudioProps> = ({
    autoPlay = true,
    loop,
    muted,
    onDone,
    onLoaded,
    src,
    volume
}) => {
    const ref = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (volume) {
            ref.current!.volume = volume;
        }
    }, [ref, volume]);

    return (
        <audio
            muted={muted}
            src={src}
            ref={ref}
            autoPlay={autoPlay}
            controls={false}
            loop={Boolean(loop)}
            onEnded={() => onDone && onDone(ref)}
            onCanPlayThrough={() => onLoaded && onLoaded()}
        />
    );
};
