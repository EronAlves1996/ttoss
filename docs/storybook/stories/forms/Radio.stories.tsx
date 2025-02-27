import * as yup from 'yup';
import { Button } from '@ttoss/ui';
import { Form, FormFieldRadio } from '@ttoss/forms';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default {
  title: 'Forms/FormFieldRadio',
  component: FormFieldRadio,
} as Meta;

const schema = yup.object({
  car: yup.string().required('Car is required'),
});

const Template: StoryFn = () => {
  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <Form {...formMethods} onSubmit={action('onSubmit')}>
      <FormFieldRadio
        name="car"
        label="What car do you prefer?"
        options={[
          { value: 'Ferrari', label: 'Ferrari' },
          { value: 'Mercedes', label: 'Mercedes' },
          { value: 'BMW', label: 'BMW' },
        ]}
      />

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const Example = Template.bind({});
