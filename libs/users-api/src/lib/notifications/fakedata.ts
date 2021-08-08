import { Notification } from "@valor-launchpad/api-interfaces"
export const Notifications:Notification[]=[
    {
        id:1,
        type:'exclamation-circle',
        level:'danger',
        title:'Update completed',
        description:'Restart server 12 to complete the update.',
        time:'2h ago'
    },{
        id:2,
        type:'bell',
        level:'warning',
        title:'Lorem ipsum',
        description:'Aliquam ex eros, imperdiet vulputate hendrerit et.',
        time:'6h ago'
    },
    {
        id:3,
        type:'home',
        level:'primary',
        title:'Login from 192.186.1.1',
        description:'',
        time:'8h ago'
    },{
        id:4,
        type:'user-plus',
        level:'success',
        title:'New connection',
        description:'Anna accepted your request.',
        time:'12h ago'
    }
]