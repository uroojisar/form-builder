import { FormlyFieldConfig } from '@ngx-formly/core';

// Custom function that will be used in the hide expression
const customHideFunction = (field: FormlyFieldConfig, key: string) => {
  let ans = false;
  if (field.model && field.model[key]){
    
    if (field.options?.formState?.isShow == "true"){
      ans = field.model[key] != field.options?.formState?.optionSelected;
    }
    else if (field.options?.formState?.isShow == "false"){
      ans = field.model[key] == field.options?.formState?.optionSelected;
    }
    else {
      ans = false;
    }
  } else {
    // whether to hide or show the form field initially?
    ans = false;
  }
  debugger
  return ans;
  
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
      targetWidgetId: '',
      selectedOptionIndex: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetId),
    // hide: (field) => customHideFunction(field, field.options?.formState.widgetId),

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
      targetWidgetId: '',
      selectedOptionIndex: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetId),
    // hide: (field) => customHideFunction(field, field.options?.formState.widgetId),
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
      targetWidgetId: '',
      selectedOptionIndex: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetId),
    // hide: (field) => customHideFunction(field, field.options?.formState.widgetId),

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
      targetWidgetId: '',
      selectedOptionIndex: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetId),
    // hide: (field) => customHideFunction(field, field.options?.formState.widgetId),

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
      targetWidgetId: '',
      selectedOptionIndex: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetId),
    // hide: (field) => customHideFunction(field, field.options?.formState.widgetId),

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
      targetWidgetId: '',
      selectedOptionIndex: '',
      selectedOption: '',
    }
  },
  expressions: {
    hide: (field) => customHideFunction(field, field.props?.['logic'].targetWidgetId),
    // hide: (field) => customHideFunction(field, field.options?.formState.widgetId),

  },
};

export const widgetFormInputs: Widget[] = [
  widgetFormInputText,
  widgetFormInputNumber,
  widgetFormInputCheckbox,
  widgetFormInputRadio,
  widgetFormInputDatepicker,
];

