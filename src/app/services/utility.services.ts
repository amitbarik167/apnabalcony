import { Injectable } from "@angular/core";
import { Observable, observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class UtilityService {
    ConvertFormDataToJson(formData: any) {
        return JSON.stringify(Object.fromEntries(formData));
    }

    ConfirmDeleteDialog() {
        if (confirm("Are you sure you want to soft delete?")) {
            return true;
        }
        else {
            return false;
        }

    }

    ConvertEnumToObject(productSizeEnum: any) {
        const arrayObjects = [];
        for (const [propertyKey, propertyValue] of Object.entries(productSizeEnum)) {
            if (!Number.isNaN(Number(propertyKey))) {
                continue;
            }
            arrayObjects.push({ id: propertyValue, name: propertyKey });
        }
        return arrayObjects;
    }




}