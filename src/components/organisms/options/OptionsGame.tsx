import React, {FC, useCallback} from 'react';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppSelectors} from '../../../store/app/app-selectors';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';
import {GameControls} from '../game/GameControls';
import leftHand from '../../../left.jpeg';
import rightHand from '../../../right.jpeg';
import swipe from '../../../swipe.jpeg';
import buttons from '../../../buttons.jpeg';
import classNames from 'classnames';
import {Box} from '@material-ui/core';

export const OptionsGame: FC = () => {
    const ghostPiece = useSelector(AppSelectors.ghostPiece);
    const hand = useSelector(AppSelectors.hand);
    const Swipe = useSelector(AppSelectors.Swipe);
    const dispatch = useAppDispatch();

    // Define callback functions for left-hand and right-hand button clicks
    const toggleHand = useCallback(() => {
        dispatch(AppActions.hand(hand === 'left' ? 'right' : 'left'));
    }, [hand, dispatch]);
    const toggleSwipe = useCallback(() => {
        dispatch(AppActions.Swipe(Swipe === 'on' ? 'off' : 'on'));
    }, [Swipe, dispatch]);

    return (
        <>
            {/* <div>Ghost Piece</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={ghostPiece}
                onClick={() => dispatch(AppActions.ghostPiece())}
            >
                {ghostPiece ? <FaCheck /> : <FaTimes />}
            </UiButton> */}
            <div className="text-black">Hand Preference:</div>
            <div className="grid grid-cols-2 grid-col gap-2 w-full mt-2">
                <Box style={{display: 'flex', flexDirection: 'column'}}>
                    <UiButton
                        style={{background: 'transparent'}}
                        className={classNames(
                            'flex !border-4 justify-center !rounded-none mb-1',
                            {
                                '!border-[rgb(238,79,186)]': hand === 'right',
                                '!border-transparent': hand !== 'right'
                            }
                        )}
                        active={hand === 'right'}
                        onClick={toggleHand}
                    >
                        <img
                            className="h-full w-full object-cover"
                            src={rightHand}
                            alt="Right Hand"
                            width={681}
                            height={1280}
                        />
                    </UiButton>
                    <div className="text-center text-sm">Right Hand</div>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'column'}}>
                    <UiButton
                        style={{background: 'transparent'}}
                        className={classNames(
                            'flex !border-4 justify-center !rounded-none !bg-[transparent] mb-1',
                            {
                                '!border-[rgb(238,79,186)]': hand === 'left',
                                '!border-transparent': hand !== 'left'
                            }
                        )}
                        active={hand === 'left'}
                        onClick={toggleHand}
                    >
                        <img
                            className="h-full w-full object-cover"
                            src={leftHand}
                            alt="Left Hand"
                            width={681}
                            height={1280}
                        />
                    </UiButton>
                    <div className="text-center text-sm">Left Hand</div>
                </Box>
            </div>
            {/* <GameControls Click={toggleHand} // Pass the left-hand click callback
            /> */}
            {/* <div>Right Hand</div> */}
            {/* <GameControls
                onRightHandClick={handleRightHandClick} // Pass the right-hand click callback
            /> */}
            <div className="text-black mt-2.5">Interaction Mode:</div>
            <div className="grid grid-cols-2 grid-col gap-2 w-full mt-2">
                <Box style={{display: 'flex', flexDirection: 'column'}}>
                    <UiButton
                        style={{background: 'transparent'}}
                        className={classNames(
                            'flex !border-4 justify-center !rounded-none mb-1',
                            {
                                '!border-[rgb(238,79,186)]': Swipe === 'on',
                                '!border-transparent': Swipe !== 'on'
                            }
                        )}
                        active={Swipe === 'on'}
                        onClick={toggleSwipe}
                    >
                        <img
                            className="h-full w-full object-cover"
                            src={swipe}
                            alt="Swipe"
                            width={681}
                            height={1280}
                        />
                    </UiButton>
                    <div className="text-center text-sm">Swipe</div>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'column'}}>
                    <UiButton
                        style={{background: 'transparent'}}
                        className={classNames(
                            'flex !border-4 justify-center !rounded-none !bg-[transparent] mb-1',
                            {
                                '!border-[rgb(238,79,186)]': Swipe === 'off',
                                '!border-transparent': Swipe !== 'off'
                            }
                        )}
                        active={Swipe === 'off'}
                        onClick={toggleSwipe}
                    >
                        <img
                            className="h-full w-full object-cover"
                            src={buttons}
                            alt="Buttons"
                            width={681}
                            height={1280}
                        />
                    </UiButton>
                    <div className="text-center text-sm">Buttons</div>
                </Box>
            </div>
            {/* <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={Swipe === 'on'}
                onClick={toggleSwipe}
            >
                {Swipe === 'on' ? <FaCheck /> : <FaTimes />}
            </UiButton> */}
            {/* <div>D-Pad</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={Swipe === 'off'}
                onClick={toggleSwipe}
            >
                {Swipe === 'off' ? <FaCheck /> : <FaTimes />}
            </UiButton> */}
        </>
    );
};
