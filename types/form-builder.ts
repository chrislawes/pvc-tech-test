export interface FormBuilderData {
    [key: string]: string | boolean
}

export interface FormBuilderErrors {
    [key: string]: string[]
}

export interface FormBuilderItem {
    key: string
    value: string | boolean
}
