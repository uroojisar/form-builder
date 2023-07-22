import { FormlyFieldConfig } from '@ngx-formly/core';

export type WidgetInputType =
  | 'Text'
  | 'Number'
  | 'DatePicker'
  | 'Radio'
  | 'Checkbox'
  | 'Email'
  | 'Group';

export type WidgetConfig =  FormlyFieldConfig & {
  name: WidgetInputType;
  icon: string;
  temp: boolean;
  fieldGroup?: WidgetConfig[];
};

export const widgetFormInputText: WidgetConfig = {
  name: 'Text',
  icon: 'text_fields',
  temp: false,
  type: 'input',
  templateOptions: {
    type: 'text',
    label: 'Text Label',
    required: true,
  },
};

export const widgetFormInputEmail: WidgetConfig = {
  name: 'Email',
  icon: 'text_fields',
  temp: false,
  type: 'email',
  templateOptions: {
    type: 'email',
    label: 'Email',
    required: true,
  },
};

export const widgetFormInputNumber: WidgetConfig = {
  name: 'Number',
  temp: false,
  icon: 'numbers',
  type: 'input',
  templateOptions: {
    type: 'number',
    label: 'Number Label',
    required: true,
  },
};

export const widgetFormInputDatepicker: WidgetConfig = {
  name: 'DatePicker',
  temp: false,
  icon: 'today',
  type: 'datepicker',
  templateOptions: {
    label: 'Date Picker Label',
    required: true,
  },
};

export const widgetFormInputRadio: WidgetConfig = {
  name: 'Radio',
  temp: false,
  icon: 'radio_button_checked',
  type: 'radio',
  templateOptions: {
    type: 'radio',
    label: 'Select one of the following',
    required: true,
    options: [{ label: 'Option 1...', value: 1 }],
  },
};

export const widgetFormInputGroup: WidgetConfig = {
  name: 'Group',
  icon: 'list_alt',
  temp: false,
  fieldGroup: [],
  templateOptions: {
    label: 'Group Label',
  },
};

export const widgetFormInputCheckbox: WidgetConfig = {
  name: 'Checkbox',
  icon: 'check_box',
  temp: false,
  type: 'checkbox',
  defaultValue: false,
  templateOptions: {
    type: 'checkbox',
    label: 'Checkbox Label',
    required: true,
    options: [{ label: 'Option 1...', value: 1 }],
  },
};

export const widgetFormInputs: WidgetConfig[] = [
  widgetFormInputText,
  widgetFormInputNumber,
  widgetFormInputCheckbox,
  widgetFormInputRadio,
  widgetFormInputDatepicker,
  widgetFormInputGroup,
];
