import { useState } from 'react';
import Card from '../components/ui/Card';
import { 
  FaCalendarAlt, 
  FaPlus, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  attendees: number;
  type: 'appointment' | 'meeting' | 'ceremony' | 'deadline';
}

// Sample events data
const sampleEvents: Event[] = [
  {
    id: 'EVT-001',
    title: 'Passport Collection Day',
    date: '2025-06-02',
    startTime: '09:00',
    endTime: '14:00',
    location: 'Embassy Main Hall',
    description: 'Collection of processed passports for approved applicants',
    attendees: 85,
    type: 'appointment'
  },
  {
    id: 'EVT-002',
    title: 'Visa Application Processing',
    date: '2025-06-02',
    startTime: '10:00',
    endTime: '15:00',
    location: 'Visa Section, Room 104',
    description: 'Processing of new visa applications',
    attendees: 45,
    type: 'appointment'
  },
  {
    id: 'EVT-003',
    title: 'Staff Meeting',
    date: '2025-06-03',
    startTime: '09:30',
    endTime: '11:00',
    location: 'Conference Room A',
    description: 'Monthly staff meeting to discuss ongoing projects and initiatives',
    attendees: 22,
    type: 'meeting'
  },
  {
    id: 'EVT-004',
    title: 'Cultural Ceremony',
    date: '2025-06-05',
    startTime: '18:00',
    endTime: '21:00',
    location: 'Embassy Garden',
    description: 'Cultural exchange ceremony with local dignitaries',
    attendees: 120,
    type: 'ceremony'
  },
  {
    id: 'EVT-005',
    title: 'Document Verification Workshop',
    date: '2025-06-06',
    startTime: '10:00',
    endTime: '16:00',
    location: 'Training Center',
    description: 'Training session on new document verification procedures',
    attendees: 15,
    type: 'meeting'
  },
  {
    id: 'EVT-006',
    title: 'ETC Application Deadline',
    date: '2025-06-10',
    startTime: '17:00',
    endTime: '17:00',
    location: 'Online',
    description: 'Final deadline for Emergency Travel Certificate applications for the month',
    attendees: 0,
    type: 'deadline'
  },
  {
    id: 'EVT-007',
    title: 'Consular Appointments',
    date: '2025-06-12',
    startTime: '09:00',
    endTime: '16:00',
    location: 'Consular Section',
    description: 'Scheduled appointments for consular services',
    attendees: 35,
    type: 'appointment'
  },
  {
    id: 'EVT-008',
    title: 'Embassy Reception',
    date: '2025-06-15',
    startTime: '19:00',
    endTime: '22:00',
    location: 'Ambassador\'s Residence',
    description: 'Formal reception for diplomatic corps',
    attendees: 75,
    type: 'ceremony'
  }
];

// Function to get days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const EventsCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
  const [viewType, setViewType] = useState<'month' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Generate calendar days for the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Filter events for the selected date
  const filteredEvents = sampleEvents.filter(event => 
    viewType === 'month' 
      ? event.date.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`)
      : event.date === selectedDate
  );

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Select a date
  const handleDateSelect = (day: number) => {
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    setSelectedDate(dateString);
    setViewType('day');
  };

  // Function to check if a date has events
  const hasEvents = (day: number) => {
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    return sampleEvents.some(event => event.date === dateString);
  };

  // Function to get event color based on type
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ceremony':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Open event details modal
  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Format time to 12-hour format
  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 === 0 ? 12 : hourNum % 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Events Calendar</h1>
        <div className="flex space-x-2">
          <button 
            className={`${viewType === 'month' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewType('month')}
          >
            Month View
          </button>
          <button 
            className={`${viewType === 'day' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewType('day')}
          >
            Day View
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FaPlus size={12} />
            <span>New Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${viewType === 'month' ? 'lg:col-span-3' : 'lg:col-span-1'}`}>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex space-x-2">
                <button 
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                <button 
                  onClick={() => {
                    setCurrentMonth(today.getMonth());
                    setCurrentYear(today.getFullYear());
                  }}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  Today
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {dayNames.map((day, index) => (
                <div 
                  key={index}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
              
              {/* Empty cells for days before the first day of month */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div 
                  key={`empty-${index}`}
                  className="border border-transparent p-2 h-24 bg-gray-50"
                >
                </div>
              ))}
              
              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const isToday = 
                  day === today.getDate() && 
                  currentMonth === today.getMonth() && 
                  currentYear === today.getFullYear();
                
                const isSelected = selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hasEventOnDay = hasEvents(day);
                
                return (
                  <div 
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    className={`
                      border p-2 h-24 overflow-hidden cursor-pointer relative
                      ${isToday ? 'bg-primary-50' : 'hover:bg-gray-50'}
                      ${isSelected ? 'ring-2 ring-primary-500 border-primary-300' : 'border-gray-200'}
                      ${viewType === 'day' ? 'hidden lg:block' : ''}
                    `}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-medium ${isToday ? 'text-primary-700' : ''}`}>
                        {day}
                      </span>
                      {hasEventOnDay && (
                        <span className="bg-primary-500 h-1.5 w-1.5 rounded-full"></span>
                      )}
                    </div>
                    
                    {/* Show a preview of events on that day (just show dots) */}
                    {sampleEvents
                      .filter(event => event.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
                      .slice(0, 2)
                      .map((event) => (
                        <div 
                          key={event.id} 
                          className={`text-xs truncate my-0.5 px-1.5 py-0.5 rounded-sm border ${getEventTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))
                    }
                    
                    {/* If there are more events, show a +X more indicator */}
                    {sampleEvents.filter(event => 
                      event.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    ).length > 2 && (
                      <div className="text-xs text-gray-500 px-1.5">
                        +{sampleEvents.filter(event => 
                          event.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                        ).length - 2} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        
        {viewType === 'day' && (
          <div className="lg:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                  Events for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                <button 
                  onClick={() => setViewType('month')}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <FaChevronLeft size={12} />
                  <span>Back to Month</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <div 
                      key={event.id}
                      onClick={() => openEventDetails(event)}
                      className={`border rounded-lg p-4 hover:shadow-md cursor-pointer transition-all ${getEventTypeColor(event.type)}`}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{event.title}</h3>
                        <span className="text-sm">{event.id}</span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="flex items-center text-sm">
                          <FaClock className="mr-2" />
                          <span>
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>{event.location}</span>
                        </div>
                        
                        {event.attendees > 0 && (
                          <div className="flex items-center text-sm">
                            <FaUsers className="mr-2" />
                            <span>{event.attendees} attendees</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm capitalize">
                          <FaCalendarAlt className="mr-2" />
                          <span>{event.type}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FaCalendarAlt size={40} className="mx-auto mb-3 text-gray-300" />
                    <p>No events scheduled for this day</p>
                    <button className="mt-3 btn-secondary">
                      Schedule New Event
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Event list for month view */}
      {viewType === 'month' && (
        <Card className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {filteredEvents.length} events this month
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Event ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 rounded-tr-lg">Attendees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEvents.length > 0 ? (
                  filteredEvents
                    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
                    .map(event => (
                    <tr key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openEventDetails(event)}>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                        {event.id}
                      </td>
                      <td className="px-4 py-3">{event.title}</td>
                      <td className="px-4 py-3">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                      <td className="px-4 py-3">
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </td>
                      <td className="px-4 py-3">{event.location}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {event.attendees > 0 ? (
                          <div className="flex items-center">
                            <FaUsers className="mr-1 text-gray-400" size={14} />
                            <span>{event.attendees}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No events scheduled for this month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
            <div className={`px-6 py-4 border-b ${getEventTypeColor(selectedEvent.type)}`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-gray-500 text-sm">Date</div>
                  <div className="flex items-center mt-1">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Time</div>
                  <div className="flex items-center mt-1">
                    <FaClock className="mr-2 text-gray-400" />
                    <span>{formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Location</div>
                  <div className="flex items-center mt-1">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Attendees</div>
                  <div className="flex items-center mt-1">
                    <FaUsers className="mr-2 text-gray-400" />
                    <span>{selectedEvent.attendees}</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-gray-500 text-sm">Event Type</div>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-gray-500 text-sm">Description</div>
                <p className="mt-1">{selectedEvent.description}</p>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button className="btn-primary">
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;
