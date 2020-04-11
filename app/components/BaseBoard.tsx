import React from 'react';

export type BoardProps = {
    onAction(action: any): Promise<void>;
    onBack(): void;
};

export default interface BaseBoard<S = {}> extends React.Component<BoardProps, S> {
    updateBoard(board: any): void;
}