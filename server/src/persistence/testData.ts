import {AuthorModel, BookModel, BookStatusModel} from "../models";

export let books: BookModel[] = [
    {
        isbn: '1612379376245',
        title: 'This is a test',
        firstName: 'Leroy',
        lastName: 'Jenkins',
        borrowed: false
    },
    {
        isbn: '1612379665486',
        title: 'ASync and Performance',
        firstName: 'Kyle',
        lastName: 'Simpson',
        borrowed: false
    }
];

export let authors: AuthorModel[] = [
    {
        authorId: 1612379768498,
        firstName: 'Leroy',
        lastName: 'Jenkins'
    },
    {
        authorId: 1612379801360,
        firstName: 'Kyle',
        lastName: 'Simpson'
    }
];

export let bookStatus: BookStatusModel[] = [
    {
        title: 'This is a test',
        firstName: 'Leroy',
        lastName: 'Jenkins',
        borrowed: false,
        borrowName: null
    },
    {
        title: 'ASync and Performance',
        firstName: 'Kyle',
        lastName: 'Simpson',
        borrowed: false,
        borrowName: null
    }
];