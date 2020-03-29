import React from 'react';

export type HandProps = {
    onAction(action: any): Promise<void>;
    onHome(): void;
};

export default interface BaseHand<S = {}> extends React.Component<HandProps, S> {
    updateHand(hand: any): void;
}