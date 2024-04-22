import classNames from 'classnames';
import {FC, useState} from 'react';
import {CgArrowsExpandLeft} from 'react-icons/cg';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {KeyPressed} from '../../particles/nulls/KeyPressed';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';
import {useAppDispatch} from '../../../store/app-store';
import {GameActions} from '../../../store/game/game-actions';

export const GameDot: FC<ClassNameProps> = ({className}) => {
    const [active, setActive] = useState(false);
    const dispatch = useAppDispatch();

    return (
        <>
            <button
                data-testid="game-hold"
                className={classNames(
                    className,
                    'flex w-5 h-5 border-[6px] rounded-full bg-white border-gray-700'
                )}
                onClick={() => {
                    dispatch(GameActions.hold());
                    dispatch(GameActions.tick());
                }}
            />
        </>
    );
};
