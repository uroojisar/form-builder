import { FormlyFieldConfig } from '@ngx-formly/core';

// Custom function that will be used in the hide expression
const customHideFunction = (field: FormlyFieldConfig, key: string) => {
  
  if (field.model && field.model[key]){
    if (field.options?.formState?.isShow){
      return field.model[key] != field.options?.formState?.optionSelected;
    }
    else if (field.options?.formState?.isShow == false){
      return field.model[key] == field.options?.formState?.optionSelected;
    }
    else {
      return false;
    }

  } else {
    // whether to hide or show the form field initially?
    return false;
  }
  
};


export type Widget = FormlyFieldConfig & {
  name: WidgetInputType;
  type: string;
  id: string;
  key: string;
  props: {};
  
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
  props: {
    isConditional: false,
    type: 'text',
    label: 'Text Label',
    description: '',
    placeholder: "Enter your text here...",
    required: true,
    logic: {
      targetWidgetType: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetType),
  },
 

};

export const widgetFormInputEmail: Widget = {
  name: 'Email',
  type: 'input',
  id: '2',
  key: '2',
  props: {
    isConditional: false,
    type: 'email',
    label: 'Email',
    description: '',
    placeholder: "johndoe@gmail.com",
    required: true,
    logic: {
      targetWidgetType: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetType),
  },
}
  

export const widgetFormInputNumber: Widget = {
  name: 'Number',
  type: 'input',
  id: '3',
  key: '3',
  props: {
    isConditional: false,
    type: 'number',
    label: 'Number Label',
    description: '',
    placeholder: "021 12233445",
    required: true,
    logic: {
      targetWidgetType: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetType),
  },
};

export const widgetFormInputDatepicker: Widget = {
  name: 'DatePicker',
  type: 'input',
  id: '4',
  key: '4',
  props: {
    isConditional: false,
    type: 'datepicker',
    label: 'Date Picker Label',
    description: '',
    required: true,
    logic: {
      targetWidgetType: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetType),
  },
};

export const widgetFormInputRadio: Widget = {
  name: 'Radio',
  type: 'radio',
  id: '5',
  key: '5',
  props: {
    isConditional: true,
    type: 'radio',
    label: 'Select one of the following',
    description: '',
    required: true,
    options: [{ label: 'Option 1...', value: 1 }, { label: 'Option 2...', value: 2 }],
    logic: {
      targetWidgetType: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetType),
  },
};


export const widgetFormInputCheckbox: Widget = {
  name: 'Checkbox',
  type: 'checkbox',
  id: '7',
  key: '7',
  props: {
    isConditional: false,
    type: 'checkbox',
    label: 'Checkbox Label',
    description: '',
    required: true,
    options: [{ label: 'Option 1...', value: 1 }],
    logic: {
      targetWidgetType: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetType),
  },
};

export const widgetFormInputs: Widget[] = [
  widgetFormInputText,
  widgetFormInputNumber,
  widgetFormInputCheckbox,
  widgetFormInputRadio,
  widgetFormInputDatepicker,
];

