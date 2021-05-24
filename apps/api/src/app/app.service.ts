import { Injectable } from '@nestjs/common';
import { Message,FAQ } from '@valor-launchpad/api-interfaces';

@Injectable()
export class AppService {
  faqs:FAQ[]=[ {
    answer: 'Do I need a credit card to sign up?',
    question: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
  amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
  vel, luctus pulvinar, hendrerit id, lorem.`,
  },
  {
    answer: 'Do you offer a free trial?',
    question: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
  amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
  vel, luctus pulvinar, hendrerit id, lorem.`,
  },
  {
    answer: 'What if I decide to cancel my plan?',
    question: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
  amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
  vel, luctus pulvinar, hendrerit id, lorem.`,
  },
  {
    answer: 'Can I cancel at anytime?',
    question: `Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
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
