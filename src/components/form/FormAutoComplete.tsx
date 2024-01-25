import React, { HTMLAttributes, useEffect, useState } from "react";

import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderOptionState,
  Popper,
  TextField,
  Typography,
  autocompleteClasses,
  styled,
} from "@mui/material";

import { Controller, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ListChildComponentProps, VariableSizeList } from "react-window";

import { onlyUnique } from "src/utils/array";

export { FormAutoComplete };

export type { FormAutoCompleteProps };

type FormAutoCompleteProps<OptionType> = Omit<
  AutocompleteProps<OptionType, boolean, undefined, undefined>,
  "renderInput" | "options" | "multiple"
> & {
  name: string;
  label: string;
  options: OptionType[];
  labelExtractor: (item: OptionType) => string;
  valueExtractor: (item: OptionType) => string | number;
  multiple?: boolean;
  virtualized?: boolean;
};

const LISTBOX_PADDING = 8;

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {`${data[index][0].key}`}
    </Typography>
  );
}

const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent({ children, ...props }, ref) {
  const itemData = children as React.ReactElement[];
  const itemCount = itemData.length;
  const itemSize = 40;

  const getHeight = () => {
    if (itemCount > 6) {
      return 6 * itemSize;
    }
    return itemCount * itemSize;
  };

  return (
    <VariableSizeList
      itemData={itemData}
      height={getHeight() + 2 * LISTBOX_PADDING}
      width="100%"
      outerElementType={(otherProps) => {
        return <div ref={ref} {...otherProps} {...props} />;
      }}
      innerElementType="ul"
      itemSize={() => itemSize}
      overscanCount={10}
      itemCount={itemCount}
    >
      {renderRow}
    </VariableSizeList>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

/**
 * FormAutoComplete Component
 *
 * A customizable React component that wraps the Material-UI Autocomplete
 * component and integrates with the React Hook Form library. It provides
 * enhanced features such as virtualization for large datasets.
 * Accepts all props from the MUI Autocomplete component
 *
 *
 *
 * @param  name - The name/path to the form field value in the React Hook Form.
 * @param  label - The label for the Autocomplete component.
 * @param  valueExtractor - A function to extract the value from the option.
 * @param  labelExtractor - A function to extract the label from the option.
 * @param  options - An array of options for the Autocomplete component.
 * @param  [multiple=false] - If true, allows selecting multiple options.
 * @param  [virtualized=false] - If true, enables virtualization for large datasets.
 * @param  [...AutocompleteProps] - Other AutocompleteProps.
 *
 * @see https://mui.com/components/autocomplete/
 * @see https://mui.com/components/autocomplete/#virtualization
 *
 * @component
 * @example
 * ```tsx
 * <FormAutoComplete
 *   name="example"
 *   label="Example Field"
 *   valueExtractor={(item) => item.id}
 *   labelExtractor={(item) => item.name}
 *   options={yourOptionsArray}
 *   multiple={false}
 *   virtualized={true}
 *   // ...other AutocompleteProps
 * />
 * ```
 *
 */
function FormAutoComplete<OptionType>({
  name,
  label,
  options,
  valueExtractor,
  labelExtractor,
  multiple = false,
  virtualized = false,
  ...props
}: FormAutoCompleteProps<OptionType>): React.ReactElement {
  const [inputValue, setInputValue] = useState("");
  const controller = useController({ name: name });
  const { t } = useTranslation();

  useEffect(() => {
    if (!multiple) {
      const option = options.find(
        (o) => valueExtractor(o) === controller.field.value,
      );
      if (option) {
        setInputValue(labelExtractor(option));
      }
    }
  }, [controller.field.value]);

  function getLabel(value: string | number): string {
    const option = options.find((o) => valueExtractor(o) === value);
    return option ? labelExtractor(option) : "";
  }

  function getOptionLabel(value: string | number | OptionType): string {
    if (typeof value === "string" || typeof value === "number") {
      return getLabel(value);
      // return t(getLabel(value));
    } else {
      return labelExtractor(value);
      // return t(labelExtractor(value));
    }
  }

  const virtualizedProps = {
    PopperComponent: StyledPopper,
    ListboxComponent: ListboxComponent,
    renderOption: (
      props: HTMLAttributes<HTMLLIElement>,
      option: OptionType,
      state: AutocompleteRenderOptionState,
    ) => [props, option, state.index] as React.ReactNode,
  };

  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => {
        return (
          <Autocomplete
            multiple={multiple}
            onChange={(
              _e,
              value: OptionType | (OptionType | string | number)[] | null,
              _reason,
            ) => {
              if (multiple) {
                const options = value as OptionType[];
                const newValue = options.map((o) => {
                  if (typeof o === "string" || typeof o === "number") {
                    return o;
                  } else {
                    return valueExtractor(o);
                  }
                });

                onChange(onlyUnique(newValue));
                setInputValue("");
              } else {
                const option = value as OptionType;
                if (option == null) {
                  onChange(undefined);
                  setInputValue("");
                } else {
                  onChange(valueExtractor(option));
                  setInputValue(labelExtractor(option));
                }
              }
            }}
            onBlur={() => {
              if (value == undefined) {
                setInputValue("");
              } else {
                setInputValue(multiple ? "" : getLabel(value));
              }
              onBlur();
            }}
            value={value}
            isOptionEqualToValue={(option, value) => {
              return valueExtractor(option) === value;
            }}
            options={options}
            getOptionLabel={getOptionLabel}
            inputValue={inputValue}
            onInputChange={(_e, newInputValue, reason) => {
              if (reason === "input") {
                setInputValue(newInputValue);
              }
            }}
            {...(virtualized ? virtualizedProps : {})}
            {...props}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t(label)}
                variant={"filled"}
                error={fieldState.invalid}
                helperText={fieldState.invalid && fieldState.error?.message}
              />
            )}
          />
        );
      }}
    />
  );
}
