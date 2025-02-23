import { Box, Input, type InputProps, Label, type LabelProps } from '@ttoss/ui';
import { ErrorMessage } from './ErrorMessage';
import { FieldPath, FieldValues, useController } from 'react-hook-form';

export const FormFieldInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  name,
  tooltip,
  onTooltipClick,
  ...inputProps
}: {
  label?: string;
  name: TName;
} & InputProps &
  Pick<LabelProps, 'tooltip' | 'onTooltipClick'>) => {
  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors },
  } = useController<any>({
    name,
    defaultValue: '',
  });

  const id = `form-field-input-${name}`;

  const hasError = !!errors[name]?.message;

  return (
    <Box>
      {label && (
        <Label
          aria-disabled={inputProps.disabled}
          htmlFor={id}
          tooltip={tooltip}
          onTooltipClick={onTooltipClick}
        >
          {label}
        </Label>
      )}

      <Input
        ref={ref}
        onChange={onChange}
        className={hasError ? 'error' : ''}
        onBlur={onBlur}
        value={value}
        name={name}
        id={id}
        {...inputProps}
      />

      <ErrorMessage name={name} />
    </Box>
  );
};
