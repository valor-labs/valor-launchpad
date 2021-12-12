import { USER_1, USER_2, USER_3 } from './users';
import { datatype, date , lorem, phone, name, company, internet, random} from 'faker';

export const timeLineTitle = [
    'Signed out',
    'Created invoice #1204',
    'Discarded invoice #1147',
    'Signed in',
    'Signed up',
    'Created invoice #666',
    'Discarded invoice #001',
    'Created invoice #007',
    'Discarded invoice #1080'
]

function timeLineGenerator() {
    return {
        title: random.arrayElement(timeLineTitle),
        time: date.past(),
        description: lorem.sentence(30)
    }
}

export const STATUS = ['Active', 'Deleted', 'Inactive'];

export const USER1_CLIENTS1 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(30),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS2 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],
    description: lorem.sentence(30),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS3 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(30),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS4 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(20),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS5 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })], 
    description: lorem.sentence(10),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS6 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })], 
    description: lorem.sentence(15),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS7 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],
    description: lorem.sentence(16),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS8 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })], 
    description: lorem.sentence(18),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS9 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(23),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER1_CLIENTS10 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(25),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};

export const USER1_CLIENTS11 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_1.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(27),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};


export const USER2_CLIENTS1 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_2.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })], 
    description: lorem.sentence(29),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER2_CLIENTS2 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_2.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })], 
    description: lorem.sentence(29),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER2_CLIENTS3 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_2.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })], 
    description: lorem.sentence(29),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};
export const USER2_CLIENTS4 = {
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    user_id: USER_2.id,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })], 
    description: lorem.sentence(29),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};

export const USER3_CLIENTS1 = {
    user_id: USER_3.id,
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(19),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};

export const USER3_CLIENTS2 = {
    user_id: USER_3.id,
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(19),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};

export const USER3_CLIENTS3 = {
    user_id: USER_3.id,
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(19),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};

export const USER3_CLIENTS4 = {
    user_id: USER_3.id,
    avatar:`assets/img/avatars/avatar-${datatype.number({ min: 1, max: 7 })}.jpg`,
    name: name.findName(),
    company: company.companyName(),
    email: internet.email(),   
    phone: phone.phoneNumber(),  
    status: STATUS[datatype.number({ min: 0, max: 2 })],  
    description: lorem.sentence(19),
    timeline: new Array(5).fill({}).map(() => timeLineGenerator())
};

export const CLIENTS = [
    USER1_CLIENTS1,
    USER1_CLIENTS2,
    USER1_CLIENTS3,
    USER1_CLIENTS4,
    USER1_CLIENTS5,
    USER1_CLIENTS6,
    USER1_CLIENTS7,
    USER1_CLIENTS8,
    USER1_CLIENTS9,
    USER1_CLIENTS10,
    USER1_CLIENTS11,
    USER2_CLIENTS1,
    USER2_CLIENTS2,
    USER2_CLIENTS3,
    USER2_CLIENTS4,
    USER3_CLIENTS1,
    USER3_CLIENTS2,
    USER3_CLIENTS3,
    USER3_CLIENTS4
];
