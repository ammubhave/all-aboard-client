import React from 'react';

export type GameScreenProps = {
    playerName: string,
    onAction(action: any): Promise<void>;
    onBack(): void;
};

export default interface BaseGameScreen<S = {}> extends React.Component<GameScreenProps, S> {
    updateScreen(content: any): void;
}