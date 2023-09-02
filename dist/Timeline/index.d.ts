import { FC } from 'react';
import './index.css';
interface TimelineProps {
    data: object[];
    barHeight?: number;
    barTitleWidth?: number;
    colors?: [];
    margin?: number;
    onClick?: () => {};
}
declare const Timeline: FC<TimelineProps>;
export default Timeline;
