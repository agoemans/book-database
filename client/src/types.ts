export interface Book {
    isbn: string;
    title: string;
    firstName: string;
    lastName: string;
    borrowed?: boolean;
}

export interface BookRow {
    title: string;
    firstName: string;
    lastName: string;
    borrowed: boolean;
}

export interface BookInput {
    labelName: string;
    placeholder: string;
    sendIdHandler?: (id: string) => void;
}

export interface BookStatus {
    title: string;
    borrowed: boolean;
    borrowName: string;
}