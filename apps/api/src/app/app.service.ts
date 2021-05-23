import { Injectable } from '@nestjs/common';
import { Message,FAQ } from '@valor-launchpad/api-interfaces';

@Injectable()
export class AppService {
  faqs:FAQ[]=[ {
    a: 'Do I need a credit card to sign up?',
    q: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
  amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
  vel, luctus pulvinar, hendrerit id, lorem.`,
  },
  {
    a: 'Do you offer a free trial?',
    q: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
  amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
  vel, luctus pulvinar, hendrerit id, lorem.`,
  },
  {
    a: 'What if I decide to cancel my plan?',
    q: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
  amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
  vel, luctus pulvinar, hendrerit id, lorem.`,
  },
  {
    a: 'Can I cancel at anytime?',
    q: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
  amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
  vel, luctus pulvinar, hendrerit id, lorem.`,
  }];
  
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  getFAQ():FAQ[]{
    return this.faqs;
  }
}
