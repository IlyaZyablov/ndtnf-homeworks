import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CountryValidationPipe implements PipeTransform {
  transform(country: string) {
    const countryData = {
      russia: 'Москва',
      kazakhstan: 'Астана',
      belarus: 'Минск',
    };

    // eslint-disable-next-line prettier/prettier
    if (!Object.prototype.hasOwnProperty.call(countryData, country.toLowerCase())) {
      throw new Error('Country not found!');
    }

    return countryData[country.toLowerCase()];
  }
}
