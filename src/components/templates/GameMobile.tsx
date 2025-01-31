import {VFC} from 'react';
import classNames from 'classnames';
import {GameSelectors} from '../../store/game/game-selectors';
import {GamePieces} from '../molecules/game/GamePieces';
import {GameControls} from '../organisms/game/GameControls';
import {GameEngine} from '../organisms/game/GameEngine';
import {GameNumbers} from '../organisms/game/GameNumbers';
import {usePageView} from '../particles/hooks/usePageView';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../store/app/app-selectors';
import {useAppDispatch} from '../../store/app-store';
import {GameHold} from '../atoms/game/GameHold';
import {GameActions} from '../../store/game/game-actions';
import {GameSettings} from '../atoms/game/GameSettings';

export const GameMobile: VFC = () => {
    usePageView('/game/mobile');
    const Swipe = useSelector(AppSelectors.Swipe);
    const hand = useSelector(AppSelectors.hand);
    const {hold} = useSelector(AppSelectors.keys);
    const holdEnabled = useSelector(GameSelectors.holdEnabled);
    const enabled = useSelector(GameSelectors.running);
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col h-full justify-evenly p-4">
            <GameNumbers className="mx-auto gap-2" reverse={true} />
            <div
                className={classNames('border-gray-700 w-full', {
                    'flex justify-between': Swipe === 'on',
                    'grid gap-4': Swipe !== 'on'
                })}
                style={
                    Swipe !== 'on' ? {gridTemplateColumns: '1fr 4.4fr 1fr'} : {}
                }
            >
                <div
                    className={classNames('flex flex-col', {
                        'mt-4': Swipe !== 'on',
                        'w-1/4': Swipe === 'on'
                    })}
                >
                    <GamePieces
                        className="p-1"
                        label="Hold"
                        reverse={true}
                        selectPieces={GameSelectors.hold}
                    />
                </div>
                {Swipe !== 'on' && <GameEngine />}
                <div
                    className={classNames('flex flex-col', {
                        'mt-4': Swipe !== 'on',
                        'w-[70%]': Swipe === 'on'
                    })}
                >
                    <GamePieces
                        className="p-1"
                        label="Next"
                        reverse={true}
                        horizontal={Swipe === 'on'}
                        selectPieces={GameSelectors.next}
                    />
                </div>
            </div>
            {Swipe === 'on' && (
                <div className="flex">
                    <div className="w-1/6 flex flex-col justify-center items-center">
                        {hand === 'right' && (
                            <>
                                <GameHold
                                    className="mb-2.5"
                                    keyCode={hold}
                                    disabled={!enabled || !holdEnabled}
                                    onHold={() => {
                                        dispatch(GameActions.hold());
                                        dispatch(GameActions.tick());
                                    }}
                                />
                                <GameSettings className="" />
                            </>
                        )}
                    </div>
                    <div className="w-2/3 mx-auto">
                        <GameEngine />
                    </div>
                    <div className="w-1/6 flex flex-col justify-center items-center">
                        {hand === 'left' && (
                            <>
                                <GameHold
                                    className="mb-2.5"
                                    keyCode={hold}
                                    disabled={!enabled || !holdEnabled}
                                    onHold={() => {
                                        dispatch(GameActions.hold());
                                        dispatch(GameActions.tick());
                                    }}
                                />
                                <GameSettings className="" />
                            </>
                        )}
                    </div>
                </div>
            )}
            {Swipe !== 'on' && (
                <div className="flex">
                    <GameControls className="w-full" transparent={true} />
                </div>
            )}
        </div>
    );
};
