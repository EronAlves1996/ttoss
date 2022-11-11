import {
  Flex,
  Grid,
  Icon,
  Label,
  Select,
  Slider,
  Text,
  useTheme,
} from '@ttoss/ui';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'UI/Icon',
  component: Icon,
} as Meta;

const Template: Story = (args) => {
  const icons = [
    'ant-design:down-square-filled',
    'ant-design:up-square-filled',
    'ant-design:arrow-left-outlined',
    'ant-design:arrow-right-outlined',
    args.dynamicIcon,
  ];

  return (
    <Grid columns={3}>
      {icons.map((icon) => {
        return (
          <Flex
            key={icon}
            sx={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <Icon icon={icon} sx={{ fontSize: '40px' }} />
            <Text sx={{ fontSize: '12px' }}>{icon}</Text>
          </Flex>
        );
      })}
    </Grid>
  );
};

export const Example = Template.bind({});

Example.args = {
  dynamicIcon: 'mdi-light:home',
};

const TemplateDynamic: Story = (args) => {
  const { theme } = useTheme();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const colors = Object.keys(theme.rawColors).map((key) => {
    return {
      key,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: theme.rawColors[key] as string,
    };
  });

  const [fontSize, setFontSize] = React.useState(50);
  const [color, setColor] = React.useState(colors[0].value);

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ flexDirection: 'column' }}>
        <Label>Size: {fontSize}px</Label>

        <Slider
          defaultValue={50}
          max={200}
          onChange={(e) => setFontSize(e.target.value as any)}
        />

        <Label>Color</Label>
        <Select onChange={(e) => setColor(e.target.value)}>
          {colors.map(({ key, value }) => (
            <option key={key} value={key as string}>
              {`${key}: ${value}`}
            </option>
          ))}
        </Select>
      </Flex>
      <Icon
        sx={{ fontSize: `${fontSize}px`, color, marginTop: 5 }}
        icon={args.icon}
      />
    </Flex>
  );
};

export const Dynamic = TemplateDynamic.bind({});

Dynamic.args = {
  icon: 'mdi-light:home',
};