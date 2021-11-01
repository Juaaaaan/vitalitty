export interface KeyValueModel {
    key?: any;
    value?: any;
    type?: string;
}


export interface ResponseModel {
    status: string;
    status_code: any;
}


export interface DynamicFormConfig {
    formKey?: string;
    title?: string;
    styleType?: string;
    interface?: string;
    required?: boolean;
    disabled?: boolean;
    type?: string;
    options?: KeyValueModel[];
    componentType?: string;
}


export interface AccordionText {
    title: string;
    text: KeyValueModel[];
    open?: boolean;
}

export interface TitleInfoModel {
    title: string;
    text: string;
    img?: string;
}

export interface GuardModel {
    guard: boolean;
    page: string;
}
