import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as GiIcons from 'react-icons/gi';

export const SideBarData=[
    {
        title:'Home',
        Icon:<FaIcons.FaHome/>,
        link:'/admin/listComponents',
    },
    {
        title:'Staff',
        Icon:<BsIcons.BsPeopleFill/>,
        link:'/admin/staff',
    },
    {
        title:'Doctor',
        Icon:<ImIcons.ImMan/>,
        link:'/admin/listDoctors',
    },
    {
        title:'Patient',
        Icon:<FaIcons.FaUserInjured/>,
        link:'/admin/listPatients',
    },
    {
        title:'Nurse',
        Icon:<FaIcons.FaUserNurse/>,
        link:'/admin/listnurse',
    },
    {
        title:'Roles',
        Icon:<FaIcons.FaPeopleArrows/>,
        link:'/admin/listRoles',
    },
    {
        title:'Ward',
        Icon:<FaIcons.FaHospitalAlt/>,
        link:'/admin/listwards',
    },
    {
        title:'Room',
        Icon:<FaIcons.FaBed/>,
        link:'/admin/room',
    },
    {
        title:'WardBoy',
        Icon:<GiIcons.GiVacuumCleaner/>,
        link:'/admin/wardboy',
    },
    {
        title:'Medicine',
        Icon:<GiIcons.GiMedicines/>,
        link:'/admin/medical',
    }
]