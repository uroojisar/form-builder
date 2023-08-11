import { FormlyFieldConfig } from '@ngx-formly/core';

export type Widget = FormlyFieldConfig & {
  name: WidgetInputType;
  type: string;
  id: string;
  key: string;
  templateOptions: {};
  
};

export type WidgetInputType =
  | 'Text'
  | 'Number'
  | 'DatePicker'
  | 'Radio'
  | 'Checkbox'
  | 'Email'
  | 'Group';

export const widgetFormInputText: Widget = {
  name: 'Text',
  type: 'input',
  id: '1',
  key: '1',
  templateOptions: {
    isConditional: false,
    type: 'text',
    label: 'Text Label',
    placeholder: "Enter your text here...",
    required: true,
  },
};

export const widgetFormInputEmail: Widget = {
  name: 'Email',
  type: 'email',
  id: '2',
  key: '2',
  templateOptions: {
    isConditional: false,
    type: 'email',
    label: 'Email',
    placeholder: "johndoe@gmail.com",
    required: true,
  },
};

export const widgetFormInputNumber: Widget = {
  name: 'Number',
  type: 'input',
  id: '3',
  key: '3',
  templateOptions: {
    isConditional: false,
    type: 'number',
    label: 'Number Label',
    placeholder: "021 12233445",
    required: true,
  },
};

export const widgetFormInputDatepicker: Widget = {
  name: 'DatePicker',
  type: 'datepicker',
  id: '4',
  key: '4',
  templateOptions: {
    isConditional: false,
    label: 'Date Picker Label',
    required: true,
  },
};

export const widgetFormInputRadio: Widget = {
  name: 'Radio',
  type: 'radio',
  id: '5',
  key: '5',
  templateOptions: {
    isConditional: true,
    type: 'radio',
    label: 'Select one of the following',
    required: true,
    options: [{ label: 'Option 1...', value: 1 }, { label: 'Option 2...', value: 2 }],
  },
};


export const widgetFormInputCheckbox: Widget = {
  name: 'Checkbox',
  type: 'checkbox',
  id: '7',
  key: '7',
  templateOptions: {
    isConditional: false,
    type: 'checkbox',
    label: 'Checkbox Label',
    required: true,
    options: [{ label: 'Option 1...', value: 1 }],
  },
};

export const widgetFormInputs: Widget[] = [
  widgetFormInputText,
  widgetFormInputNumber,
  widgetFormInputCheckbox,
  widgetFormInputRadio,
  widgetFormInputDatepicker,
];

