import { FieldPath, FieldValues } from 'react-hook-form';
import { FormField } from './FormField';
import { Textarea, type TextareaProps } from '@ttoss/ui';

export const FormFieldTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  name,
  ...textareaProps
}: {
  label?: string;
  name: TName;
} & TextareaProps) => {
  const id = `form-field-textarea-${name}`;

  return (
    <FormField
      label={label}
      name={name}
      id={id}
      render={({ field }) => {
        return <Textarea {...field} {...textareaProps} />;
      }}
    />
  );
};
