import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class FormatDateUtils {
    public static FormatarDateParaStringData(date: Date): string {
        console.log(date);
        if (date === null) return null;

        let ano = this.padLeft(date.getFullYear().toString(), '0', 4);
        let mes = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
        let dia = this.padLeft(date.getDate().toString(), '0', 2);

        return ano+'-'+mes+'-'+dia;
    }

    static padLeft(text:string, padChar:string, size:number): string {
        return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
    }    
}