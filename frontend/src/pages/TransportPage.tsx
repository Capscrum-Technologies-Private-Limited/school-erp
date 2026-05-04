import { useState, useEffect } from 'react';
import { 
  Bus, 
  Map as MapIcon, 
  Plus, 
  Search, 
  User, 
  Phone, 
  Navigation,
  Loader2,
  CheckCircle2,
  Settings,
  MoreVertical,
  Route as RouteIcon
} from 'lucide-react';
import { domainService } from '../api/domainService';
import type { TransportRoute, Vehicle } from '../types/domain';

export default function TransportPage() {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'routes' | 'vehicles'>('routes');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [routesData, vehiclesData] = await Promise.all([
        domainService.getTransportRoutes(),
        domainService.getVehicles()
      ]);
      setRoutes(routesData);
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Failed to fetch transport data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transport Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage school bus routes, vehicle fleet, and logistics.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          {activeTab === 'routes' ? 'Add Route' : 'Add Vehicle'}
        </button>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('routes')}
          className={clsx(
            "pb-4 px-2 text-sm font-bold transition-all relative",
            activeTab === 'routes' ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Routes & Mapping
          {activeTab === 'routes' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('vehicles')}
          className={clsx(
            "pb-4 px-2 text-sm font-bold transition-all relative",
            activeTab === 'vehicles' ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Vehicle Fleet
          {activeTab === 'vehicles' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full" />}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          <p className="text-gray-500 font-medium">Loading logistics data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'routes' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map(route => (
                <div key={route.id} className="card p-6 group hover:border-primary-200 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                      <RouteIcon className="w-6 h-6" />
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{route.routeName}</h3>
                  <p className="text-xs font-mono text-gray-400 mb-4">{route.routeCode}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Navigation className="w-4 h-4 text-green-500" />
                      <span>{route.startPoint} → {route.endPoint}</span>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">
                      <span className="text-xs font-bold text-gray-400 uppercase">Monthly Cost</span>
                      <span className="text-lg font-bold text-primary-600">${route.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="card p-6 group hover:border-blue-200 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <Bus className="w-6 h-6" />
                    </div>
                    <span className={clsx(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                      vehicle.status === 'ACTIVE' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {vehicle.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{vehicle.vehicleNumber}</h3>
                  <p className="text-sm text-gray-500 mb-4">{vehicle.vehicleModel} • {vehicle.capacity} Seats</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Driver</p>
                        <p className="text-sm font-bold text-gray-900">{vehicle.driverName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                        <Phone className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">{vehicle.driverPhone}</p>
                    </div>
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

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
