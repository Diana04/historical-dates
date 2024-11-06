import cn from 'clsx';

import styles from './styles.module.scss';
import { ButtonSize, ButtonType } from './types';

type Props = {
    type?: ButtonType;
    onClick?: () => void;
    icon: React.FC<any>;
    size?: ButtonSize;
    isDisabled?: boolean;
}

export const IconButton = ({ 
    type = ButtonType.OUTLINE,
    onClick = () => {},
    icon: Icon,
    size = ButtonSize.MEDIUM,
    isDisabled = false,
}: Props) => {
    return (
        <button
            className={cn(styles['button'], {
                [styles['button--filled']]: type === ButtonType.FILLED,
                [styles['button--small']]: size === ButtonSize.SMALL,
                [styles['button--disabled']]: isDisabled
            })}
            onClick={onClick}
        >
            <Icon />
        </button>
    );
}
