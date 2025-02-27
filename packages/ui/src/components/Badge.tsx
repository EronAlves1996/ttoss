import { type BadgeProps as BadgePropsUi, Badge as BadgeUi } from 'theme-ui';

import { Icon, IconType } from './Icon';

export type BadgeProps = BadgePropsUi & {
  icon?: IconType;
};

export const Badge = ({ icon, children, sx, ...props }: BadgeProps) => {
  return (
    <BadgeUi
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 'xs',
        ...sx,
      }}
      {...props}
    >
      {icon && <Icon inline icon={icon} />}
      {children}
    </BadgeUi>
  );
};
