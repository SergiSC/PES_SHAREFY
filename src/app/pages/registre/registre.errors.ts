import {TranslateService} from '@ngx-translate/core';

export class errorsRegistre {

    constructor(
        private translate: TranslateService
    ){}

    errors= [
        {
            name: "error1",
            msg: this.translate.instant('PAGE.REGISTRE.ERROR1')
        },
        {
            name: "error2",
            msg: this.translate.instant('PAGE.REGISTRE.ERROR2')
        },
        {
            name: "error3",
            msg: this.translate.instant('PAGE.REGISTRE.ERROR3')
        },
        {
            name: "error4",
            msg: this.translate.instant('PAGE.REGISTRE.ERROR4')
        },
        {
            name: "error5",
            msg: this.translate.instant('PAGE.REGISTRE.ERROR5')
        },
        {
            name: "error6",
            msg: this.translate.instant('PAGE.REGISTRE.ERROR6')
        },
        {
            name: "error7",
            msg: this.translate.instant('PAGE.REGISTRE.ERROR7')
        }
    ]
}