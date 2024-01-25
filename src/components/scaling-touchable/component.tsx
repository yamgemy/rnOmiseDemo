
import {useReanimatedTouchScale} from '@animations';
import React, {FC, useMemo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Animated from 'react-native-reanimated';

type ScalingTouchableProps = {
    animatedWrapStyle?: any,
    children?: React.ReactElement,
    onPress: () => void,
    reducedScale?: number,
    activeOpacity?: number
    hitSlopSize?: 'large' | 'medium' | 'xlarge' | 'none'
};

const MID_HITSLOP = {top: 10, left: 10, right: 10, bottom: 10};
const LARGE_HITSLOP = {top: 20, left: 20, right: 20, bottom: 20};
const XLARGE_HITSLOP = {top: 30, left: 30, right: 30, bottom: 30};

export const ScalingTouchable: FC<ScalingTouchableProps & TouchableOpacityProps> = ({
    reducedScale,
    activeOpacity = 1,
    animatedWrapStyle,
    children,
    onPress,
    hitSlopSize,
    ...rest
}) => {
    const {reanimatedTouchScale,
        executeResumeOriginalScale,
        executeReduceScale} = useReanimatedTouchScale(reducedScale);

    const getHitSlop = useMemo(() => {
        if (hitSlopSize === 'large') { return LARGE_HITSLOP; }
        if (hitSlopSize === 'xlarge') { return XLARGE_HITSLOP; }
        if (hitSlopSize === 'medium') { return MID_HITSLOP; }
        return {};
    }, [hitSlopSize]);

    return (
        <Animated.View style={[reanimatedTouchScale, animatedWrapStyle]}>
            <TouchableOpacity
                activeOpacity={activeOpacity}
                {...rest}
                hitSlop={getHitSlop}
                onPress={onPress || undefined}
                onPressIn={executeReduceScale}
                onPressOut={executeResumeOriginalScale}
            >
                {children}
            </TouchableOpacity>
        </Animated.View>
    );
};
