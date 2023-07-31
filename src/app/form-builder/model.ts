import { FormlyFieldConfig } from '@ngx-formly/core';

// need to create a model for storing conditional logic of widget
// export type Todo = FormlyFieldConfig & {

// };

export type Widget = FormlyFieldConfig & {
  id: string;
  type: WidgetConfig;
  isConditional: boolean;
  // displayLogic?: Todo[];
};

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
  id: string;
  fieldGroup?: WidgetConfig[];
};

export const widgetFormInputText: WidgetConfig = {
  name: 'Text',
  icon: 'text_fields',
  temp: false,
  type: 'input',
  id: '1',
  templateOptions: {
    type: 'text',
    label: 'Text Label',
    placeholder: "Enter your text here...",
    required: true,
  },
};

export const widgetFormInputEmail: WidgetConfig = {
  name: 'Email',
  icon: 'text_fields',
  temp: false,
  type: 'email',
  id: '2',
  templateOptions: {
    type: 'email',
    label: 'Email',
    placeholder: "johndoe@gmail.com",
    required: true,
  },
};

export const widgetFormInputNumber: WidgetConfig = {
  name: 'Number',
  temp: false,
  icon: 'numbers',
  type: 'input',
  id: '3',
  templateOptions: {
    type: 'number',
    label: 'Number Label',
    placeholder: "021 12233445",
    required: true,
  },
};

export const widgetFormInputDatepicker: WidgetConfig = {
  name: 'DatePicker',
  temp: false,
  icon: 'today',
  type: 'datepicker',
  id: '4',
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
  id: '5',
  templateOptions: {
    type: 'radio',
    label: 'Select one of the following',
    required: true,
    options: [{ label: 'Option 1...', value: 1 }, { label: 'Option 2...', value: 2 }],
  },
};

export const widgetFormInputGroup: WidgetConfig = {
  name: 'Group',
  icon: 'list_alt',
  temp: false,
  id: '6',
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
  id: '7',
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

