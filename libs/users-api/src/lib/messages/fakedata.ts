import { Message } from "@valor-launchpad/api-interfaces";

export const Messages:Message[]=[{
    id:1,
    user:{
        id:5,
        name:'Ashley Briggs',
        avatar:'/assets/img/avatars/avatar-5.jpg'

    },
    message:'Nam pretium turpis et arcu. Duis arcu tortor.',
    time:'15m ago'
},{
    id:2,
    user:{
        id:2,
        name:'Carl Jenkins',
        avatar:'/assets/img/avatars/avatar-2.jpg'

    },
    message:'Curabitur ligula sapien euismod vitae.',
    time:'2h ago'
},{
    id:3,
    user:{
        id:4,
        name:'Stacie Hall',
        avatar:'/assets/img/avatars/avatar-4.jpg'

    },
    message:'Pellentesque auctor neque nec urna.',
    time:'4h ago'
},{
    id:4,
    user:{
        id:3,
        name:'Bertha Martin',
        avatar:'/assets/img/avatars/avatar-3.jpg'

    },
    message:'Aenean tellus metus, bibendum sed, posuere ac, mattis non.',
    time:'5h ago'
}]