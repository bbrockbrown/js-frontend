import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth';

function DashboardCard({ title, children }) {
    const [expanded, setExpanded] = useState(false)
    const cardClasses = [
        'w-full',
        'max-w-5xl',
        'bg-slate-100',
        'p-5',
        'my-4',
        'overflow-hidden',
        'border',
        'border-black',
        expanded ? 'min-h-[25rem]' : 'min-h-[9rem]',
    ].join(' ')

    return (
        <div className={cardClasses} onClick={() => setExpanded(!expanded)}>
            <h2 className="m-0 mb-3 text-2xl text-slate-900">
                {title}
            </h2>
            <div>
                {children}
            </div>
        </div>
    )
}

function SummaryStats() {
    const [pending, setPending] = useState(0);
    const [read, setRead] = useState(0);
    const [unread, setUnread] = useState(0);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const auth = getAuth();

                if (!auth.currentUser) {
                    return;
                }
                const token = await auth.currentUser.getIdToken();
                
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/scheduledsends/pending`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch pending sends');
                }

                const data = await response.json();
                setPending(data.length);
            } catch (error) {
                console.error('Error fetching pending sends:', error);
            }
        };

        fetchPending();

        // TODO: hardcoded data for read/unread
        // fix after endpoints r done
        setRead(42);
        setUnread(15);
    }, []);

    return (
        <DashboardCard title="Summary and Statistics">
            <div className="bg-orange-500 w-1/2 p-4 text-white rounded">
                <h3 className="text-xl font-bold mb-2">Summary</h3>
                <p>Pending: {pending}</p>
                <p>Read: {read}</p>
                <p>Unread: {unread}</p>
            </div>
        </DashboardCard>
    )
}

function Outbox() {
    return (
        <DashboardCard title="Outbox">
        </DashboardCard>
    )
}

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center py-6">
            <SummaryStats />
            <Outbox />
        </div>
    )
}