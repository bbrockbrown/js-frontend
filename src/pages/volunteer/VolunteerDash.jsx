import WeekCal from "@/common/components/dashboard/WeekCal";
import PageHeader from '@/common/components/atoms/PageHeader';
import { BodyContainer } from '@/common/components/form/styles';
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'

import VolStats from "@/common/components/dashboard/VolStats";

const VolunteerDash = () => {
    const styleBody = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    };

    return(
        <div style ={styleBody}>
            <PageHeader title = "Dashboard"/>
            <BodyContainer>
                <WeekCal></WeekCal>
            </BodyContainer>
        </div>
    );
};

export default VolunteerDash;