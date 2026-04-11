import React, { useEffect, useMemo, useRef, useState } from 'react';
import { serviceDashboardStyles } from '../assets/dummyStyles.js'
import { BadgeIndianRupee, Calendar, ClipboardList, CheckCircle, XCircle, Search } from 'lucide-react';
import { API_BASE as BASE_URL } from '../apiConfig';


function normalizeService(doc) {
  if (!doc) return null;

  return {
    id: doc._id || doc.id,
    name: doc.name || "Untitled Service",
    price: Number(doc.price) || 0,
    image: doc.image || doc.imageUrl || `https://i.pravatar.cc/150?u=${doc._id}`,
    totalAppointments: Number(doc.totalAppointments) || 0,
    completed: Number(doc.completed) || 0,
    canceled: Number(doc.canceled) || 0,
  };
}

const API_BASE = BASE_URL;


const ServiceDashboard = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const fetchingRef = useRef(false);

  async function fetchServices({ showLoading = true } = {}) {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      if (showLoading) setLoading(true);

      const res = await fetch(`${API_BASE}/api/service-appointments/stats/summary`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const body = await res.json();
      const list = body.services || [];

      const normalized = list.map(normalizeService);
      setServices(normalized);
      setError(null);

    } catch (err) {
      console.error(err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return services;

    return services.filter((s) =>
      s.name.toLowerCase().includes(q)
    );
  }, [services, searchQuery]);

  const visibleServices = showAll
    ? filteredServices
    : filteredServices.slice(0, 8);

  const totals = useMemo(() => {
    return filteredServices.reduce(
      (acc, s) => {
        acc.totalServices += 1;
        acc.totalAppointments += s.totalAppointments;
        acc.totalCompleted += s.completed;
        acc.totalCanceled += s.canceled;
        acc.totalEarning += s.completed * s.price;
        return acc;
      },
      {
        totalServices: 0,
        totalAppointments: 0,
        totalCompleted: 0,
        totalCanceled: 0,
        totalEarning: 0,
      }
    );
  }, [filteredServices]);

  function formatCurrency(v) {
    return `₹${Number(v || 0).toLocaleString()}`;
  }

  return (
    <div className={serviceDashboardStyles.container}>
      <div className={serviceDashboardStyles.innerContainer}>

        {/* HEADER */}
        <div className={serviceDashboardStyles.header.container}>
          <div>
            <h1 className={serviceDashboardStyles.header.title}>
              Service Dashboard
            </h1>
            <p className={serviceDashboardStyles.header.subtitle}>
              Overview of services, appointments and earnings.
            </p>
          </div>

          <div className={serviceDashboardStyles.refresh.container}>
            <div className={serviceDashboardStyles.refresh.countText}>
              {loading ? "Loading..." : `${filteredServices.length} services`}
            </div>

            <button
              className={serviceDashboardStyles.refresh.button(false)}
              onClick={() => fetchServices({ showLoading: true })}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className={serviceDashboardStyles.statGrid}>
          <StatCard icon={<ClipboardList size={18} />} label="Total Services" value={totals.totalServices} />
          <StatCard icon={<Calendar size={18} />} label="Total Appointments" value={totals.totalAppointments} />
          <StatCard icon={<BadgeIndianRupee size={18} />} label="Total Earnings" value={formatCurrency(totals.totalEarning)} />
          <StatCard icon={<CheckCircle size={18} />} label="Completed" value={totals.totalCompleted} />
          <StatCard icon={<XCircle size={18} />} label="Cancelled" value={totals.totalCanceled} />
        </div>

        {/* SEARCH */}
        <div className={serviceDashboardStyles.search.container}>
          <div className={serviceDashboardStyles.search.inputContainer}>
            <Search size={16} className='text-emerald-700'/>
            <input
              type='text'
              placeholder='Search services...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={serviceDashboardStyles.search.input}
            />
            {searchQuery && (
              <XCircle
                size={16}
                className='text-red-500 cursor-pointer'
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className={serviceDashboardStyles.table.container}>

          {/* HEADER */}
          <div className="grid grid-cols-13 p-4 font-semibold">
            <div className="col-span-5">Service</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2 text-center">Appointments</div>
            <div className="col-span-1 text-center">Completed</div>
            <div className="col-span-1 text-center">Canceled</div>
            <div className="col-span-2 text-right">Earning</div>
          </div>

          {/* BODY */}
          <div className={serviceDashboardStyles.table.body}>
            {loading ? (
              <div>Loading Services...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : visibleServices.length === 0 ? (
              <div>No services Found.</div>
            ) : (
              visibleServices.map((s) => {
                const earnings = s.completed * s.price;

                return (
                  <div key={s.id} className="grid grid-cols-13 items-center p-4 border-b">

                    <div className="col-span-5 flex items-center gap-4">
                      <img src={s.image} className="w-12 h-12 rounded object-cover" />
                      <h3>{s.name}</h3>
                    </div>

                    <div className="col-span-2">{formatCurrency(s.price)}</div>

                    <div className="col-span-2 text-center">{s.totalAppointments}</div>
                    <div className="col-span-1 text-center">{s.completed}</div>
                    <div className="col-span-1 text-center">{s.canceled}</div>

                    <div className="col-span-2 text-right">
                      {formatCurrency(earnings)}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServiceDashboard;

function StatCard({ icon, label, value }) {
  return (
    <div className={serviceDashboardStyles.statCard.container}>
      <div className={serviceDashboardStyles.statCard.iconContainer}>
        {icon}
      </div>
      <div>
        <div>{label}</div>
        <div>{value}</div>
      </div>
    </div>
  )
}