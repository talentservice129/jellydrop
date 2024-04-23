import {VFC} from 'react';
import {GameSelectors} from '../../store/game/game-selectors';
import {GamePieces} from '../molecules/game/GamePieces';
import {GameControls} from '../organisms/game/GameControls';
import {GameEngine} from '../organisms/game/GameEngine';
import {GameNumbers} from '../organisms/game/GameNumbers';
import {usePageView} from '../particles/hooks/usePageView';
import {GameDot} from '../atoms/game/GameDot';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../store/app/app-selectors';

export const GameMobile: VFC = () => {
    usePageView('/game/mobile');
    const Swipe = useSelector(AppSelectors.Swipe);

    return (
        <div className="flex flex-col p-4">
            <GameNumbers className="mx-auto gap-2" reverse={true} />
            <div className="flex justify-between w-full border-gray-700">
                <div className="flex flex-col w-1/4">
                    <GamePieces
                        className="p-1"
                        label="Hold"
                        reverse={true}
                        selectPieces={GameSelectors.hold}
                    />
                </div>
                <div className="flex flex-col w-[70%]">
                    <GamePieces
                        className="p-1"
                        label="Next"
                        reverse={true}
                        horizontal={true}
                        selectPieces={GameSelectors.next}
                    />
                </div>
            </div>
            <div className="flex">
                {Swipe && (
                    <div className="w-1/6 flex justify-center items-center">
                        <GameDot />
                    </div>
                )}
                <div className="w-2/3 mx-auto">
                    <GameEngine />
                </div>
                {Swipe && (
                    <div className="w-1/6 flex justify-center items-center">
                        <GameDot />
                    </div>
                )}
            </div>
            <div className="flex absolute bottom-14 left-4 right-4">
                <GameControls className="w-full" transparent={true} />
            </div>
        </div>
    );
};
