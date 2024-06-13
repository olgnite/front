import { AbstractControl, FormControl } from "@angular/forms";

const errors: Record<string, string> = {
    required: 'Это поле обязательно',
    minlength: 'Минимальная длина 8 символов',
    pattern: 'Поле не валидно',
    email: 'Неверный формат почты'
};

export function getErrorMessages<T, R extends T>(control: AbstractControl<T, R>): string[] {
    const messages: string[] = [];
    if (control.errors) {
        for (const errorName in control.errors) {
            const mesValue: string = errors[errorName] || 'Ввод не валиден';
            messages.push(mesValue);
        }
    }

    return messages;
};