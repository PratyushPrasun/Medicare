import React, { useEffect, useState } from 'react'
import { servicePageStyles, serviceCardStyles} from '../assets/dummyStyles'
import {Link} from 'react-router-dom';
import {ChevronsRight, MousePointer2Off} from 'lucide-react';
import { API_BASE as BASE_URL } from '../apiConfig';


const PlaceholderImg = "/placeholder-service.jpg";

const ServiceCard = ({ service }) => {
  const hasSrcSet =
    !!service.imageSrcSet ||
    (!!service.imageSmall && !!service.imageMedium && !!service.imageLarge);

  const src = service.imageUrl || service.image || service.imageSmall || "";
  const srcSet =
    service.imageSrcSet ||
    (service.imageSmall || service.image
      ? `${service.imageSmall || src} 480w, ${
          service.imageMedium || src
        } 768w, ${service.imageLarge || src} 1200w`
      : null);

  const name = service.name || "Service";
  const shortDescription = service.shortDescription || service.about || "";

  return (
    <div className={serviceCardStyles.card}>
      <div className={serviceCardStyles.imageContainer} aria-hidden="true">
        {hasSrcSet ? (
          <picture className={serviceCardStyles.picture}>
            {service.imageWebp && (
              <source srcSet={service.imageWebp} type="image/webp" />
            )}
            {service.imageSrcSet ? (
              <img
                src={src || PlaceholderImg}
                srcSet={service.imageSrcSet}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                alt={name}
                loading="lazy"
                decoding="async"
                className={serviceCardStyles.responsiveImage}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = PlaceholderImg;
                }}
              />
            ) : (
              <img
                src={src || PlaceholderImg}
                srcSet={srcSet || undefined}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                alt={name}
                loading="lazy"
                decoding="async"
                className={serviceCardStyles.responsiveImage}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = PlaceholderImg;
                }}
              />
            )}
          </picture>
        ) : (
          <img
            src={src || PlaceholderImg}
            alt={name}
            loading="lazy"
            decoding="async"
            className={serviceCardStyles.fallbackImage}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PlaceholderImg;
            }}
          />
        )}
      </div>

      <div className={serviceCardStyles.content}>
        <h3 className={serviceCardStyles.serviceName}>{name}</h3>

        <div className={serviceCardStyles.buttonContainer}>
          {service.available ? (
            <Link
              to={`/services/${service.id}`}
              state={{ service: service.raw || service }}
              className={serviceCardStyles.buttonAvailable}
              aria-label={`Book ${name}`}
            >
              <ChevronsRight className="w-5 h-5" aria-hidden="true" />
              Book Now
            </Link>
          ) : (
            <button
              disabled
              className={serviceCardStyles.buttonUnavailable}
              aria-label={`${name} not available`}
            >
              <MousePointer2Off className="w-5 h-5" aria-hidden="true" />
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const Servicepage = ({previewCount = 9999}) => {
    const API_BASE = BASE_URL;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadServices() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          (json && json.message) || `Failed to load services (${res.status})`;
        setError(msg);
        setServices([]);
        setLoading(false);
        return;
      }

      const items = (json && (json.data || json)) || [];
      const normalized = (Array.isArray(items) ? items : []).map((s) => {
        const id = s._id || s.id;
        const image = s.imageUrl || s.image || s.imageSmall || "";
        const available =
          typeof s.available === "boolean"
            ? s.available
            : typeof s.availability === "string"
              ? s.availability.toLowerCase() === "available"
              : s.availability === "Available" || s.available === true;

        return {
          id,
          name: s.name || "Service",
          shortDescription: s.shortDescription || s.about || "",
          image,
          imageSmall: s.imageSmall || null,
          imageMedium: s.imageMedium || null,
          imageLarge: s.imageLarge || null,
          imageSrcSet: s.imageSrcSet || null,
          imageWebp: s.imageWebp || null,
          price: s.price ?? s.fee ?? 0,
          available,
          raw: s,
        };
      });

      setServices(normalized);
    } catch (err) {
      console.error("load services error:", err);
      setError("Network error while loading services.");
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, [API_BASE]);

  const shown = services.slice(0, previewCount);
  return (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200">

    {/* HERO SECTION */}
    <div className="text-center py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
        Our Medical Services
      </h1>
      <p className="text-green-700 max-w-2xl mx-auto">
        Explore our wide range of healthcare services designed to provide you with the best care using advanced medical technology.
      </p>
    </div>

    {/* LOADING */}
    {loading && (
      <div className="text-center py-10 text-green-700">
        Loading services...
      </div>
    )}

    {/* ERROR */}
    {error && (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    )}

    {/* SERVICES GRID */}
    {!loading && !error && (
      <div className="max-w-7xl mx-auto px-6 pb-16">

        {shown.length === 0 ? (
          <p className="text-center text-green-700">No services available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {shown.map((service) => (
              <div
                key={service.id}
                className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
              >

                {/* IMAGE */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder-service.jpg"}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                    {service.name}
                  </h3>

                  <p className="text-sm text-green-700 mb-4 line-clamp-2">
                    {service.shortDescription || "High quality healthcare service."}
                  </p>

                  {/* BUTTON */}
                  {service.available ? (
                    <Link
                      to={`/services/${service.id}`}
                      state={{ service: service.raw || service }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    >
                      <ChevronsRight size={16} />
                      Book Now
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
                    >
                      <MousePointer2Off size={16} />
                      Not Available
                    </button>
                  )}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    )}

  </div>
);
}

export default Servicepage