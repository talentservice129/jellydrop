import classNames from 'classnames';
import {FC} from 'react';
import {useSelector} from 'react-redux';
import {GAME_PIECES} from '../../../engine/game-player';
import {AppState} from '../../../store/app-store';
import {NextTetrominos} from '../../../store/game/game-model';
import {GameValue} from '../../atoms/game/GameValue';
import {ClassNameProps} from '../../particles/particles.types';
import {DesignDisplay} from '../design/DesignDisplay';

export interface GamePiecesProps {
    label: string;

    reverse?: boolean;

    horizontal?: boolean;

    selectPieces: (state: AppState) => NextTetrominos;
}

export const GamePieces: FC<GamePiecesProps & ClassNameProps> = ({
    label,
    reverse = false,
    horizontal = false,
    selectPieces,
    className
}) => {
    const pieces: NextTetrominos = useSelector(selectPieces);
    return (
        <GameValue label={label} reverse={reverse}>
            <div
                className={classNames(
                    className,
                    'flex relative w-full bg-black',
                    {
                        'flex-col': !horizontal
                    }
                )}
            >
                {pieces.map((type, indx) => (
                    <DesignDisplay
                        key={indx}
                        values={type ? GAME_PIECES[type][0] : undefined}
                        type={type}
                        grid={false}
                        horizontal={horizontal}
                    />
                ))}
            </div>
        </GameValue>
    );
};
